import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./ui-components/Card/card";
import Timeline from "./timeline/timeline";

function App() {
  return (
    <div className="App min-h-screen w-full  ">
      <Router>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/storyline" element={<Timeline />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
