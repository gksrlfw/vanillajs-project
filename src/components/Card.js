export default class Card {
    constructor($target) {
        this.section = document.createElement('div');
        this.section.className = 'result';
        this.$target = $target;
    }

    setData(data) {
        if(!data) return;
        this.data = data.data;
        this._render();
    }   

    _render() {
        if(!this.data) return;
        console.log(this.data);
        this.data.map(data => {
            const card = document.createElement('div');
            card.className = 'card';

            const image = document.createElement('img');
            image.setAttribute('src', data.url);

            const id = document.createElement('p');
            id.innerText = data.id;

            const name = document.createElement('p');
            name.innerText = data.name;

            card.appendChild(image);
            card.appendChild(id);
            card.appendChild(name);
            this.section.appendChild(card);
        });

        this.$target.appendChild(this.section);
    }
}