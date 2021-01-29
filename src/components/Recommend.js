export default class Recommend {
    section; data; 
    constructor($target) {
        this.$target = $target;
        this.curHL = 0;
        this.isAddBtn = false;
        this.addBtnNumber = 20;
        this._create();
    }

    render(data) {
        this.curHL = 0;
        this.data = data;
        if(this.data && (this.data.length >= this.addBtnNumber)) this.isAddBtn = true;
        this._render();
    }

    init() {
        this._clear();
        this._create();
    }

    selectHighlight(value) {
        Array.from(this.section.childNodes).map((node, index) => {
            if(node === value) {
                console.log(this.curHL, index);
                this.section.childNodes[this.curHL].classList.remove('highlight');
                this.section.childNodes[index].classList.add('highlight');
                this.curHL = index;
            }
        });
    }

    downHighlight() {
        console.log(this.curHL);
        this.section.childNodes[this.curHL++].classList.remove('highlight');
        if(this.isAddBtn && (this.curHL === this.addBtnNumber)) this.curHL = 0;
        if(!this.isAddBtn && (this.curHL === this.data.length)) this.curHL = 0;
        this.section.childNodes[this.curHL].classList.add('highlight');
        return this.section.childNodes[this.curHL].innerText;
    }

    upHighlight() {
        this.section.childNodes[this.curHL--].classList.remove('highlight');
        if(this.isAddBtn && (this.curHL === -1)) this.curHL = this.addBtnNumber - 1;
        if(!this.isAddBtn && (this.curHL === -1)) this.curHL = this.data.length - 1;
        this.section.childNodes[this.curHL].classList.add('highlight');
        return this.section.childNodes[this.curHL].innerText;
    }

    _init() {
        this._clear();
        this._create();
    }

    _create() {
        this.section = document.createElement('div');
        this.section.className = 'recommand-box';
        this.section.classList.add('hidden');
        this.$target.appendChild(this.section);
    }

    _clear() {
        this.$target.removeChild(this.section);
    }

    _render() {
        if(!this.data) return this.section.classList.add('hidden');
        this._init();
        this.section.classList.remove('hidden');
        
        let length = this.data.length;
        if(this.isAddBtn) length = this.addBtnNumber;
        this._renderRecommandList(length);

        if(this.isAddBtn) {
            const add = document.createElement('button');
            add.className = 'add';
            add.innerText = '더보기';
            this.section.appendChild(add);

            const remove = document.createElement('button');
            remove.className = 'remove';
            remove.innerText = '줄이기';
            

            add.addEventListener('click', _ => {
                this._renderRecommandList(this.data.length);
                add.classList.add('hidden');
                this.section.appendChild(remove);
                this.isAddBtn = false;
            });

            remove.addEventListener('click', _ => {
                this.isAddBtn = true;
                this.section.removeChild(remove);
                this._render();
            });
        }
    }

    _renderRecommandList(length) {
        let start, end;
        if(length === this.data.length) {
            start = 20; end = length;
        }
        else if(length === 20) {
            start = 0; end = 20;
        }
        else {
            start = 0; end = length;
        }
        Array.from(this.data).slice(start, end).map((data, index) => {
            const li = document.createElement('li');
            li.className = 'recommand-list';
            li.innerText = data;
            if(index+start === this.curHL) li.classList.add('highlight');
            this.section.appendChild(li);
        });
    }
}