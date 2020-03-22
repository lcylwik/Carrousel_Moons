import React, { useEffect, useRef, useState, useLayoutEffect, createRef } from 'react';
import { data } from '../carrousel/data/information.json'
import './style/index.scss'
import Description from '../carrousel/description';

const Elements = () => {

  const textHeader = data[1].header;
  const createMarkup = () => { return { __html: textHeader } };

  const refSlider = useRef(null);
  const refDots = useRef(null);
  const refSliderInner = useRef(null);
  const refAllSlide = useRef(data.map(() => createRef()));
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [isAnimating, setAnimating] = useState(false);
  const [activeDot, setActiveDot] = useState(false);

  let curLeft = 0, moveX = 0, moveY = 0, curSlide = 1, slideW = 0, loadedCnt = 0;
  let totalSlides = 0;

  const def = {
    transition: {
      speed: 300,
      easing: ''
    },
    swipe: true,
    autoHeight: false,
    afterChangeSlide: () => { }
  }

  const init = () => {
    totalSlides = refSliderInner.current.children.length;
    let allSlide = refSliderInner.current.children;

    allSlide = refSliderInner.current.children

    refSliderInner.current.style.width = (totalSlides) * 100 + "%"

    for (let item of allSlide) {
      item.style.width = 100 / totalSlides + "%"
      loadedImg(item)
    }

    setDot();
  }


  useEffect(() => {
  })



  useLayoutEffect(() => {
    init();
    updateSliderDimension();
    window.addEventListener('resize', updateSliderDimension);
    return () => {
      window.removeEventListener('resize', updateSliderDimension);
    };
  }, []);

  const loadedImg = ((el) => {
    let loaded = false;
    const loadHandler = () => {
      if (loaded) return;
      loaded = true;
      loadedCnt++;
      if (loadedCnt >= totalSlides) {
        updateSliderDimension();
      }
    }

    let img = el.firstElementChild;
    if (img) {
      img.onload = loadHandler;
      img.src = require(`${img.dataset.src}`);
      img.style.display = 'block';
      if (img.complete) {
        loadHandler()
      }
    } else {
      updateSliderDimension();
    }
  })

  const gotoSlide = (e) => {
    if (e) curSlide = parseInt(e.currentTarget.dataset.slide);

    refSliderInner.current.style.transition = `left ${def.transition.speed / 1000}s ${def.transition.easing}`;
    refSliderInner.current.style.left = `${-curSlide * slideW}px`
    setAnimating(true);

    setTimeout(() => {
      refSliderInner.current.style.transition = ''
      setAnimating(false);
    }, def.transition.speed);

    setDot();
    if (def.autoHeight) {
      refSlider.current.style.height = `${refSliderInner.current.children[curSlide].offsetHeight}px`
    }

    def.afterChangeSlide()
  }

  const setDot = () => {
    debugger
    let tardot = curSlide - 1;
    for (const li of refDots.current.children) {
      li.classList.remove("active")
    }
    if (curSlide - 1 < 0) {
      tardot = totalSlides - 1;
    } else if (curSlide - 1 > totalSlides - 1) {
      tardot = 0;
    }
    refDots.current.children[tardot].classList.add("active")
  }

  const getCurrentLeft = () => {
    const left = refSliderInner.current.style.left
    if (left) curLeft = parseInt(left, 10);
  }


  const startSwipe = (e) => {
    getCurrentLeft();
    const touch = e.targetTouches[0] || e.changedTouches[0];
    setStartX(touch.pageX);
    setStartY(touch.pageY)
  }

  const swipeMove = (e) => {
    console.log("swipeMove")
    const touch = e.targetTouches[0] || e.changedTouches[0];
    moveX = touch.pageX;
    moveY = touch.pageY;

    // for scrolling up and down
    if (Math.abs(moveX - startX) < 40) return;

    setAnimating(true);
    if (curLeft + moveX - startX > 0 && curLeft === 0) {
      curLeft = totalSlides * slideW
    } else if (curLeft + moveX - startX < -(totalSlides) * slideW) {
      curLeft = -slideW
    }
    refSliderInner.current.style.left = `${curLeft + moveX - startX}px`
  }

  const swipeEnd = (e) => {
    console.log("swipeEnd", e)
    getCurrentLeft();

    if (Math.abs(moveX - startX) === 0) return;

    const stayAtCur = Math.abs(moveX - startX) < 40 || typeof moveX === 0 ? true : false;
    const dir = startX < moveX ? 'left' : 'right';

    if (!stayAtCur) {
      dir === 'left' ? curSlide-- : curSlide++;
      if (curSlide < 0) {
        curSlide = totalSlides
      } else if (curSlide === totalSlides) {
        curSlide = 1;
      }
    }

    gotoSlide();
    restValues();
    setAnimating(false);
  }

  const restValues = () => {
    setStartX(0);
    setStartY(0);
    moveX = 0;
    moveY = 0;
  }

  const updateSliderDimension = (e) => {
    debugger
    const allSlider = refSliderInner.current.children;
    slideW = parseInt(allSlider[0].offsetWidth);
    refSliderInner.current.style.left = `${- slideW * curSlide}px`;

    if (def.autoHeight) {
      refSlider.current.style.height = `${refSliderInner.current.children[curSlide].offsetHeight}px`
    } else {
      for (let i = 0; i < totalSlides; i++) {
        refSlider.current.height = `${refSliderInner.current.children[i].offsetHeight}px`
      }
    }
    def.afterChangeSlide();
  }

  return (
    <div className="carousel_container" >
      <div className="carousel_header">
        <p className="header_title" dangerouslySetInnerHTML={createMarkup()}></p>
      </div>
      <div ref={refSlider} className={`slider ${isAnimating ? "isAnimating" : ""}`}>
        <div ref={refSliderInner} className="slider-inner" onTouchStart={(e) => startSwipe(e)} onTouchMove={(e) => swipeMove(e)} onTouchEnd={(e) => swipeEnd(e)} >
          {data.map((it, index) => {
            return (
              <div ref={refAllSlide.current[index]} key={index} className="slide">
                <img data-src={it.image} alt={index} />
              </div>)
          })}
        </div>
      </div>
      <div ref={refDots} className="dots-wrapper" >
        {
          data.map((it, index) => {
            return (<li key={it.id} data-slide={index + 1} onClick={(e) => gotoSlide(e)}></li>)
          })
        }
      </div >
      <Description key={data[0].id} item={data[0]}></Description>
    </div >
  );
}

export default Elements;