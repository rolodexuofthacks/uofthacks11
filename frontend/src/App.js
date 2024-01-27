import logo from "./logo.svg";
import "./App.css";

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
