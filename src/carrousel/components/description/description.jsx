import React from 'react';
import style from './description.module.css'

const Description = ({ item }) => {

  return (
    <div className={style.ContainerText}>
      <p className={style.CarrouselTitle}>{item.title}</p>
      <p className={style.CarrouselDescription}>{item.description}</p>
    </div>
  );
}

export default Description;