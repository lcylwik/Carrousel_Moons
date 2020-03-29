import React from 'react';
import style  from './index.module.css'
import Desktop from './desktop/desktop';
import Mobile from './mobile/mobile';
import Tablet from './tablet/tablet';

const CarrouselSteps = ( {info, hasLink, hasArrow, hasDots}) => {

  const information = info;
  const textHeader = information[1].header;
  const createMarkup = () => { return { __html: textHeader }; };
  return (
    <div className={style.CarouselContainer}>
      <div className={style.CarouselHeader}>
        <p className={style.HeaderTitle} dangerouslySetInnerHTML={createMarkup()}></p>
      </div>
      <Mobile info={information}  hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
      <Tablet info={information}  hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
      <Desktop info={information} hasLink={hasLink} hasArrow={hasArrow} hasDots={hasDots}/>
    </div>
  );
}

export default CarrouselSteps;