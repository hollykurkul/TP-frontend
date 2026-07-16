import { Link, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import React, { useState } from "react";
import Pond from "./game/Pond";
import Den from "./game/Den";
import Clearing from "./game/Clearing";
import BusStop from "./game/BusStop";
import Ditch from "./game/Ditch";
import RestStop from "./game/RestStop";
import CityPark from "./game/CityPark";
import EmptyDumpster from "./game/EmptyDumpster";
import AlleyWay from "./game/AlleyWay";

function MainMenu() {
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

          <button type="button" className="menu-button">
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
function ForestController() {
  const [currentScene, setCurrentScene] = useState("pond");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="forest-zone">
      {currentScene === "pond" && <Pond onGo={handleNavigation} />}
      {currentScene === "den" && <Den onGo={handleNavigation} />}
      {currentScene === "clearing" && <Clearing onGo={handleNavigation} />}
    </div>
  );
}
function RoadController() {
  const [currentScene, setCurrentScene] = useState("busStop");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="road-zone">
      {currentScene === "busStop" && <BusStop onGo={handleNavigation} />}
      {currentScene === "ditch" && <Ditch onGo={handleNavigation} />}
      {currentScene === "restStop" && <RestStop onGo={handleNavigation} />}
    </div>
  );
}
function CityController() {
  const [currentScene, setCurrentScene] = useState("cityPark");

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="city-zone">
      {currentScene === "cityPark" && <CityPark onGo={handleNavigation} />}
      {currentScene === "emptyDumpster" && (
        <EmptyDumpster onGo={handleNavigation} />
      )}
      {currentScene === "alleyWay" && <AlleyWay onGo={handleNavigation} />}
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainMenu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forest" element={<ForestController />} />
        <Route path="/road" element={<RoadController />} />
        <Route path="/city" element={<CityController />} />
      </Route>
    </Routes>
  );
}
