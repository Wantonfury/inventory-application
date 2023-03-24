import Footer from './components/Footer';
import Items from './components/Items';
import './styles/App.css';
import ServerContext from "./contexts/serverContext";

function App() {
  return (
    <div className="App">
      <ServerContext.Provider value={process.env.REACT_APP_SERVER || "http://localhost:3000"}>
        <Items />
        <Footer />
      </ServerContext.Provider>
    </div>
  );
}

export default App;
