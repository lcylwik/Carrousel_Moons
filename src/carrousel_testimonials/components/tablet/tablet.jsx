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
        this.offsetLeft = 0;
        this.totalSlides = this.info.length;

        this.refSlider = createRef();
        this.refSliderTable = createRef();
        this.refImage = createRef();
        this.refAllSlide = dinamicRef(this.totalSlides);
        this.refDots = createRef();

        this.def = {
            transition: {
                speed: 300,
                easing: ''
            },
            swipe: true,
            autoHeight: false,
            afterChangeSlide: () => { }
        }
        this.state = {
            footerPosition: 0
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
        this.slideW = this.getSlideW();
        this.refSlider.current.style.left = `${- this.slideW * this.curSlide}px`;
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
        const left = this.refSliderTable.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    gotoSlide = (n) => {
        if (n === 1) return;
        if (n !== undefined) {
            this.curSlide = n;
        }
        this.refSliderTable.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        if (this.curSlide === 0) {
            this.refSliderTable.current.style.left = `${-(this.curSlide) * this.slideW}px`
        } else {
            this.refSliderTable.current.style.left = `${-(this.curSlide - 1) * this.slideW - 2 * this.offsetLeft}px`
        }

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

        this.refSliderTable.current.style.left = `${this.curLeft + this.moveX - this.startX}px`
    }

    endMove = (e) => {
        this.getCurrentLeft();

        if (Math.abs(this.moveX - this.startX) === 0 || (this.moveX === 0)) return;

        const stayAtCur = Math.abs(this.moveX - this.startX) < 40 || this.moveX === 0 ? true : false;
        const dir = this.startX < this.moveX ? 'left' : 'right';

        if (!stayAtCur) {
            dir === 'left' ? this.curSlide-=2 : this.curSlide+=2;
            if (this.curSlide < 0) {
                this.curSlide = 0;
            } else if (this.curSlide === this.totalSlides + 1) {
                this.curSlide-=2;
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
                <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { console.log(e) }}>{"<"}</button>
                <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { console.log(e) }}>{">"}</button>
                  
            </div>
        );
    }

}
export default Tablet;