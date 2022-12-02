function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapperSlider, trackSlider}) {

    const sldLeft = document.querySelector(prevArrow), 
          sldRight = document.querySelector(nextArrow), 
          current = document.querySelector(currentCounter),
          all = document.querySelector(totalCounter),
          slides = document.querySelectorAll(slide), // slide - каждый отдельно слайд
          generalSlider = document.querySelector(container), // container - наш главный слайдер
          wrapper = document.querySelector(wrapperSlider),
          track = document.querySelector(trackSlider),
          width = window.getComputedStyle(wrapper).width; 
     
    let i = 0;
    let offset = 0; 

    if (slides.length < 10) {
        all.textContent = `0${slides.length}`;
        current.textContent = `0${i + 1}`;
    } else {
        all.textContent = slides.length;
        current.textContent = i + 1;
    }

    track.style.width = 100 * slides.length + '%'; 
    track.style.display = 'flex'; 
    track.style.transition = '0.5s all'; 
    wrapper.style.overflow = 'hidden'; 

    slides.forEach(slide => { 
        slide.style.width = width; 
    });

   sldRight.addEventListener('click', () => {
      
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }
        track.style.transform = `translateX(-${offset}px)`; 

        if (i == slides.length - 1) {
            i = 0;
        } else {
            i++;
        }

        if (slides.length < 10) {
            current.textContent = `0${i + 1}`;
        } else {
            current.textContent = i + 1;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i].style.opacity = 1;
    });


   sldLeft.addEventListener('click', () => {
   
        if (offset == 0) { 
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2); 
        }
        track.style.transform = `translateX(-${offset}px)`; 

        if (i == 0) {
            i = slides.length - 1;
        } else {
            i--;
        }

        if (slides.length < 10) {
            current.textContent = `0${i + 1}`;
        } else {
            current.textContent = i + 1;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i].style.opacity = 1;
    
    });

    const dots = []; 

    generalSlider.style.position = 'relative';

    const indicators = document.createElement('ol'); 
    indicators.classList.add('carousel-indicators'); 

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 

    generalSlider.append(indicators); 

   
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); 
    }

    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
         
            const slideTo = e.target.getAttribute('data-slide-to');

            i = slideTo - 1;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            track.style.transform = `translateX(-${offset}px)`; 

            if (slides.length < 10) {
                current.textContent = `0${i + 1}`;
            } else {
                current.textContent = i + 1;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[i].style.opacity = 1;
        });
    });
}

export default slider;