import {closeModalFun, openModalFun} from './modal';
import {postForm} from '../services/services';

function form (formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const msg = {
        loading: `bitrix/templates/Food/icons/spinner.svg`,
        success: `Спасибо мы скоро с вами свяжемся`,
        failed: `Ошибка`
    };

    function bindPostForm(form) {
        form.addEventListener(`submit`, (e) => {
            e.preventDefault();  
            
            const statusMsg = document.createElement(`img`);            
            statusMsg.src = msg.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;`;           
            form.insertAdjacentElement(`afterend`, statusMsg);

            const formData = new FormData(form);  
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });   
           
            postForm(`http://localhost:3000/requests`, json )
            .then(data => {
                console.log(data);   
                    showModalThanks(msg.success);                
                    form.reset();                
                    statusMsg.remove();
            }).catch(() => {
                showModalThanks(msg.failed);  
            }).finally(() => {
                form.reset();  
            });
                     
        });
    }
    forms.forEach(item => {
        bindPostForm(item);
    });

  
    function showModalThanks (msg) {
        const prevModalDialog = document.querySelector(`.modal__dialog`);

        prevModalDialog.classList.add(`hide`);
        openModalFun(`.modal`, modalTimerId);

        const thanksModal = document.createElement(`div`);
        thanksModal.classList.add(`modal__dialog`);
        thanksModal.innerHTML = `
        <div class="modal__content">        
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${msg}</div>          
        </div>`;

        document.querySelector(`.modal`).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add(`show`);
            prevModalDialog.classList.remove(`hide`);
        }, 3000);
    }
}

export default form;