import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import rectangle from './assets/1/rectangle.jpg';
// import rectangle2 from './assets/2/rectangle.jpg';
// import rectangle3 from './assets/3/rectangle.jpg';
import './style/index.css'
import Desktop from './desktop';
import Mobile from './mobile';

const Elements = ({ info }) => {

  const information = info.data;
  const textHeader = information[1].header;
  const createMarkup = () => { return {__html: textHeader}; };

  return (
    <div className="carousel_Container">
      <div className="carousel_header">
        <p className="header_title" dangerouslySetInnerHTML={createMarkup()}></p>
      </div>
      <Mobile info={information} />
      <div className="carousel_tablet">Tablet</div>
      <div className="carousel_desktop">
        {information.map(item => (
          <Desktop key={item.id} info={item} />
        ))}
      </div>
    </div>
  );
}

export default Elements;