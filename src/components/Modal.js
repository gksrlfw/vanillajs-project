export default class Modal {
    data;
    constructor($target) {
        this.$target = $target;
        this.section = document.createElement('div');
    }

    render(data) {
        if(!data || !data.url || !data.name || !data.id) return;
        this.data = data;
        this._render();
    }
    _render() {
        this.section = document.createElement('div');
        this.section.className = 'modal__container';

        const overlay = document.createElement('div');
        overlay.className = 'modal__overlay';

        const content = document.createElement('div');
        content.className = 'modal__content';

        const image = document.createElement('img');
        image.className = 'modal__image';
        image.setAttribute('src', this.data.url);
        content.appendChild(image);

        const close = document.createElement('h1');
        close.className = 'modal__close';
        close.innerText = 'X';
        content.appendChild(close);

        const id = document.createElement('h1');
        id.className = 'modal__id';
        id.innerText = this.data.id;
        content.appendChild(id);

        const name = document.createElement('h1');
        name.className = 'modal__name';
        name.innerText = this.data.name;
        content.appendChild(name);


        close.addEventListener('click', _ => {
            this.$target.removeChild(this.section);
        });
        
        overlay.addEventListener('click', _ => {
            this.$target.removeChild(this.section);
        });

        window.onkeyup = e => {
            if(e.key === 'Escape' || e.key === 'Esc')
                this.$target.removeChild(this.section);
        }

        this.section.appendChild(overlay);
        this.section.appendChild(content);
        this.$target.appendChild(this.section);
    }
}