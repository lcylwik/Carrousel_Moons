import React from 'react';
import CarrouselSteps from './carrousel/components/index';
import CarrouselTestimonials from './carrousel_testimonials/components/index'
import steps from './data/information.json';
import howtodo from './data/howtodo.json';


function App() {
  return (
    <div className="App">
      <CarrouselSteps info={steps.data} hasLink={true}></CarrouselSteps>
      <CarrouselTestimonials></CarrouselTestimonials>
      <CarrouselSteps info={howtodo.data} hasLink={false}></CarrouselSteps>
    </div>
  );
}

export default App;
