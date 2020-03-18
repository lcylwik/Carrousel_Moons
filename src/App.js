import React from 'react';
import Elements from './carrousel/elements'
import data from './data/information'

function App() {
  return (
    <div className="App">
      <Elements data={data}></Elements> 
    </div>
  );
}

export default App;
