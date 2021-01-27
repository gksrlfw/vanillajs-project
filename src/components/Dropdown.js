export default class Dropdown {
    constructor($target) {
        this.data = [];
        this.section = document.createElement('div');
        this.section.className = 'recommand-box';
        this.section.classList.add('hidden');
        this.target = $target;
    }

    setTarget($target) {
        $target.appendChild(this.section);
    }

    setData(data) {
        this.data = data;
        this._render();
    }

    clear() {
        this.section.innerHTML = '';
    }

    _render() {
        if(!this.data) return this.section.classList.add('hidden');
        this.clear();
        this.section.classList.remove('hidden');
        this.data.map(data => {
            const li = document.createElement('li');
            li.className = 'recommand-list';
            li.innerText = data;
            this.section.appendChild(li);
        });

        this.target.appendChild(this.section);  // 여기서 안하면 input보다 먼저 append 될 수 있다
    }
}