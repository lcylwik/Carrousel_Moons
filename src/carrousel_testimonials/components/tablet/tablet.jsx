import React, { createRef } from 'react';
import style from './tablet.module.css';
import Description from '../description/description';
import { loadedImgTable, dinamicRef } from '../../utils';

class Tablet extends React.Component {

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
        this.totalSlides = this.info.length;

        this.refSlider = createRef();
        this.refSliderTable = createRef();
        this.refAllSlide = dinamicRef(this.totalSlides);

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
        let allSlide = this.refAllSlide;

        for (let item of allSlide) {
            loadedImgTable(item.current, this.updateSliderDimension, this.totalSlides);
        }
        this.getSlideW();
    }


    updateSliderDimension = (e) => {
        this.refSlider.current.style.width = `${(450 + this.slideMargin) * this.totalSlides}px`;

        this.slideW = this.getSlideW();
        this.refSlider.current.style.left = `${- this.slideW * this.curSlide}px`;
        this.curSlide = 0;
        this.gotoSlide();
    }

    getSlideW = () => {
        const allSlider = this.refAllSlide;
        let node = allSlider[0].current;
        if (allSlider.length > 0 && node) {
            this.slideW = parseInt(node.offsetWidth);
            let nodeStyle = window.getComputedStyle(node.parentNode)
            this.slideMargin = parseInt(nodeStyle.getPropertyValue('margin-right'));
        } else {
            this.slideW = 0;
        } 
        return this.slideW;
    }

    getCurrentLeft = () => {
        const left = this.refSliderTable.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    gotoSlide = (n) => {  
        if (n === "prev" && this.curSlide !== 0) this.curSlide--;
        if (n === "next" && this.curSlide !== this.totalSlides - 1) this.curSlide++

        this.refSliderTable.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        this.refSliderTable.current.style.left = `${-this.curSlide * (this.slideW +  this.slideMargin * 2)}px`

        setTimeout(() => {
            this.refSliderTable.current.style.transition = ''
        }, this.def.transition.speed);
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

        this.refSliderTable.current.style.left = `${this.curLeft + 1 + this.moveX - this.startX}px`
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
            } else if (this.curSlide === this.totalSlides) {
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
            <div className={style.CarouselTablet}>
                <div ref={this.refSliderTable} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.Moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideshowContainerTable}>
                    <div>
                        <div ref={this.refSlider} className={style.SliderMoveTablet} >
                            {this.info.map((item, index) => (
                                <div key={index} className={style.StepContainerImagesTable}>
                                    <div ref={this.refAllSlide[index]} className={style.MoonsImageTwoTable}>
                                        <img alt="step-one" className={style.OneImageTable} data-src={item.image} />
                                        <Description key={index} item={item}></Description>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { this.gotoSlide("prev") }}>{"<"}</button>
                <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { this.gotoSlide("next") }}>{">"}</button>
            </div>
        );
    }

}
export default Tablet;