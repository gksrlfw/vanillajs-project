export default class Loading {
    constructor($target) {
        this.$target = $target;
        this.section = document.createElement('div');
        this._render();
    }

    start() {
        this.section.classList.remove('hidden');
    }

    end() {
        this.section.classList.add('hidden');
    }

    _render() {
        this.section.classList.add('loading');
        this.section.classList.add('hidden');
        this.section.innerText = 'LOADING';
        this.$target.appendChild(this.section);
    }
}