import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

function App() {
  //example to fetch
  const [text, setText] = useState("");

  // State to handle loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to handle any errors
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setText(data);
      });
  }, []);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    uploadImage(imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const uploadImage = (testimg) => {
    console.log(testimg);
    fetch("http://127.0.0.1:5000/api/addy/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ image: testimg }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {/* {/* <div>{imgSrc && <img src={imgSrc} />}</div> */}
    </div>
  );
}

export default App;
