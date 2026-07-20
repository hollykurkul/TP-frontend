import { Link, Route, Routes, useNavigate } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useState } from "react";
import CharacterSelect from "./characterSelect/characterSelect.jsx";
import Pond from "./locations/Forest/Pond/Pond.jsx";
import Den from "./locations/Forest/Den/Den.jsx";
import Clearing from "./locations/Forest/Clearing/Clearing.jsx";

import BusStop from "./locations/Road/BusStop/BusStop.jsx";
import Ditch from "./locations/Road/Ditch/Ditch.jsx";
import RestStop from "./locations/Road/RestStop/RestStop.jsx";

import CityPark from "./locations/City/CityPark/CityPark.jsx";
import EmptyDumpster from "./locations/City/EmptyDumpster/EmptyDumpster.jsx";
import AlleyWay from "./locations/City/Alleyway/Alleyway.jsx";

function MainMenu({ onStartNewGame }) {
  return (
    <main className="menu-page">
      <section className="title-section">
        <p className="eyebrow">A text adventure</p>
        <h1>The Pawdessey</h1>
        <p className="subtitle">
          Follow the pawprints into a strange, storybook wilderness.
        </p>
      </section>

      <section className="menu-grid">
        <section className="menu-panel auth-panel">
          <h2>Account</h2>
          <p>Log in to continue your journey or register to begin a new one.</p>

          <Link className="menu-button" to="/login">
            Log In
          </Link>

          <Link className="menu-button secondary-button" to="/register">
            Register
          </Link>
        </section>

        <section className="menu-panel action-panel">
          <h2>New Game</h2>
          <p>Begin a fresh adventure from the first trail marker.</p>

          <button
            type="button"
            className="menu-button"
            onClick={onStartNewGame}
          >
            Start New Game
          </button>
        </section>

        <section className="menu-panel action-panel">
          <h2>Load Game</h2>
          <p>Return to a saved adventure.</p>

          <div className="save-slot">
            <span>Save Slot 1</span>
            <small>No save loaded yet</small>
          </div>

          <div className="save-slot empty">
            <span>Save Slot 2</span>
            <small>Empty</small>
          </div>

          <button type="button" className="menu-button secondary-button">
            Load Selected Game
          </button>
        </section>
      </section>
    </main>
  );
}

function ForestController({ character }) {
  const [currentScene, setCurrentScene] = useState("pond");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="forest-zone">
      {currentScene === "pond" && (
        <Pond character={character} onGo={handleNavigation} />
      )}
      {currentScene === "den" && (
        <Den character={character} onGo={handleNavigation} />
      )}
      {currentScene === "clearing" && (
        <Clearing character={character} onGo={handleNavigation} />
      )}
    </div>
  );
}

function RoadController({ character }) {
  const [currentScene, setCurrentScene] = useState("busStop");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="road-zone">
      {currentScene === "busStop" && (
        <BusStop character={character} onGo={handleNavigation} />
      )}
      {currentScene === "ditch" && (
        <Ditch character={character} onGo={handleNavigation} />
      )}
      {currentScene === "restStop" && (
        <RestStop character={character} onGo={handleNavigation} />
      )}
    </div>
  );
}

function CityController({ character }) {
  const [currentScene, setCurrentScene] = useState("cityPark");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="city-zone">
      {currentScene === "cityPark" && (
        <CityPark character={character} onGo={handleNavigation} />
      )}
      {currentScene === "emptyDumpster" && (
        <EmptyDumpster character={character} onGo={handleNavigation} />
      )}
      {currentScene === "alleyWay" && (
        <AlleyWay character={character} onGo={handleNavigation} />
      )}
    </div>
  );
}

export default function App() {
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  const handleStartNewGame = () => {
    navigate("/character-select");
  };

  const handleSelectCharacter = (selectedChar) => {
    setCharacter(selectedChar);
    navigate("/forest");
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<MainMenu onStartNewGame={handleStartNewGame} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/character-select"
          element={
            <CharacterSelect onSelectCharacter={handleSelectCharacter} />
          }
        />
        <Route
          path="/forest"
          element={<ForestController character={character} />}
        />
        <Route
          path="/road"
          element={<RoadController character={character} />}
        />
        <Route
          path="/city"
          element={<CityController character={character} />}
        />
      </Route>
    </Routes>
  );
}
