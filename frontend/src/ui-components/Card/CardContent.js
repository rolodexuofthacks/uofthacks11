import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";

const CardContent = ({ name, image }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/storyline");
  }

  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="description">
        <h2>{name}</h2>
        <button onClick={handleClick} className="btn">
          View Storyline
        </button>
      </div>
    </div>
  );
};

export default CardContent;
