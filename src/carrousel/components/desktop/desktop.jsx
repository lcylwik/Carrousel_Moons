import React from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import LinkCita from '../link/link';
import { loadedImg, dinamicRef } from '../../utils';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.info = this.props.info;
        this.refSlides = dinamicRef(this.info.length);
    }

    componentDidMount() {
        for (let item of this.refSlides) {
            loadedImg(item.current, ()=>{}, this.info.length, false);
        }
    }

    render() {
        return (
            <div className={style.CarouselDesktop}>
                {this.info.map((info, index) => {
                    return (
                        <div ref={this.refSlides[index]} key={index} className={style.PhotoDesktop}>
                            <img data-src={info.image} alt={index} className={style.CarouselImage} />
                            <Description key={index} item={info}></Description>
                            {index === 0 && <LinkCita></LinkCita>}
                        </div>
                    )
                })}
            </div >

        );
    }
}

export default Desktop;