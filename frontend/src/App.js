import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
function App() {
  //example to fetch
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  // Start listening
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  // Stop listening and send data to backend
  const stopListeningAndSendData = () => {
    SpeechRecognition.stopListening();
    sendDataToBackend(transcript);
    resetTranscript();
  };

  // Check transcript for keywords
  useEffect(() => {
    if (transcript.includes("tim begin")) {
      // Perform actions when your start keyword is detected

      resetTranscript();
      capture();
    }

    if (transcript.includes("tim stop") && listening) {
      // Perform actions when your stop keyword is detected
      SpeechRecognition.stopListening();
      sendDataToBackend(transcript);
    }
  }, [transcript, listening]); // Dependencies ensure this effect runs when transcript or listening state changes

  // Function to send data to backend
  const sendDataToBackend = async (data) => {
    try {
      await fetch("http://127.0.0.1:5000/api/user_test/voice_recording", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setText(data);
  //     });
  // }, []);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    console.log("taking image");
    const imageSrc = webcamRef.current.getScreenshot();
    uploadImage(imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const uploadImage = async (testimg) => {
    console.log(testimg);
    try {
      await fetch("http://127.0.0.1:5000/api/user_test/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: testimg }),
      });
    } catch (error) {
      console.error("Error sending image to backend:", error);
    }
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
      <button onClick={startListening}>Start</button>
      <button onClick={stopListeningAndSendData}>Stop</button>
      <p>{transcript}</p>
      {/* {/* <div>{imgSrc && <img src={imgSrc} />}</div> */}
    </div>
  );
}

export default App;
