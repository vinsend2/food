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

export default slider;