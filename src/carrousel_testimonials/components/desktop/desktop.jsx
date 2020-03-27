import React, { createRef } from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import { loadedImgTable, dinamicRef, getStyleItemByProperty } from '../../utils';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.info = this.props.info

        this.curLeft = 0
        this.moveX = 0
        this.startX = 0
        this.curSlide = 0
        this.loadedCnt = 0;
        this.slideW = 0;
        this.slideMargin = 0;
        this.fatherPadding = 0;
        this.totalSlides = this.info.length;

        this.refSliderDesktop = createRef();
        this.refSlides = dinamicRef(this.totalSlides);

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
            loadedImgTable(item.current, this.updateSliderDimension, this.totalSlides);
        }
        this.getSlideW();
    }

    updateSliderDimension = (e) => {
        this.refSliderDesktop.current.style.width = `${(450 + this.slideMargin) * this.totalSlides}px`;

        this.slideW = this.getSlideW();
        // this.refSliderDesktop.current.style.left = `${- this.slideW * this.curSlide}px`;
        if (this.curSlide === 0) {
            this.refSliderDesktop.current.style.left = `${-this.fatherPadding / 2}px`
        }
    }

    getSlideW = () => {
        const allSlider = this.refSlides;
        let node = allSlider[0].current;
        if (allSlider.length > 0 && node) {
            this.slideW = parseInt(node.offsetWidth);
            this.slideMargin = getStyleItemByProperty(node,'margin-right');
            this.fatherPadding = getStyleItemByProperty(node.parentNode,'padding-left');
        } else {
            this.slideW = 0;
        }
        return this.slideW;
    }

    gotoSlide = (n) => {
        if (n === "prev" && this.curSlide !== 0) this.curSlide--;
        if (n === "next" && this.curSlide !== this.totalSlides - 3) this.curSlide++

        this.refSliderDesktop.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        this.refSliderDesktop.current.style.left = `${-this.curSlide * (this.slideW + this.slideMargin * 2) - this.fatherPadding / 2}px`

        setTimeout(() => {
            this.refSliderDesktop.current.style.transition = ''
        }, this.def.transition.speed);
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

        this.refSliderDesktop.current.style.left = `${this.curLeft + 1 + this.moveX - this.startX}px`
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

    restValues = () => {
        this.startX = 0;
        this.moveX = 0;
    }

    render() {
        return (
            <div className={style.CarouselDesktop}>
                {this.totalSlides > 3 &&
                    <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { this.gotoSlide("prev") }}>{"<"}</button>}
                <div ref={this.refSliderDesktop} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideShowContainerDesktop}>
                    {this.info.map((info, index) => {
                        return (
                            <div ref={this.refSlides[index]} key={index} className={style.PhotoDesktop}>
                                <img data-src={info.image} alt={index} className={style.CarouselImage} />
                                <Description key={index} item={info}></Description>
                            </div>
                        )
                    })}
                </div>
                {this.totalSlides > 3 &&
                    <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { this.gotoSlide("next") }}>{">"}</button>}
            </div>
        );
    }
}

export default Desktop;