export default class SearchBox {
    constructor($target, recommand, dropdown) {
        this.section = document.createElement('form');
        this.section.className = 'search-box-form';
        this.recommand = recommand;
        this.dropdown = dropdown;

        $target.appendChild(this.section);
        this._render();
    }

    _render() {
        // input,  
        const input = document.createElement('input');
        input.className = 'search-box';
        input.setAttribute('placeholder', '묘종을 입력해주세요!');

        this.section.addEventListener('keyup', async (e) => {
            console.log(input.value);
            const data = await this.recommand.setKeyword(input.value);
            console.log(data);
            // this.dropdown.setTarget(this.section);
            this.dropdown.setData(data);
            
        });


        this.section.appendChild(input);

    }
}