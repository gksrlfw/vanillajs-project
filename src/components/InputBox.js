
export default class InputBox {
    input;
    constructor({ $target, onRecommend, onSearch, onRandomSearch }) {
        this.$target = $target;
        this.onRecommend = onRecommend;
        this.onSearch = onSearch;
        this.onRandomSearch = onRandomSearch;
        this.section = document.createElement('form');
        this.$target.appendChild(this.section);
    }

    setInput(value) {
        this.input.value = value;
    }

    render() {
        this._render();
    }

    _render() {
        this.section.className = 'input-box-form';

        const input = document.createElement('input');
        this.input = input;
        input.className = 'input-box';
        input.setAttribute('placeholder', '묘종을 입력해주세요!');

        input.addEventListener('keyup', async e => {
            await this.onRecommend(e, input.value);
        });

        this.section.addEventListener('submit', e => {
            e.preventDefault();
            this.onSearch(input.value);
        });

        const searchBtn = document.createElement('button');
        searchBtn.className = 'search-btn';
        searchBtn.innerText = '랜덤검색';
        searchBtn.setAttribute('type', 'button');
        searchBtn.addEventListener('click', _ => {
            this.onRandomSearch();
        });

        this.section.appendChild(input);
        this.section.appendChild(searchBtn);
    }
}