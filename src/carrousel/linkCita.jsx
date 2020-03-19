import React from 'react';
import './style/slider.css'
import arrow from './assets/arrow_1.svg'

const LinkCita = () => {

    return (
        <div className="step_carrousel_back">
            <a className="stemp_links" href="https://mymoons.co/ubicaciones">
                <span className="span_links">Agenda tu cita</span>
                <img className="arrow_rigth" alt="Agenda tu cita" height="11"
                    width="32" src={arrow} /></a>
        </div>
    );
}

export default LinkCita;