`use strict`;

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import menucards from './modules/menucards';
import calc from './modules/calc';
import form  from './modules/form';
import slider from './modules/slider';
import {openModalFun} from './modules/modal';

window.addEventListener(`DOMContentLoaded`, () => { 
    const modalTimerId = setTimeout(() => openModalFun(`.modal`, modalTimerId), 15000); 

    tabs(`.tabheader__item`, `.tabcontent`, `.tabheader__items`, `tabheader__item_active`);
    modal('button[data-modal]', `.modal`, modalTimerId);
    timer(`.timer`, `2020-08-20`);
    menucards();
    calc();
    form(`form`, modalTimerId);
    slider({
        container: `.offer__slider`,
        nextArrow: `.offer__slider-next`,
        prevArrow: `.offer__slider-prev`,
        slide: `.offer__slide`,
        wrapper: `.offer__slider-wrapper`,
        inner: `.offer__slider-inner`,
        currentCounter: `#current`,
        totalCounter: `#total`

    });

});