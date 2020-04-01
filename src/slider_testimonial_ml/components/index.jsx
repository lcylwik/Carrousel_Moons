import React from 'react';
import style  from './index.module.css'
import Desktop from './desktop/desktop';
import Mobile from './mobile/mobile';
import Tablet from './tablet/tablet';

const CarrouselTestimonial = ( {info, hasLink, hasArrow, hasDots}) => {

  return (
    <div className={style.CarouselContainer}>
      <Mobile info={info}  hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
      <Tablet info={info}  hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
      <Desktop info={info} hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
    </div>
  );
}

export default CarrouselTestimonial;