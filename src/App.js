import React from 'react';
import CarrouselSteps from './carrousel/components/index';
import CarrouselTestimonials from './carrousel_testimonials/components/index'
import steps from './data/information.json';
import howtodo from './data/howtodo.json';


function App() {
  return (
    <div className="App">
      <CarrouselSteps info={steps.data} hasLink={true} hasArrow={false} hasDots={false}></CarrouselSteps>
      <CarrouselTestimonials></CarrouselTestimonials>
      <CarrouselSteps info={howtodo.data} hasLink={false} hasArrow={true} hasDots={true}></CarrouselSteps>
    </div>
  );
}

export default App;
