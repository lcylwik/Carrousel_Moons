import React from 'react';
import './style/index.css';
import Description from './description';
import LinkCita from './linkCita';

const Desktop = ({info}) => {

const id = info.id;
const image = require(`${info.image}`);

    return (
        <div key={id} className="photo_desktop" >
            <img src={image} alt={id} className="carousel_image" />
            <Description key={info.id} item={info}></Description>
            {id === 0 && <LinkCita></LinkCita>}
        </div >
    );
}

export default Desktop;