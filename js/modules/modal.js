function openModalFun(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = `block`;

    console.log(modalTimerId);
    if (modalTimerId) {
    clearInterval(modalTimerId);
    }
}

function closeModalFun(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = `none`;
} 

function modal (triggerSelector, modalSelector, modalTimerId) {
    const modalOpen = document.querySelectorAll(triggerSelector),     
    modal = document.querySelector(modalSelector);

modalOpen.forEach((btn) => {
    btn.addEventListener(`click`, () => {
        openModalFun(modalSelector, modalTimerId);
        
    });
});


modal.addEventListener(`click`, (event) => {
    if (event.target === modal || event.target.getAttribute(`data-close`) == '')  {
        closeModalFun(modalSelector);
    }
});

document.addEventListener(`keydown`, (e) => {
    if (event.code === `Escape` && modal.style.display == `block`) {
        console.log(`123`);
        closeModalFun(modalSelector);
    }
});


function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModalFun(modalSelector, modalTimerId);
        clearInterval(modalTimerId);
        removeEventListener(`scroll`, showModalByScroll);
    }
}

window.addEventListener(`scroll`, showModalByScroll);
}

export default modal;
export {closeModalFun};
export {openModalFun};