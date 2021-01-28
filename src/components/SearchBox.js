export default class SearchBox {
    constructor({ $target, onRecommand, onSearch }) {
        this.section = document.createElement('form');
        this.section.className = 'search-box-form';
        this.onRecommand = onRecommand;
        this.onSearch = onSearch;

        $target.appendChild(this.section);
        this._render();
    }

    _render() {
        const input = document.createElement('input');
        input.className = 'search-box';
        input.setAttribute('placeholder', '묘종을 입력해주세요!');

        this.section.addEventListener('keyup', async e => {
            this.onRecommand(e, input);
        });

        this.section.addEventListener('submit', async e => {
            this.onSearch(e, input.value);
            input.value = '';
            input.focus();
        });

        this.section.appendChild(input);
    }





    // constructor($target, recommand, search, dropdown) {
    //     this.section = document.createElement('form');
    //     this.section.className = 'search-box-form';
    //     this.recommand = recommand;
    //     this.search = search;
    //     this.dropdown = dropdown;

    //     $target.appendChild(this.section);
    //     this._render();
    // }

    // _render() {
    //     // input,  
    //     const input = document.createElement('input');
    //     input.className = 'search-box';
    //     input.setAttribute('placeholder', '묘종을 입력해주세요!');

    //     this.section.addEventListener('keyup', async e => {
    //         if(e.keyCode === 27) {
    //             this.dropdown.clear(); this.dropdown.create(); 
    //             this.dropdown.setData('');
    //             return;
    //         }
            
    //         if(e.keyCode === 40) {
    //             this.dropdown.downHighlight();
    //         }

    //         if(e.keyCode === 38) {
    //             this.dropdown.upHighlight();
    //         }

    //         console.log(input.value);
    //         const data = await this.recommand.setKeyword(input.value);
    //         this.dropdown.setData(data);
            
            
    //     });

    //     this.section.addEventListener('submit', async e => {
    //         e.preventDefault();
    //         const data = await this.search.setSearch(input.value);
    //         this.dropdown.clear();
    //         this.dropdown.create();
    //         input.value = '';
    //         input.focus();
    //     });

    //     this.section.appendChild(input);

    // }
}