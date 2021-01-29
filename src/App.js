import RandomSearchApi from "./api/RandomSearchApi.js";
import RecommendApi from "./api/RecommendApi.js";
import SearchApi from "./api/SearchApi.js";
import Card from "./components/Card.js";
import Header from "./components/Header.js";
import InputBox from "./components/InputBox.js";
import Loading from "./components/Loading.js";
import Modal from "./components/Modal.js";
import Recommend from "./components/Recommend.js";
import { throttle, getCurrnetScrollHeight, getWindowHeight } from "./util/scrollInfinity.js";


export default class App {
    constructor($target) {
        
        /*
            0. 코드가 너무 복잡해서 전체 리펙토링.
            1. 구조와 관련된건 여기서 선언. (header -> input -> dropdown -> result) 아니면 난잡해짐.
            2. 의존성의 경우, app에서 로직을 만들어서 해당 모듈에 주입.
        */

        /*
            추가
            1. 모달 esc 누르면 꺼지기 o
            2. 검색어 20개로 제한 -> 더보기 누르면 더 나오도록 o
            3. 검색어 디바운싱 o
            4. 스크롤 쓰로틀링  o -> 6
            5. 레이지 로드
            6. 인피니티 스크롤링 o
            7. caching (session에 저장)
        */
        this.$target = $target;
        this.headerParent = document.createElement('header');
        this.inputParent = document.createElement('section');
        this.recommendParent = document.createElement('section');
        this.cardParent = document.createElement('section');
        this.modalParent = document.createElement('div');
        this.IsRandom = false;
        
        this.headerSection = new Header(this.headerParent);
        this.inputSection = new InputBox({ 
            $target: this.inputParent,
            onRecommend: this._onRecommend.bind(this), 
            onSearch: this._onSearch.bind(this),
            onRandomSearch: this._onRandomSearch.bind(this)
        });
        this.recommendSection = new Recommend(this.recommendParent);
        this.cardSection = new Card(this.cardParent, this._onClickModal.bind(this));
        this.loading = new Loading(this.cardParent);
        this.modalSection = new Modal(this.$target);

        
        this.recommendApi = new RecommendApi();
        this.searchApi = new SearchApi();
        this.randomSearchApi = new RandomSearchApi();

        
        this._setFrame();
        this._setHeaderSection();
        this._setInputSection();
        this._setRecommendSection();
        this._onScrollWithInfinity();
    }

    // 내부의 this는 클래스의 this가 아닌, 해당 함수의 this로 인식한다
    // O: bind(this) 필요!
    // 또는 화살표 함수로 바꾸면 된다
    async _onRecommend(e, value) {
        try {
            if(e.key === 'Enter') return;
            if(e.key === 'Esc' || e.key === 'Escape'){
                this.recommendSection.init();
                this.recommendSection.render('');
            }
            else if(e.key === 'ArrowDown') {
                this.searchApi.abort();
                const nextValue = this.recommendSection.downHighlight();
                this._onSearchWithoutRecommend(nextValue);
                this.inputSection.setInput(nextValue);
            }
            else if(e.key === 'ArrowUp') {
                this.searchApi.abort();
                const prevValue = this.recommendSection.upHighlight();            
                this._onSearchWithoutRecommend(prevValue);
                this.inputSection.setInput(prevValue);
            }
            else {
                // 디바운싱 필요
                this.loading.start();
                let debounce;
                if(debounce) clearTimeout(debounce);
                debounce = setTimeout(async () => {
                    if(!value) { this.recommendSection.init(); return; }
                    let data = JSON.parse(sessionStorage.getItem(value));
                    console.log("data", data);
                    if(!data || !data.length) {
                        data = await this.recommendApi.setKeyword(value);
                        sessionStorage.setItem(value, JSON.stringify(data));
                    }
                    this.recommendSection.render(data);
                }, 200);
                this.loading.end();
            }
            
        }
        catch(err) {
            console.error(err);
        }
    }R

    _lazyLoad() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const rec = img.getBoundingClientRect().top;
            if(rec <= window.innerHeight) {
                const src = img.getAttribute('data-lazy');
                img.setAttribute('src', src);
            }
        })
    }

    _lazyLoadWithObserve() {
        const images = document.querySelectorAll('img');
        if ("IntersectionObserver" in window) {
            let io = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const src = image.getAttribute('data-lazy');
                        image.setAttribute('src', src);
                        io.unobserve(image);
                    }
                });
            });
        
            images.forEach(image => {
                io.observe(image);
            });
        }
        // window에 observer api가 없는 경우.
        else {
            this._lazyLoad();
        }
    }

    // infinity 스크롤 적용
    async _onScrollWithInfinity() {
        // if(!this.IsRandom) return;
        window.addEventListener('scroll', throttle(async _ => {
            try {
                this._lazyLoadWithObserve();
                if(getCurrnetScrollHeight() < getWindowHeight() - window.innerHeight - 100) return;
                if(this.IsRandom) await this._onRandomSearch();
            }
            catch(err) {
                console.error(err);
            }
        }, 200));
    }

    // 랜덤 검색
    async _onRandomSearch() {
        try {
            this.loading.start();
            const data = await this.randomSearchApi.setSearch()
            this.cardSection.renderForRandom(data, true);
            this._lazyLoadWithObserve();
            this.IsRandom = true;
            this.loading.end();
        }
        catch(err) {
            console.error(err);
        }
    }

    // reco init 미포함
    async _onSearchWithoutRecommend(value) {
        try {
            this.IsRandom = false;
            this.loading.start();
            if(!value) return;
            let data = JSON.parse(sessionStorage.getItem(`s_${value}`));
            if(!data || !data.data.length) {
                data = await this.searchApi.setSearch(value);
                if(data && data.data.length) sessionStorage.setItem(`s_${value}`, JSON.stringify(data));
            }
            this.cardSection.render(data);
            this.loading.end();
        }
        catch(err) {
            console.error(err);
        }
    }

    // reco init 포함
    async _onSearch(value) {
        try {
            this.IsRandom = false;
            this.loading.start();
            let data = JSON.parse(sessionStorage.getItem(`s_${value}`));
            if(!data || !data.data.length) {
                data = await this.searchApi.setSearch(value);
                if(data && data.data.length) sessionStorage.setItem(`s_${value}`, JSON.stringify(data));
            }
            this.cardSection.render(data);
            this._lazyLoadWithObserve();
            this.recommendSection.init();
            this.loading.end();
        }
        catch(err) {
            console.error(err);
        }
    }

    // modal click 시, 생성
    _onClickModal(data) {
        this.modalSection.render(data);
    }

    // reco li 선택 및 overlay 선택
    _setRecommendSection() {
        this.recommendParent.addEventListener('click', e => {
            if(e.target.nodeName === 'BUTTON') return;
            if(e.target.nodeName === 'LI') {
                this.recommendSection.selectHighlight(e.target);
                return this._onSearch(e.target.innerText);
            }
            this.recommendSection.init();
        });
    }

    // inputsection 정의
    _setInputSection() {
        this.inputSection.render();
    }

    // 헤더섹션 정의
    _setHeaderSection() {
        this.headerSection.render();
    }

    // 골격 정의
    _setFrame() {
        this.$target.appendChild(this.headerParent);
        this.$target.appendChild(this.inputParent);
        this.$target.appendChild(this.recommendParent);
        this.$target.appendChild(this.cardParent);

        this.headerParent.className = 'header__parent';
        this.inputParent.className = 'input__parent';
        this.recommendParent.className = 'recommend__parent';
        this.cardParent.className = 'card__parent';
    }



}
