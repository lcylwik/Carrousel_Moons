import React, { createRef } from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import LinkCita from '../link/link';
import { loadedImg, dinamicRef, getStyleItemByProperty } from '../../utils';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.curLeft = 0
        this.moveX = 0
        this.startX = 0
        this.curSlide = 0
        this.loadedCnt = 0;
        this.slideW = 0;
        this.slideMargin = 0;
        this.totalSlides = this.props.info.length;

        this.refSliderDesktop = createRef();
        this.refSlides = dinamicRef(this.totalSlides);
        this.refDots = createRef();
        this.refWrapper = createRef();
        this.refDesktopContainer = createRef();

        this.def = {
            transition: {
                speed: 300,
                easing: ''
            },
            swipe: true,
            autoHeight: false,
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.updateSliderDimension);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.updateSliderDimension);
    }

    componentDidMount() {
        this.init();
        this.updateSliderDimension();
    }

    init = () => {
        let allSlide = this.refSlides;

        for (let item of allSlide) {
            loadedImg(item.current, this.updateSliderDimension, this.totalSlides, false);
        }
        this.getSlideW();
        this.setDot(this.curSlide);
        if (this.totalSlides === 3) this.fixMarginWithSlider();
    }

    updateSliderDimension = (e) => {
        if(this.totalSlides === 3){
            this.refDesktopContainer.current.style.maxWidth = `100%`;
            this.refWrapper.current.style.maxWidth = `100%`;
        } else {
            if (window.innerWidth > 1100) {
                this.refSliderDesktop.current.style.width = `${(333) * this.totalSlides}px`;
            } else {
                this.refSliderDesktop.current.style.width = `${((window.innerWidth - 16 - 42 * 2) / 3) * this.totalSlides}px`;
            }
            this.refWrapper.current.style.width = `${(window.innerWidth - 16 - 42 * 2)}px`;
        }
        

        this.getSlideW();
    }

    getCurrentLeft = () => {
        const left = this.refSliderDesktop.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    startMove = (e) => {
        this.getCurrentLeft();
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.startX = touch.pageX;
    }

    moving = (e) => {
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.moveX = touch.pageX;

        if (Math.abs(this.moveX - this.startX) < 40) return;

        if(this.totalSlides > 3) {
            this.refSliderDesktop.current.style.left = `${this.curLeft + 1 + this.moveX - this.startX}px`
        }
    }

    endMove = (e) => {
        this.getCurrentLeft();

        if (Math.abs(this.moveX - this.startX) === 0 || (this.moveX === 0)) return;

        const stayAtCur = Math.abs(this.moveX - this.startX) < 40 || this.moveX === 0 ? true : false;
        const dir = this.startX < this.moveX ? 'left' : 'right';

        if (!stayAtCur) {
            dir === 'left' ? this.curSlide -= 1 : this.curSlide += 1;
            if (this.curSlide < 0) {
                this.curSlide = 0;
            } else if (this.curSlide === this.totalSlides - 2) {
                this.curSlide -= 1;
            }
        }
        this.gotoSlide();
        this.restValues();
    }

    fixMarginWithSlider = () => {
      this.refSlides.foreach((item) => {
          item.current.classList.add(style.PhotoDesktopThree)
      })
    }

    restValues = () => {
        this.startX = 0;
        this.moveX = 0;
    }

    getSlideW = () => {
        const allSlider = this.refSlides;
        let node = allSlider[0].current;
        if (allSlider.length > 0 && node) {
            this.slideW = parseInt(node.offsetWidth);
            this.slideMargin = getStyleItemByProperty(node, 'margin-right');
        } else {
            this.slideW = 0;
        }
    }

    arrowMove = (dir) => {
        if (dir === "prev" && this.curSlide !== 0) this.curSlide--;
        if (dir === "next" && this.curSlide !== this.totalSlides - 3) this.curSlide++

        this.gotoSlide(this.curSlide);
    }

    gotoSlide = (n) => {
        this.refSliderDesktop.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        this.refSliderDesktop.current.style.left = `${-n * (this.slideW + this.slideMargin)}px`

        setTimeout(() => {
            this.refSliderDesktop.current.style.transition = ''
        }, this.def.transition.speed);

        this.setDot(n);
    }

    bottonsMove = (n) => {
        const difLastPosition = this.totalSlides - n;

        if (difLastPosition === 2) {
            this.curSlide = n - 1
            this.gotoSlide(this.curSlide)
        } else if (difLastPosition === 1) {
            this.curSlide = n - 2
            this.gotoSlide(this.curSlide)
        } else {
            this.curSlide = n
            this.gotoSlide(this.curSlide);
        }
    }

    setDot = (n) => {
        const { hasDots } = this.props;
        if (this.totalSlides <= 3 || !hasDots) return;
        let children = this.refDots.current.children;
        for (let i = 0; i < children.length; i++) {
            if (i === n || i - 1 === n || i - 2 === n) {
                this.activeButtons(children[i]);
            } else {
                this.desactiveButtons(children[i]);
            }
        }
        if (n === this.totalSlides - 1) {
            this.activeButtons(children[n - 1]);
            this.activeButtons(children[n - 2]);
        } else if (n === this.totalSlides - 2) {
            this.activeButtons(children[n - 1]);
        }
    }

    activeButtons = (element) => {
        element.classList.add(style.SliderActive);
        element.classList.remove(style.SliderBotton);
    }

    desactiveButtons = (element) => {
        element.classList.add(style.SliderBotton);
        element.classList.remove(style.SliderActive);
    }

    render() {
        const { info, hasLink, hasArrow, hasDots } = this.props;
        return (
            <div ref={this.refDesktopContainer} className={style.DesktopContainer}>
                <div className={style.CarouselDesktop}>
                    {this.totalSlides > 3 && hasArrow &&
                        <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { this.arrowMove("prev") }}>{"<"}</button>}
                    <div ref={this.refWrapper} className={`${style.Wrapper}`}>
                        <div ref={this.refSliderDesktop} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideShowContainerDesktop}>
                            {info.map((item, index) => {
                                return (
                                    <div ref={this.refSlides[index]} key={index} className={style.PhotoDesktop}>
                                        <img data-src={item.image} alt={index} className={style.CarouselImage} />
                                        <Description key={index} item={item}></Description>
                                        {index === 0 && hasLink && <LinkCita></LinkCita>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {this.totalSlides > 3 && hasArrow &&
                        <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { this.arrowMove("next") }}>{">"}</button>}
                </div>
                {this.totalSlides > 3 && hasDots && <div ref={this.refDots} className={style.SliderBootOut}>
                    {info.map((item, index) => {
                        return (<button key={index} onClick={(e) => { this.bottonsMove(index) }}>
                        </button>)
                    })}
                </div>}
            </div>
        );
    }
}

export default Desktop;