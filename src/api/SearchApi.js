
const BASE_URL = `https://jf3iw5iguk.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q`;

export default class SearchApi {
    constructor() {
        this.search = '';
        this.controller = new AbortController();
    }

    logging() {
        console.log('hello!!!');
    }

    abort() {
        this.controller.abort();
        this.controller = new AbortController();    // abort를 한번 하면 계속 유지됨... 다시 controller를 만드니까 제대로 동작한다
    }

    setSearch(search) {
        if(search ==='' || search === null || search === undefined) return;
        this.search = search;
        return this._search();
    }
    
    async _search() {
        try {
            const data = await fetch(`${BASE_URL}=${this.search}`, { signal: this.controller.signal });    
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