import React from 'react';
import './style/slider.css'

const Description = ({ item }) => {

  return (
    <div className="container_text">
      <p className="carrousel_title">{item.title}</p>
      <p className="carrousel_description">{item.description}</p>
    </div>
  );
}

export default Description;