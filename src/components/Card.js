import {throttle} from '../util/scrollInfinity.js'

export default class Card {
    data;
    constructor($target, onClickModal) {
        this.$target = $target;
        this.onClickModal = onClickModal;
        this.isRandom = false;
        this.section = document.createElement('div');
        this.section.className = 'result';
    }

    render(data) {
        if(!data) return;
        if(this.section.hasChildNodes) this._removeAllChild();
        this.data = data.data;
        this._render();
    }

    renderForRandom(data, isRandom) {
        if(!data) return;
        if(!this.isRandom && this.section.hasChildNodes) { console.log('remove'); this._removeAllChild(); }
        this.isRandom = isRandom;
        this.data = data;
        this._render();
    }

    _removeAllChild() {
        const card = document.querySelectorAll('.card');
        Array.from(card).map(c => this.section.removeChild(c));
    }

    _render() {
        if(!this.data) return;
        console.log(this.data);
        this.data.map((data, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('id', data.id);

            const image = document.createElement('img');
            if(index < 10) image.setAttribute('src', data.url);
            image.setAttribute('data-lazy', data.url);

            const id = document.createElement('p');
            id.innerText = data.id;

            const name = document.createElement('p');
            name.innerText = data.name;

            card.appendChild(image);
            card.appendChild(id);
            card.appendChild(name);
            this.section.appendChild(card);
        });

        // id를 card에 넣고, 이를 이용해서 해당 정보를 찾는다
        this.section.onclick = e => {
            const data = this.data.find(data => data.id === e.target.parentNode.id);
            console.log(data);
            this.onClickModal(data);
        };

        this.$target.appendChild(this.section);
    }    
}