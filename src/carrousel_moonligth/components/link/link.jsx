import React from 'react';
import style from './link.module.css';
import arrow from '../../assets/arrow.svg'

const LinkCita = () => {

    return (
        <div className={style.StepCarrouselBack}>
            <a href="https://mymoons.co/ubicaciones">
                <span className={style.SpanLinks}>Agenda tu cita</span>
                <img className={style.ArrowRigth} alt="cita" src={arrow} /></a>
        </div>
    );
}

export default LinkCita;