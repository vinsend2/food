/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc () {
    const result = document.querySelector(`.calculating__result span`); 
    let sex, 
        height,
        weight,
        age,
        ratio;

    if(localStorage.getItem(`sex`)) {
            sex = localStorage.getItem(`sex`);
        } else {
            sex = `female`;
            localStorage.setItem(`sex`, `female`);
        }
    if(localStorage.getItem(`ratio`)) {
            ratio = localStorage.getItem(`ratio`);
        } else {
            ratio = 1.375;
            localStorage.setItem(`ratio`, `1.375`);
        }

    function initLocalSet(selector, activClass) {
        const elements = document.querySelectorAll(selector);
       
        elements.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute(`id`) === localStorage.getItem(`sex`)) {
                elem.classList.add(activClass);
                
            }
            if (elem.getAttribute(`data-ratio`) === localStorage.getItem(`ratio`)) {
                elem.classList.add(activClass);
                
            }
        });
    }

    initLocalSet(`#gender div`, `calculating__choose-item_active`);
    initLocalSet(`.calculating__choose_big div`, `calculating__choose-item_active`);


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = `____`;
            return;
        }
        if (sex == `female`) {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);  
        }
    }    

    calcTotal();

    function getStaticInfo(parentSelector, activClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener(`click`, (e) => {
                if (e.target.getAttribute(`data-ratio`)) {
                    ratio = +e.target.getAttribute(`data-ratio`);  
                    localStorage.setItem(`ratio`, +e.target.getAttribute(`data-ratio`));                
                }
                else {
                    sex = e.target.getAttribute(`id`);                     
                    localStorage.setItem(`sex`, e.target.getAttribute(`id`));                  
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activClass);
                });
    
                e.target.classList.add(activClass);
                calcTotal();
            });
        });      
       
    }

    getStaticInfo(`#gender`, `calculating__choose-item_active`);
    getStaticInfo(`.calculating__choose_big`, `calculating__choose-item_active`);

    function getCalcInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener(`input`, () => {
            if (input.value.match(/\D/g)) {
                input.style.border = `1px solid red`;
            } 
            else {
                input.style.border = `none`;
            }

            switch(input.getAttribute(`id`)) {
                case `height`: 
                    height = +input.value;
                    break;
                case `weight`: 
                    weight = +input.value;
                    break;
                case `age`: 
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
      
    }

    getCalcInfo(`#height`);
    getCalcInfo(`#age`);
    getCalcInfo(`#weight`);
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
           
            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postForm"])(`http://localhost:3000/requests`, json )
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
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModalFun"])(`.modal`, modalTimerId);

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

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/menucards.js":
/*!*********************************!*\
  !*** ./js/modules/menucards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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
 
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getRes"])(`http://localhost:3000/menu`)
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCards(img, altimg, title, descr, price, `.menu .container`).createNewItem();
            });
        });
   
}

/* harmony default export */ __webpack_exports__["default"] = (menucards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModalFun, openModalFun */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalFun", function() { return closeModalFun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModalFun", function() { return openModalFun; });
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

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevBtn = document.querySelector(prevArrow),
    nextBtn = document.querySelector(nextArrow),
    sliderWrapper = document.querySelector(wrapper),
    sliderInner = document.querySelector(inner),
    width = window.getComputedStyle(sliderWrapper).width;
let  currentSlide = document.querySelector(currentCounter);
let  totalSlide = document.querySelector(totalCounter);
let  numberSlides = 1,
    offset = 0;

sliderInner.style.width = 100 * slides.length + `%`;
sliderInner.style.display = `flex`;
sliderInner.style.transition = `0.5s all`;   
sliderWrapper.style.overflow = `hidden`;

totalSlide.textContent = `${0}`+ slides.length;  
currentSlide.textContent = `${0}`+ numberSlides;   

slides.forEach(slide => {
  slide.style.width = width;        
});

slider.style.position = 'relative';

const dots = document.createElement(`ol`),
    dotsArr = [];
dots.classList.add(`carousel-indicators`);
slider.append(dots);

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement(`li`);
  dot.setAttribute(`data-slide-to`, i + 1);
  dot.classList.add(`dot`);
  dots.append(dot);
  dotsArr.push(dot);
  if(i == 0) {
      dot.style.opacity = 1;
  }
}


nextBtn.addEventListener(`click`, () => {  
  if (offset == SlicePx() * (slides.length - 1)) {
      offset = 0;
  }
  else {offset += SlicePx();
  }       

  sliderInner.style.transform = `translateX(-${offset}px)`;
  plusSlides(1);
  currentSlide.textContent = `${0}`+ numberSlides;  
  dotsArr.forEach(dot => {
      dot.style.opacity = 0.5;
  });
  dotsArr[numberSlides - 1].style.opacity = 1; 
});

prevBtn.addEventListener(`click`, () => {  
  if (offset == 0) {
      offset = SlicePx() * (slides.length - 1);
  }
  else {offset -= SlicePx();
  }
  plusSlides(-1);
  sliderInner.style.transform = `translateX(-${offset}px)`;
  currentSlide.textContent = `${0}`+ numberSlides;  
  dotsArr.forEach(dot => {
      dot.style.opacity = 0.5;
  });
  dotsArr[numberSlides - 1].style.opacity = 1;  
});

dotsArr.forEach( dot => { 
  dot.addEventListener(`click`, (e) => {
  const slideTo = e.target.getAttribute(`data-slide-to`);
  numberSlides = slideTo;
  offset = SlicePx() * (slideTo - 1);
  sliderInner.style.transform = `translateX(-${offset}px)`;
  dotsArr.forEach(dot => {
      dot.style.opacity = 0.5;
  });
  dotsArr[numberSlides - 1].style.opacity = 1;          
  currentSlide.textContent = `${0}`+ numberSlides;
  });
});

function numSlide (n) {
  if (n > slides.length) {
              numberSlides = 1;
          }
  
   if (n < 1) {
              numberSlides = slides.length;
          }     
                  
       }
  
function plusSlides (n) {
   numSlide (numberSlides += n);
     }

function SlicePx () {       
   let fff;  
   fff = +width.replace(/\D/g, ``);  
   return fff;       
}
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add(`hide`);
            item.classList.remove(`show`, `fade`);
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add(`show`, `fade`);
        tabsContent[i].classList.remove(`hide`);
        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabContent();


    tabsParent.addEventListener(`click`, (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer (id, deadline) {
   
    function getTimeRemeining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    function setCloak(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector(`#days`),
            hours = document.querySelector(`#hours`),
            minutes = document.querySelector(`#minutes`),
            seconds = document.querySelector(`#seconds`),
            timeinterval = setInterval(() => {
                updateClock();
            }, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemeining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }
    setCloak(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_menucards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menucards */ "./js/modules/menucards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
`use strict`;










window.addEventListener(`DOMContentLoaded`, () => { 
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModalFun"])(`.modal`, modalTimerId), 15000); 

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(`.tabheader__item`, `.tabcontent`, `.tabheader__items`, `tabheader__item_active`);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('button[data-modal]', `.modal`, modalTimerId);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(`.timer`, `2020-08-20`);
    Object(_modules_menucards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_form__WEBPACK_IMPORTED_MODULE_5__["default"])(`form`, modalTimerId);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postForm, getRes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postForm", function() { return postForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRes", function() { return getRes; });
const postForm = async (url, data) => {
    const res = await fetch(url, {
        method: `POST`,
        headers: { 
            'Content-type': 'application/json'
        },
        body: data
                   
    });

    return await res.json();
};

const getRes = async (url) => {
    const res = await fetch(url);
    
    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};
 




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map