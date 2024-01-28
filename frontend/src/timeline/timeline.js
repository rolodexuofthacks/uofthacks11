import React, { useState, useEffect, Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./timeline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChampagneGlasses,
  faHandshake,
  faMugHot,
  faGift,
  faHeadphones,
  faCamera,
  faPlane,
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import timelineData from "./timelineData.json"; // Import your JSON data
import Profile from "../profileInfo/profile";

const Timeline = () => {
  const location = useLocation();
  const { state } = location;
  const [timelineData, setTimelineData] = useState([]);
  const { name, image, id } = state || {};
  const [noteText, setNoteText] = useState("");

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/user_test/${id}/events`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimelineData(data);
        console.log(data); // Using setCards to update the state
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);
  // Function to generate a random hex color
  // Array of predefined background colors
  const backgroundColors = [
    "#FFD28E",
    "#EFA1C8",
    "#CAB2FB",
    "#D3FFB2",
    "#E1EBFF",
    "#E3A1E3",
  ];

  // Function to get a random color from the predefined array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randomIndex];
  };

  const iconList = [
    faChampagneGlasses,
    faHandshake,
    faMugHot,
    faGift,
    faHeadphones,
    faCamera,
    faPlane,
  ];

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    return iconList[randomIndex];
  };

  const handleSubmitNotes = () => {
    //post noteText to backend
    
    alert("Your note has been successfully saved!")
  }

  return (
    <div className="timeline-container w-full flex">
      <div className="profile w-1/3 ">
        <Profile name={name} image={image} />
      </div>
      {/*comment*/}
      <div className="timeline w-2/3 max-h-full overflow-auto">
        <VerticalTimeline>
          {timelineData.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                // background: getRandomColor(),
                borderRadius: "15px",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                display: "block",
              }}
              date={<span className="custom-date">{event.date}</span>}
              iconStyle={{ background: getRandomColor(), color: "#000" }}
              icon={<FontAwesomeIcon icon={getRandomIcon()} />}
            >
              {/* <div>
            <img src={event.image}></img>
          </div>
 */}

              <div className="w-full">
                <div className="text-black">
                  <h3 className="title font-bold underline">SUMMARY: </h3>
                  <p>{event.summary}</p>
                </div>

                <div className="text-black  flex flex-col items-center justify-center ">
                  <h3 className="title mt-3 font-bold underline">NOTES: </h3>

                  <textarea
                    type="text"
                    defaultValue={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={5}
                    className="w-full resize-none border border-black p-1 rounded"
                  />

                  <button onClick={handleSubmitNotes}>Save Notes</button>
                </div>
              </div>

              <div className="w-full mt-8 text-black">
                <div className="flex">
                  <div className="mr-5">
                    <FontAwesomeIcon icon={faCalendar} />
                  </div>
                  <h3 className="vertical-timeline-element-title">
                    {event.name}
                  </h3>
                </div>
                <div className="flex text-black">
                  <div className="mr-5">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <h3 className="vertical-timeline-element-subtitle">
                    {event.location}
                  </h3>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Timeline;
