import {getRes} from '../services/services';

function menucards () {
    class MenuCards {
        constructor(src, alt, title, text, price, parentSelector, ...classes ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        createNewItem() {
            const element = document.createElement(`div`);
            if (this.classes.length == 0) {
                element.classList = `menu__item`;
            }
            else {
                this.classes.forEach(ClassName => element.classList.add(ClassName)); 
            }
            element.innerHTML += `                
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
                 `;
                 this.parent.append(element);
        }

    }
 
    getRes(`http://localhost:3000/menu`)
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCards(img, altimg, title, descr, price, `.menu .container`).createNewItem();
            });
        });
   
}

export default menucards;