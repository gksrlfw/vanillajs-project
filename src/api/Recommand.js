

const BASE_URL = `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q`;

export default class Recommand {
    constructor() {
        this.keyword = '';
    }

    setKeyword(keyword) {
        if(keyword ==='' || keyword === null || keyword === undefined) return;
        this.keyword = keyword;
        return this._recommand();
    }

    async _recommand() {
        try {
            const data = await fetch(`${BASE_URL}=${this.keyword}`);
            return (await data.json());
        }  
        catch(err) {
            console.error(err);
            return alert('다시 시도해주세요');
        }
    }
}