import Footer from './components/Footer';
import Items from './components/Items';
import './styles/App.css';

const SERVER = process.env.SERVER || "http://localhost:3000";

function App() {
  return (
    <div className="App">
      <Items SERVER={SERVER} />
      <Footer />
    </div>
  );
}

export default App;
