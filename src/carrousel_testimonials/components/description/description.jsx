import React from 'react';
import style from './description.module.css'
import start from '../../assets/estrella.svg'

const Description = ({ item }) => {

  const starts = () => {
    let starts = [];
    for (var i = 0; i < 5; i++) {
      starts.push(<img src={start} alt={`start_${i}`} className={style.TestimonialStar} />);
    }
    return starts
  }

  return (
    <div className={style.ContainerText}>
      <div className={style.ContainerStar}>
        {starts()}
      </div>
      <p className={style.CarrouselData}>{`${item.name}, ${item.edad} años`}</p>
      <p className={style.CarrouselDescription}>{item.description}</p>
    </div>
  );
}

export default Description;