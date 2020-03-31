import React, { createRef } from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import LinkCita from '../link/link';
import { loadedImg, dinamicRef, getStyleItemByProperty } from '../../utils';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.totalSlides = this.props.info.length;
        this.refSlides = dinamicRef(this.totalSlides);
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        let allSlide = this.refSlides;

        for (let item of allSlide) {
            loadedImg(item.current, () => {}, this.totalSlides, false);
        }
    }

    render() {
        const { info } = this.props;
        return (
            <div className={style.DesktopContainer}>
                <div className={style.CarouselDesktop}>
                    <div className={`${style.Wrapper}`}>
                        <div className={style.SlideShowContainerDesktop}>
                            {info.map((item, index) => {
                                return (
                                    <div ref={this.refSlides[index]} key={index} className={style.PhotoDesktop}>
                                        <img data-src={item.image} alt={index} className={style.CarouselImage} />
                                        <Description key={index} item={item}></Description>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Desktop;