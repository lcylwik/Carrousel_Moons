import React from 'react';
import '../style/index.css'
import Desktop from './desktop/desktop';
import Mobile from './mobile/mobile';
import Tablet from './tablet/tablet';
import { data } from '../data/information'

const Elements = () => {

  const information = data;
  const textHeader = information[1].header;
  const createMarkup = () => { return { __html: textHeader }; };

  return (
    <div className="carousel_container">
      <div className="carousel_header">
        <p className="header_title" dangerouslySetInnerHTML={createMarkup()}></p>
      </div>
      <Mobile info={information} />
      <Tablet info={information}></Tablet> 
      <Desktop info={information}/>
    </div>
  );
}

export default Elements;