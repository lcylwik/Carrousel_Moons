import React, { createRef } from 'react';
import style from './tablet.module.css';
import Description from '../description/description';
import LinkCita from '../link/link';
import { loadedImg, dinamicRef } from '../../utils';

class Tablet extends React.Component {

    constructor(props) {
        super(props);

        this.curLeft = 0
        this.moveX = 0
        this.startX = 0
        this.curSlide = 0
        this.loadedCnt = 0;
        this.slideW = 0;
        this.offsetLeft = 0;
        this.totalSlides = this.props.info.length;

        this.refSlider = createRef();
        this.refSliderTable = createRef();
        this.refImage = createRef();
        this.refAllSlide = dinamicRef(this.totalSlides);
        this.refDots = createRef();
        this.refWrapper = createRef();

        this.def = {
            transition: {
                speed: 300,
                easing: ''
            },
            swipe: true,
            autoHeight: false,
            afterChangeSlide: () => { }
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
        let allSlide = this.refAllSlide;

        for (let item of allSlide) {
            loadedImg(item.current, this.updateSliderDimension, this.totalSlides, false);
        }
        //this.refSliderTable.current.style.left = `0px`
        this.setDot();
        this.getSlideW();
    }

    setDot = () => {
        const { hasDots } = this.props;
        if (this.totalSlides <= 2 || !hasDots) return;
        let children = this.refDots.current.children;

        for (let i = 0; i < children.length; i++) {
            if (i === this.curSlide || i - 1 === this.curSlide) {
                children[i].classList.add(style.SliderActive);
                children[i].classList.remove(style.SliderBotton);
            } else {
                children[i].classList.add(style.SliderBotton);
                children[i].classList.remove(style.SliderActive);
            }
        }
        if (this.curSlide === this.totalSlides - 1) {
            children[this.curSlide - 1].classList.add(style.SliderActive);
            children[this.curSlide - 1].classList.remove(style.SliderBotton);
        }
    }

    updateSliderDimension = (e) => {
        this.slideW = this.getSlideW();
        //this.refSlider.current.style.left = `${- this.slideW * this.curSlide}px`;
        this.refSlider.current.style.width = `${((window.innerWidth - 16 - 42*2)/2) * this.totalSlides}px`;
        this.refWrapper.current.style.width = `${(window.innerWidth - 16 - 42*2)}px`;
        
        this.getSlideW();
    }

    getSlideW = () => {
        const allSlider = this.refAllSlide;
        if (allSlider.length > 0) {
            this.slideW = parseInt(allSlider[0].current.offsetWidth);
            this.offsetLeft = parseInt(allSlider[0].current.offsetLeft);
        }
        else this.slideW = 0
        return this.slideW;
    }

    getCurrentLeft = () => {
        const left = this.refSlider.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    gotoSlide = (n) => {
        if (n !== undefined) {
            this.curSlide = n;
        }
        this.refSlider.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        if (this.curSlide === this.totalSlides - 1) {
            this.refSlider.current.style.left = `${-(this.curSlide - 1) * (this.slideW + 2 * this.offsetLeft)}px`
        } else {
            this.refSlider.current.style.left = `${-this.curSlide * (this.slideW + 2 * this.offsetLeft)}px`
        }

        setTimeout(() => {
            this.refSlider.current.style.transition = ''
        }, this.def.transition.speed);

        this.setDot();
    }

    startMove = (e) => {
        this.getCurrentLeft();
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.startX = touch.pageX;
    }

    Moving = (e) => {
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.moveX = touch.pageX;

        if (Math.abs(this.moveX - this.startX) < 40) return;

        this.refSlider.current.style.left = `${this.curLeft + this.moveX - this.startX}px`
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
            } else if (this.curSlide === this.totalSlides - 1 || (this.curSlide === this.totalSlides)) {
                this.curSlide -= 1;
            }
        }
        this.gotoSlide();
        this.restValues();
    }

    restValues = () => {
        this.startX = 0;
        this.moveX = 0;
    }

    arrowMove = (dir) => {
        if (dir === "prev" && this.curSlide !== 0) this.curSlide--;
        if (dir === "next" && this.curSlide !== this.totalSlides - 2) this.curSlide++

        this.gotoSlide(this.curSlide);
    }

    render() {
        const { info, hasLink, hasDots, hasArrow } = this.props
        return (
            <div className={style.TabletContainer}>
                <div className={style.CarouselTablet}>
                    {this.totalSlides > 2 && hasArrow &&
                    <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { this.arrowMove("prev")}}>{"<"}</button>}
                    <div ref={this.refWrapper} className={`${style.Wrapper}`}>
                            <div ref={this.refSlider} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.Moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideshowContainerTable}>
                                {info.map((item, index) => (
                                    <div ref={this.refAllSlide[index]} key={index} className={style.PhotoTablet}>
                                            <img alt="step-one" className={style.CarouselImage} data-src={item.image_2} />
                                            <Description key={index} item={item}></Description>
                                        </div>
                                ))}
                            </div>
                    </div>
                {this.totalSlides > 2 && hasArrow &&
                        <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { this.arrowMove("next") }}>{">"}</button>}
                </div>
                {this.totalSlides > 2 && hasDots && <div ref={this.refDots} className={style.SliderBootOut}>
                    {info.map((item, index) => {
                        return (<button key={index} onClick={(e) => { this.gotoSlide(index) }}>
                        </button>)
                    })}
                </div>}
                {hasLink && <LinkCita></LinkCita>}
            </div>
        );
    }

}
export default Tablet;