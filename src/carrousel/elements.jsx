import React from 'react';
import './style/index.css'
import Desktop from './desktop';
import Mobile from './mobile';
import Table from './tablet';
import { data } from './data/information'

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
      <Table info={information}></Table>
      <div className="carousel_desktop">
        {information.map(item => (
          <Desktop key={item.id} info={item} />
        ))}
      </div>
    </div>
  );
}

export default Elements;