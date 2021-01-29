
const BASE_URL = `https://api.thecatapi.com/v1/images/search?limit=20`;

export default class RandomSearchApi {
    constructor() {
        this.controller = new AbortController();
    }

    abort() {
        this.controller.abort();
        this.controller = new AbortController();
    }

    setSearch() {
        return this._search();
    }
    
    async _search() {
        try {
            const data = await fetch(`${BASE_URL}`, { signal: this.controller.signal });    
            if(data.status === 500) return alert('검색 에러입니다. 다시 시도해주세요');
            return (await data.json());
        }  
        catch(err) {
            if(err.code === 20) return console.log(err.message);
            console.error(err.message);
            alert('검색 에러입니다. 다시 시도해주세요');
        }
    }
}