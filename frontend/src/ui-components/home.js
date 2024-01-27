import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css"

const Home = () => {
    return (
      <div className="homemain flex flex-col items-center justify-center h-screen">
        <h1 className='title1 font-serif'> Welcome to the</h1>
        <h1 className='title1 font-serif'>RoloTim.ai</h1>
        <div className="flex items-center">

          <Link to="/rolodex"className="box m-4 p-4 bg-#47A3BB-700 text-white rounded" >
            <div className="rolodex">
                
                <p className='text-2xl font-normal hover:font-bold'>Go to Rolodex</p>
                
                </div>
          </Link>

          <Link to="/record" className="box m-4 p-4 bg-#FECC1B-700 text-white rounded">
            <div className="record">
                <p className='text-2xl font-normal hover:font-bold'>Go to Record</p>
            </div>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Home;