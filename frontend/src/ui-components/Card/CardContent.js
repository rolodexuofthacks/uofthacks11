import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";

const CardContent = ({ name, image }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/storyline", { state: { name, image } });
  }

  return (
    <div className="personCard">
      <img src={image} alt={name} />
      <div className="description font-mono">
        <h2>{name}</h2>
        <button onClick={handleClick} className="border rounded-md border-slate-600 hover:border-indigo-600">
          <p className="m-3">View Storyline</p>
        </button>
      </div>
    </div>
  );
};

export default CardContent;
