import React from 'react';
import '../../style/index.css';
import Description from '../description/description';
import LinkCita from '../link/link';

class Desktop extends React.Component {

    constructor(props) {
        super(props);

        this.info = this.props.info;
    }

    render() {
        return (
            <div className="carousel_desktop">
                {this.info.map((info, index) => {
                    const image = require(`../../assets/${index + 1}/rectangle.jpg`);
                    return (
                        <div key={index} className="photo_desktop" >
                            <img src={image} alt={index} className="carousel_image" />
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