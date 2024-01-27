import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div>
        <h1>Welcome to the Homepage!</h1>
        <div>
          <Link to="/rolodex">
            <div className="box">Go to Rolodex</div>
          </Link>
          <Link to="/record">
            <div className="box">Go to Record</div>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Home;