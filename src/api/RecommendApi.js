

const BASE_URL = `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q`;

export default class RecommendApi {
    constructor() {
        this.keyword = '';
        this.controller = new AbortController();
    }

    abort() {
        this.controller.abort();
        this.controller = new AbortController();
    }

    setKeyword(keyword) {
        if(keyword ==='' || keyword === null || keyword === undefined) return;
        this.keyword = keyword;
        return this._recommand();
    }

    async _recommand() {
        try {
            const data = await fetch(`${BASE_URL}=${this.keyword}`, { signal: this.controller.signal });
            if(data.status === 500) return alert('추천 검색 에러입니다. 다시 시도해주세요!');
            return (await data.json());
        }  
        catch(err) {
            if(err.code === 20) return console.log(err.message);
            console.error(err);
            return alert('추천 검색 에러입니다. 다시 시도해주세요');
        }
    }
}