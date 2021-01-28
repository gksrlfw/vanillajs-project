export default class Loading {
    constructor($target) {
        this.section = document.createElement('div');
        this.section.classList.add('loading');
        this.section.classList.add('hidden');
        this.section.innerText = 'LOADING';
        $target.appendChild(this.section);
    }


    start() {
        this.section.classList.remove('hidden');
    }

    end() {
        this.section.classList.add('hidden');
    }
}