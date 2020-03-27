import React, { createRef } from 'react';
import style from './mobile.module.css';
import Description from '../description/description';
import { loadedImg, dinamicRef } from '../../utils';

class Mobile extends React.Component {

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

        this.refSliderTes = createRef();
        this.refSliderContainerTes = createRef();
        this.refAllSlideTes = dinamicRef(this.totalSlides);
        this.refDotsTes = createRef();

        this.def = {
            transition: {
                speed: 300,
                easing: ''
            },
            swipe: true,
            autoHeight: false,
        }
        this.state = {
            footerPosition: 0
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.updateSlider);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.updateSlider);
    }

    componentDidMount() {
        this.init();
        this.updateSlider();
    }

    gotoSlide = (n) => {
        if(n !== undefined) {
            this.curSlide = n;
        }
        this.refSliderContainerTes.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        this.refSliderContainerTes.current.style.left = `${-this.curSlide * (this.slideW +  this.slideMargin * 2)}px`

        setTimeout(() => {
            this.refSliderContainerTes.current.style.transition = ''
        }, this.def.transition.speed);

        this.setDot();
    }

    setDot = () => {
        let children = this.refDotsTes.current.children;
        for (let i = 0; i < children.length; i++) {
            if(i === this.curSlide) {
                children[i].classList.add(style.SliderActive);
                children[i].classList.remove(style.SliderBotton);
            } else {
                children[i].classList.add(style.SliderBotton);
                children[i].classList.remove(style.SliderActive);
            }
        }
        this.setState({
            footerPosition: this.curSlide
        });
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

        this.refSliderContainerTes.current.style.left = `${this.curLeft + this.moveX - this.startX}px`
    }

    endMove = (e) => {
        this.getCurrentLeft();

        if (Math.abs(this.moveX - this.startX) === 0) return;

        const stayAtCur = Math.abs(this.moveX - this.startX) < 40 || this.moveX === 0 ? true : false;
        const dir = this.startX < this.moveX ? 'left' : 'right';

        if (!stayAtCur) {
            dir === 'left' ? this.curSlide-- : this.curSlide++;
            if (this.curSlide < 0) {
                this.curSlide = 0;
            } else if (this.curSlide === this.totalSlides) {
                this.curSlide--;
            }
        }

        this.gotoSlide();
        this.resetValues();
    }

    resetValues = () => {
        this.startX = 0;
        this.moveX = 0;
    }

    getCurrentLeft = () => {
        const left = this.refSliderContainerTes.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    updateSlider = (e) => {
        if(window.innerWidth >= 471){
            this.refSliderTes.current.style.width = `${(400 + this.slideMargin) * this.totalSlides}px`;
        } else {
            this.refSliderTes.current.style.width = `${(295 + this.slideMargin) * this.totalSlides}px`;
        }
        this.slideW = this.getSlideW();
        this.refSliderTes.current.style.left = `${- this.slideW * this.curSlide}px`;
        this.gotoSlide(0);
    }

    getSlideW = () => {
        const allSlider = this.refAllSlideTes;
        let node = allSlider[0].current;
        if (allSlider.length > 0 && node) {
            this.slideW = parseInt(node.offsetWidth);
            let nodeStyle = window.getComputedStyle(node)
            this.slideMargin = parseInt(nodeStyle.getPropertyValue('margin-right'));
        } else {
            this.slideW = 0;
        } 
        return this.slideW;
    }

    init = () => {
        let allSlide = this.refSliderTes.current.children;

        for (let item of allSlide) {
            loadedImg(item, this.updateSlider, this.totalSlides);
        }
       this.setDot();
       this.getSlideW();
    }

    

    render() {
        return (
            <div className={style.CarouselMovil}>
                <div ref={this.refSliderContainerTes} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideshowContainer}>
                    <div>
                        <div ref={this.refSliderTes} className={style.SliderMove} >
                            {this.info.map((item, index) => {
                                return (
                                    <div ref={this.refAllSlideTes[index]} key={index} data-image={item.image} className={style.StepContainerImages}>
                                       <Description item={item}></Description>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div ref={this.refDotsTes} className={style.SliderBootOut}>
                    {this.info.map((item, index) => {
                        return (<button key={index} onClick={(e) => { this.gotoSlide(index) }}>
                        </button>)
                    })}
                </div>
            </div>
        );
    }
}
export default Mobile;