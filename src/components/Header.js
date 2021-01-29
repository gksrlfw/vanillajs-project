export default class Header {
    constructor($target) {
        this.section = document.createElement('div');
        this.$target = $target;
    }
    
    render() {
        this._render();
    }
    
    _render() {
        this.section.className = 'header';

        const h1 = document.createElement('h1');
        h1.innerText = '고양이 사진 검색기';

        this.section.appendChild(h1);
        this.$target.appendChild(this.section);
    }
}