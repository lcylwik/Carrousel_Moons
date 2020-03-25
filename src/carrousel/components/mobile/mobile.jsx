import React, { createRef } from 'react';
import style from './mobile.module.css';
import Description from '../description/description';
import LinkCita from '../link/link';
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
        this.totalSlides = this.info.length;

        this.refSlider = createRef();
        this.refSliderContainer = createRef();
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

    gotoSlide = (n) => {
        if(n !== undefined) {
            this.curSlide = n;
        }
        this.refSliderContainer.current.style.transition = `left ${this.def.transition.speed / 1000}s ${this.def.transition.easing}`;
        this.refSliderContainer.current.style.left = `${-this.curSlide * this.slideW}px`

        setTimeout(() => {
            this.refSliderContainer.current.style.transition = ''
        }, this.def.transition.speed);

        this.setDot();
    }

    setDot = () => {
        let children = this.refDots.current.children;
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

    Moving = (e) => {
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.moveX = touch.pageX;

        // for scrolling up and down
        if (Math.abs(this.moveX - this.startX) < 40) return;

        this.refSliderContainer.current.style.left = `${this.curLeft + this.moveX - this.startX}px`
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
        this.restValues();
    }

    restValues = () => {
        this.startX = 0;
        this.moveX = 0;
    }

    getCurrentLeft = () => {
        const left = this.refSliderContainer.current.style.left
        if (left) this.curLeft = parseInt(left, 10);
    }

    updateSliderDimension = (e) => {
        this.slideW = this.getSlideW();
        this.refSlider.current.style.left = `${- this.slideW * this.curSlide}px`;
    }

    getSlideW = () => {
        const allSlider = this.refAllSlide;
        if (allSlider.length > 0)
            this.slideW = parseInt(allSlider[0].current.offsetWidth);
        else this.slideW = 0
        return this.slideW;
    }

    init = () => {
        let allSlide = this.refAllSlide;

        for (let item of allSlide) {
            loadedImg(item.current, this.updateSliderDimension, this.totalSlides);
        }
        this.setDot();
        this.getSlideW();
    }

    render() {
        return (
            <div className={style.CarouselMovil}>
                <div ref={this.refSliderContainer} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.Moving(e)} onTouchEnd={(e) => this.endMove(e)} className={style.SlideshowContainer}>
                    <div>
                        <div ref={this.refSlider} className={style.SliderMove} >
                            {this.info.map((item, index) => {
                                return (
                                    <div key={index} className={style.StepContainerImages}>
                                        <div ref={this.refAllSlide[index]} >
                                            <img ref={this.refImage} alt="step-one" data-src={item.image_2} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div ref={this.refDots} className={style.SliderBootOut}>
                    {this.info.map((item, index) => {
                        return (<button key={index} onClick={(e) => { this.gotoSlide(index) }}>
                        </button>)
                    })}
                </div>

                {this.info.map((item, index) => {
                    if (this.state.footerPosition === index) 
                    return (<Description key={item.id} item={item}></Description>)
                    else return '';
                })}
                <LinkCita></LinkCita>
            </div>
        );
    }
}
export default Mobile;