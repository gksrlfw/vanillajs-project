
const BASE_URL = `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q`;

export default class Search {
    constructor() {
        this.search = '';
    }

    setSearch(search) {
        if(search ==='' || search === null || search === undefined) return;
        this.search = search;
        return this._search();
    }
    
    async _search() {
        try {
            const data = await fetch(`${BASE_URL}=${this.search}`);
            if(data.status === 500) return alert('다시 시도해주세요');
            return (await data.json());
        }  
        catch(err) {
            console.error(err);
            alert('다시 시도해주세요');
        }
    }
}