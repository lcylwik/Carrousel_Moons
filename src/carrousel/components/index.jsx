import React from 'react';
import style  from './index.module.css'
import Desktop from './desktop/desktop';
import Mobile from './mobile/mobile';
import Tablet from './tablet/tablet';
import { data } from '../data/information'

const CarrouselSteps = () => {

  const information = data;
  const textHeader = information[1].header;
  const createMarkup = () => { return { __html: textHeader }; };

  return (
    <div className={style.CarouselContainer}>
      <div className={style.CarouselHeader}>
        <p className={style.HeaderTitle} dangerouslySetInnerHTML={createMarkup()}></p>
      </div>
      <Mobile info={information} />
      <Tablet info={information} />
      <Desktop info={information}/>
    </div>
  );
}

export default CarrouselSteps;