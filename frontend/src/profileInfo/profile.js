import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faHeart,
  faUserGroup,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import {
  faFacebook,
  faSquareInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Profile = ({ image, name, birthday, tag, additionalInfo }) => {

  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = () => {
    alert("Searching...")
  }

  return (
    <div className="profile mt-10 flex justify-center items-center flex-col">
      <div className="text-black  flex flex-row items-center justify-center mb-4 bg-white p-2 rounded border border-black p-1">
        <input defaultValue={searchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..."/>
        <button className="active:bg-gray-200 p-1 rounded" onButtonClick={handleSearchSubmit}> Go </button>
      </div>
      <img src={image} alt={name} className="profile-image" />
      <div className="mt-8">
        <p className="font-black text-4xl profile-text">{name}</p>
      </div>

      <div className="flex mt-8">
        <div className="size-16">
          <FontAwesomeIcon icon={faCakeCandles} />
        </div>
        <h2>Birthday: </h2>
      </div>

      <div className="flex mt-8 tag">
        <div className="size-16">
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
        <h2>Relationship: </h2>
      </div>

      <div className="flex mt-8 preference">
        <div className="size-16">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <h2>Preference: </h2>
      </div>

      <div className="flex mt-8 addition">
        <div className="size-16">
          <FontAwesomeIcon icon={faInfo} />
        </div>
        <h2>Additional Info: </h2>
      </div>

      <div className="flex mt-8 socialMedia">
        <div className="size-16">
          <FontAwesomeIcon icon={faFacebook} />
        </div>
        <div className="size-16">
          <FontAwesomeIcon icon={faSquareInstagram} />
        </div>
        <div className="size-16">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </div>
        <div className="size-16">
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
