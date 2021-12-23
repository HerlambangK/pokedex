import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import PokemonDetail from "./components/PokemonDetail";
import { PokemonProvider } from "./Helpers/PokemonContext";
import HomePage from "./Page/HomePage";
import PokedexPage from "./Page/PokedexPage";

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <div className="nav-title">PokeDex</div>
        <div className="nev">
          <nav className="nav">
            <Link to="/" className="nav-item">
              Home
            </Link>

            <Link to="/pokedex" className="nav-item">
              PokeDex
            </Link>

            <Link to="/profile" className="nav-item">
              Profile
            </Link>
          </nav>

          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/pokemon/:idn" element={<PokemonDetail />} />
            <Route exact path="/pokedex" element={<PokedexPage />} />
          </Routes>
        </div>
      </div>
    </PokemonProvider>
  );
}

export default App;
