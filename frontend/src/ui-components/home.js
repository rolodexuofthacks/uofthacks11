import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Tim from "./Tim.PNG";

const Home = () => {
  return (
    <div className="homemain  flex flex-col items-center justify-center h-screen">
      <img
        src={Tim}
        alt="Tim"
        width="25%"
        height="25%"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="timScale"
      />
      <h1 className=" title1 font-serif"> Welcome to RoloTim.ai </h1>
      <h1 className=" title2 font-serif">Your digital memory guardian </h1>

      <div className="home-btn-container">

        <button className="home-btn">
        <Link
          to="/rolodex"
          
        >
          <div className="rolodex">
            <p >
              Go to Rolodex
            </p>
          </div>
        </Link>
        
        </button>
        <button className="home-btn ">
          <Link
            to="/record"
           
          >
            <div className="record">
              <p>
                Go to Record
              </p>
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
