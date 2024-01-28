import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import Tim from './Tim.PNG'



const Home = () => {
    return (
      <div className="homemain  flex flex-col items-center justify-center h-screen">
        <img src={Tim} 
        alt='Tim' width="25%" height="25%" style={{ 
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
          className="timScale"/>
        <h1 className=' title1 font-serif'> Welcome to the </h1> 
        <h1 className=' title1 font-serif'> RoloTim.ai </h1> 
      
        <div className="flex items-center">
          <Link to="/rolodex"className="box m-4 p-4 bg-#47A3BB-700 text-white rounded" >
            <div className="rolodex">
                <h2 className='text-2xl font-normal hover:font-bold'>Go to Rolodex</h2>
                
                </div>
          </Link>
        <button>
          <Link to="/record" className="box m-4 p-4 bg-#FECC1B-700 text-white rounded">
            <div className="record">
                <h2 className='text-2xl font-normal hover:font-bold'>Go to Record</h2>
            </div>
          </Link>
          </button>
        </div>
      </div>
    );
  };
  
  export default Home;