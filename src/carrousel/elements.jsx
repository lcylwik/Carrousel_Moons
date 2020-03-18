import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from 'infinite-react-carousel';
// import rectangle from './assets/1/rectangle.jpg';
// import rectangle2 from './assets/2/rectangle.jpg';
// import rectangle3 from './assets/3/rectangle.jpg';
import './index.css'
import Description from './description';

const Elements = (data) => {


  return (
    <div>
      <span>CustomSlider</span>
      <Description></Description>
    </div>
  );
}

export default Elements;