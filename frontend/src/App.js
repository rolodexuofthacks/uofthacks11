import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./ui-components/home";
import Card from "./ui-components/Card/card";
import Timeline from "./timeline/timeline";
import Record from "./ui-components/Record/record";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
function App() {
  //example to fetch

  return (
    <div className="App min-h-screen w-full  ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rolodex" element={<Card />} />
          <Route path="/record" element={<Record />} />
          <Route path="/storyline" element={<Timeline />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
