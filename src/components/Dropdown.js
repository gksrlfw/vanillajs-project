export default class Dropdown {
    constructor($target) {
        this.data = [];
        this.curHL = 0;
        this.target = $target;
        this.create();
    }

    setTarget($target) {
        $target.appendChild(this.section);
    }

    setData(data) {
        this.data = data;
        this._render();
    }

    clear() {
        this.target.removeChild(this.section);
    }

    create() {
        this.section = document.createElement('div');
        this.section.className = 'recommand-box';
        this.section.classList.add('hidden');
        this.target.appendChild(this.section);
    }

    downHighlight() {
        this.section.childNodes[this.curHL++].classList.remove('highlight');
        this.section.childNodes[this.curHL].classList.add('highlight');
    }

    upHighlight() {
        this.section.childNodes[this.curHL--].classList.remove('highlight');
        this.section.childNodes[this.curHL].classList.add('highlight');
    }

    _render() {
        if(!this.data) return this.section.classList.add('hidden');
        this.clear();
        this.create();
        this.section.classList.remove('hidden');
        this.data.map((data, index) => {
            const li = document.createElement('li');
            li.className = 'recommand-list';
            li.innerText = data;
            if(index === this.curHL) li.classList.add('highlight');
            this.section.appendChild(li);
        });

        this.target.appendChild(this.section);  // 여기서 안하면 input보다 먼저 append 될 수 있다
    }
}