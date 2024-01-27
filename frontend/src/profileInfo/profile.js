import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCakeCandles,
    faHeart,
    faUserGroup,
    faInfo, 
} from "@fortawesome/free-solid-svg-icons";

import {
    faFacebook,
    faSquareInstagram, 
    faLinkedinIn, 
    faTwitter } from "@fortawesome/free-brands-svg-icons";
const Profile = ({ image, name, birthday, tag, additionalInfo }) => {
  return (
    <div className="profile mt-10 flex justify-center items-center flex-col">
    
      <img src={image} alt={name} className="profile-image" />


        <p className='font-black text-5xl'>{name}</p>
        
        <div className="flex mt-10">
            <div className='size-16'><FontAwesomeIcon icon={faCakeCandles} /></div>
            <h2>Birthday: </h2>
        </div>

        <div className='flex mt-10 tag'>
            <div className='size-16'><FontAwesomeIcon icon={faUserGroup} /></div>
            <h2>Relationship: </h2>
        </div>

        <div className='flex mt-10 preference'>
            <div className='size-16'><FontAwesomeIcon icon={faHeart} /></div>
            <h2>Preference: </h2>
        </div>


        <div className='flex mt-10 addition'>
            <div className='size-16'><FontAwesomeIcon icon={faInfo} /></div>
            <h2>Additional Info: </h2>
        </div>

        <div className='flex mt-10 socialMedia'>
            <div className='size-16'><FontAwesomeIcon icon={faFacebook} /></div>
            <div className='size-16'><FontAwesomeIcon icon={faSquareInstagram} /></div>
            <div className='size-16'><FontAwesomeIcon icon={faLinkedinIn} /></div>
            <div className='size-16'><FontAwesomeIcon icon={faTwitter} /></div>

        </div>
    </div>
  );
};

export default Profile;