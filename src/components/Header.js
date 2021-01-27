export default class Header {
    constructor($target) {
        this.section = document.createElement('div');
        this.section.className = 'header';
        
        $target.appendChild(this.section);
        this._render();
    }

    _render() {
        const h1 = document.createElement('h1');
        h1.innerText = '고양이 사진 검색기';

        this.section.appendChild(h1);
    }
}