import React, {createRef} from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import LinkCita from '../link/link';
import { loadedImg, dinamicRef } from '../../utils';

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
        this.fatherPadding = 0;
        this.totalSlides = this.props.info.length;

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

    componentDidMount() {
        for (let item of this.refSlides) {
            loadedImg(item.current, () => { }, this.totalSlides, false);
        }
    }

    render() {
        const { info, hasLink, hasArrow } = this.props;
        return (
            <div className={style.CarouselDesktop}>
                {this.totalSlides > 3 && hasArrow &&
                    <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { /*this.gotoSlide("prev")*/ }}>{"<"}</button>}
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
                {this.totalSlides > 3 && hasArrow &&
                    <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { /*this.gotoSlide("next")*/ }}>{">"}</button>}
            </div>
        );
    }
}

export default Desktop;