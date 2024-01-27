import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./ui-components/Card/card";
import Timeline from "./timeline/timeline";

function App() {
  return (
    <div className="App">
      <Card />
      {/* move timeline to wherever required */}
      <Timeline /> 
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
