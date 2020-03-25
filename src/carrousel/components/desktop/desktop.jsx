import React from 'react';
import style from './desktop.module.css'
import Description from '../description/description';
import LinkCita from '../link/link';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.info = this.props.info;
    }

    render() {
        return (
            <div className={style.CarouselDesktop}>
                {this.info.map((info, index) => {
                    const image = require(`../../assets/${index + 1}/rectangle.jpg`);
                    return (
                        <div key={index} className={style.PhotoDesktop}>
                            <img src={image} alt={index} className={style.CarouselImage} />
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