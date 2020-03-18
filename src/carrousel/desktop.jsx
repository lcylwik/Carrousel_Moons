import React from 'react';
import './style/index.css'

const Desktop = ({info}) => {

const id = info.id;
const image = require(`${info.image}`);

    return (
        <div key={id} className="photo_desktop" >
            <img src={image} alt={id} className="carousel_image" />
            <div className="text_container">
                <p className="text_title">{info.title}</p>
                <p className="text_description">{info.description}</p>
            </div>
        </div >
    );
}

export default Desktop;