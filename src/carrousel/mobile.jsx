import React, { createRef } from 'react';
import './style/slider.css'
import './style/index.css'
import Description from './description';
import LinkCita from './linkCita';
import { loadedImg, dinamicRef } from './utils';

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
        for (const el of this.refDots.current.children) {
            el.classList.remove("slider_active")
        }
        this.refDots.current.children[this.curSlide].classList.add("slider_active")
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
        console.log("swipeMove")
        const touch = e.targetTouches[0] || e.changedTouches[0];
        this.moveX = touch.pageX;

        // for scrolling up and down
        if (Math.abs(this.moveX - this.startX) < 40) return;

        this.refSliderContainer.current.style.left = `${this.curLeft + this.moveX - this.startX}px`
    }

    endMove = (e) => {
        console.log("swipeEnd", e)
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
            <div className="carousel_movil">
                <div ref={this.refSliderContainer} onTouchStart={(e) => this.startMove(e)} onTouchMove={(e) => this.Moving(e)} onTouchEnd={(e) => this.endMove(e)} className="slideshow_container">
                    <div>
                        <div ref={this.refSlider} className="slider_move_0" >
                            {this.info.map((item, index) => {
                                return (
                                    <div key={index} className="step_container_images">
                                        <div ref={this.refAllSlide[index]} className="moons_image_carrusel">
                                            <img ref={this.refImage} alt="step-one" data-src={item.image_2} className="steps-image" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div ref={this.refDots} className="slider_boot_out">
                    {this.info.map((item, index) => {
                        return (<button key={index} className="slider_botton" onClick={(e) => { this.gotoSlide(index) }}>
                        </button>)
                    })}
                </div>

                {this.info.map((item, index) => {
                    if (this.state.footerPosition === index) 
                    return (<Description key={item.id} item={item}></Description>)
                })}
                <LinkCita></LinkCita>
            </div>
        );
    }
}
export default Mobile;