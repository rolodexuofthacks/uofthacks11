import React from 'react';
import "./card.css";

const CardContent = ({ name, image }) => {
  return (
    <div className='card'>
      <img src={image} alt={name} />
      <div className='description'>
        <h2>{name}</h2>
        <button className='btn'>storyline</button>

      </div>
      
    </div>
  );
};

export default CardContent;
