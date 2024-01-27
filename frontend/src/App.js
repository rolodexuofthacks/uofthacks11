import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './ui-components/home';
import Card from "./ui-components/Card/card";
import Timeline from "./timeline/timeline";
import './App.css'

function App() {
  return (
    <div className="App min-h-screen w-full  ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rolodex" element={<Card />} />
          <Route path="/record" element={<Home />} />
          <Route path="/storyline" element={<Timeline />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
