import React from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import { loadedImgTable, dinamicRef } from '../../utils';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.info = this.props.info;
        this.refSlides = dinamicRef(this.info.length);
    }

    componentDidMount() {
        for (let item of this.refSlides) {
            loadedImgTable(item.current, ()=>{}, this.info.length, false);
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
                        </div>
                    )
                })}
                <button className={`${style.Circle} ${style.Prev}`} onClick={(e) => { }}>{"<"}</button>
                <button className={`${style.Circle} ${style.Next}`} onClick={(e) => { }}>{">"}</button>
            </div >

        );
    }
}

export default Desktop;