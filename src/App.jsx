import { Link, Route, Routes, useLocation, useNavigate } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useState } from "react";
import CharacterSelect from "./characterSelect/characterSelect.jsx";
import Combat from "./combat/Combat.jsx";
import Inventory from "./inventory/Inventory.jsx";
import { getBossByLocation, getRandomEnemyByLocation } from "./api/enemies.js";
import Pond from "./locations/Forest/Pond/Pond.jsx";
import Den from "./locations/Forest/Den/Den.jsx";
import Clearing from "./locations/Forest/Clearing/Clearing.jsx";
import PrologueController from "./locations/Prologue/PrologueController.jsx";
import BusStop from "./locations/Road/BusStop/BusStop.jsx";
import Ditch from "./locations/Road/Ditch/Ditch.jsx";
import RestStop from "./locations/Road/RestStop/RestStop.jsx";

import CityPark from "./locations/City/CityPark/CityPark.jsx";
import EmptyDumpster from "./locations/City/EmptyDumpster/EmptyDumpster.jsx";
import AlleyWay from "./locations/City/Alleyway/Alleyway.jsx";

import { useAuth } from "./auth/AuthContext";

function MainMenu({ user, onStartNewGame }) {
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
        {!user ? (
          <section className="menu-panel auth-panel">
            <h2>Account</h2>
            <p>
              Log in to continue your journey or register to begin a new one.
            </p>

            <Link className="menu-button" to="/login">
              Log In
            </Link>

            <Link className="menu-button secondary-button" to="/register">
              Register
            </Link>
          </section>
        ) : (
          <>
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
          </>
        )}
      </section>
    </main>
  );
}

function ForestController({
  character,
  onStartCombat,
  onRest,
  currentHp,
  maxHp,
  combatLoading,
  combatError,
}) {
  const location = useLocation();
  const [currentScene, setCurrentScene] = useState(
    () => location.state?.scene ?? "pond",
  );

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="forest-zone">
      {currentScene === "pond" && (
        <Pond character={character} onGo={handleNavigation} />
      )}
      {currentScene === "den" && (
        <Den
          character={character}
          onGo={handleNavigation}
          onRest={onRest}
          currentHp={currentHp}
          maxHp={maxHp}
        />
      )}
      {currentScene === "clearing" && (
        <Clearing
          character={character}
          onGo={handleNavigation}
          combatLoading={combatLoading}
          combatError={combatError}
          onCombat={() =>
            onStartCombat({
              locationId: 1,
              defeatScene: "den",
              returnTo: "/forest",
              returnScene: "clearing",
            })
          }
          onBossCombat={() =>
            onStartCombat({
              locationId: 1,
              isBoss: true,
              defeatScene: "den",
              returnTo: "/forest",
              returnScene: "clearing",
              victoryTo: "/road",
              victoryScene: "busStop",
            })
          }
        />
      )}
    </div>
  );
}

function RoadController({
  character,
  onStartCombat,
  onRest,
  currentHp,
  maxHp,
  combatLoading,
  combatError,
}) {
  const location = useLocation();
  const [currentScene, setCurrentScene] = useState(
    () => location.state?.scene ?? "busStop",
  );

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="road-zone">
      {currentScene === "busStop" && (
        <BusStop character={character} onGo={handleNavigation} />
      )}
      {currentScene === "ditch" && (
        <Ditch
          character={character}
          onGo={handleNavigation}
          combatLoading={combatLoading}
          combatError={combatError}
          onCombat={() =>
            onStartCombat({
              locationId: 2,
              defeatScene: "restStop",
              returnTo: "/road",
              returnScene: "ditch",
            })
          }
          onBossCombat={() =>
            onStartCombat({
              locationId: 2,
              isBoss: true,
              defeatScene: "restStop",
              returnTo: "/road",
              returnScene: "ditch",
              victoryTo: "/city",
              victoryScene: "cityPark",
            })
          }
        />
      )}
      {currentScene === "restStop" && (
        <RestStop
          character={character}
          onGo={handleNavigation}
          onRest={onRest}
          currentHp={currentHp}
          maxHp={maxHp}
        />
      )}
    </div>
  );
}

function CityController({
  character,
  onStartCombat,
  onRest,
  currentHp,
  maxHp,
  combatLoading,
  combatError,
}) {
  const location = useLocation();
  const [currentScene, setCurrentScene] = useState(
    () => location.state?.scene ?? "cityPark",
  );

  const handleNavigation = (destination) => {
    setCurrentScene(destination);
  };

  return (
    <div className="city-zone">
      {currentScene === "cityPark" && (
        <CityPark character={character} onGo={handleNavigation} />
      )}
      {currentScene === "emptyDumpster" && (
        <EmptyDumpster
          character={character}
          onGo={handleNavigation}
          onRest={onRest}
          currentHp={currentHp}
          maxHp={maxHp}
        />
      )}
      {currentScene === "alleyWay" && (
        <AlleyWay
          character={character}
          onGo={handleNavigation}
          combatLoading={combatLoading}
          combatError={combatError}
          onCombat={() =>
            onStartCombat({
              locationId: 3,
              defeatScene: "emptyDumpster",
              returnTo: "/city",
              returnScene: "alleyWay",
            })
          }
          onBossCombat={() =>
            onStartCombat({
              locationId: 3,
              isBoss: true,
              defeatScene: "emptyDumpster",
              returnTo: "/city",
              returnScene: "alleyWay",
            })
          }
        />
      )}
    </div>
  );
}

const INITIAL_PLAYER_STATS = {
  level: 1,
  xp: 0,
  currentHp: 3,
  maxHp: 3,
};

export default function App() {
  const { user } = useAuth();
  const [character, setCharacter] = useState(null);
  const [playerStats, setPlayerStats] = useState(INITIAL_PLAYER_STATS);
  const [combatLoading, setCombatLoading] = useState(false);
  const [combatError, setCombatError] = useState("");
  const navigate = useNavigate();

  const handleStartNewGame = () => {
    navigate("/character-select");
  };

  const handleSelectCharacter = (selectedChar) => {
    setCharacter(selectedChar);
    setPlayerStats(INITIAL_PLAYER_STATS);
    navigate("/prologue");
  };

  const handleStartCombat = async ({
    locationId,
    isBoss = false,
    ...returnLocation
  }) => {
    setCombatLoading(true);
    setCombatError("");

    try {
      const enemy = isBoss
        ? await getBossByLocation(locationId)
        : await getRandomEnemyByLocation(locationId);

      navigate("/combat", {
        state: {
          ...returnLocation,
          isBoss,
          locationId,
          enemyName: enemy.name,
          playerName: character?.name,
          playerImageUrl:
            character?.image ?? character?.imageUrl ?? character?.image_url,
          enemyMaxHearts: enemy.hp,
          enemyImageUrl: enemy.imageUrl,
        },
      });
    } catch (error) {
      setCombatError(
        error instanceof Error ? error.message : "Unable to load an enemy.",
      );
    } finally {
      setCombatLoading(false);
    }
  };

  const handleHealthChange = (currentHp) => {
    setPlayerStats((stats) => ({
      ...stats,
      currentHp: Math.max(0, Math.min(currentHp, stats.maxHp)),
    }));
  };

  const handleRest = () => {
    setPlayerStats((stats) => ({
      ...stats,
      currentHp: stats.maxHp,
    }));
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<MainMenu user={user} onStartNewGame={handleStartNewGame} />}
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
          path="/prologue"
          element={
            <PrologueController
              characterName={character?.name}
              onComplete={() =>
                navigate("/forest", {
                  replace: true,
                  state: { scene: "pond" },
                })
              }
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <Inventory
              currentHp={playerStats.currentHp}
              maxHp={playerStats.maxHp}
              onHealthChange={handleHealthChange}
            />
          }
        />
        <Route
          path="/combat"
          element={
            <Combat
              character={character}
              currentHp={playerStats.currentHp}
              maxHp={playerStats.maxHp}
              onHealthChange={handleHealthChange}
            />
          }
        />
        <Route
          path="/forest"
          element={
            <ForestController
              character={character}
              onStartCombat={handleStartCombat}
              onRest={handleRest}
              currentHp={playerStats.currentHp}
              maxHp={playerStats.maxHp}
              combatLoading={combatLoading}
              combatError={combatError}
            />
          }
        />
        <Route
          path="/road"
          element={
            <RoadController
              character={character}
              onStartCombat={handleStartCombat}
              onRest={handleRest}
              currentHp={playerStats.currentHp}
              maxHp={playerStats.maxHp}
              combatLoading={combatLoading}
              combatError={combatError}
            />
          }
        />
        <Route
          path="/city"
          element={
            <CityController
              character={character}
              onStartCombat={handleStartCombat}
              onRest={handleRest}
              currentHp={playerStats.currentHp}
              maxHp={playerStats.maxHp}
              combatLoading={combatLoading}
              combatError={combatError}
            />
          }
        />
      </Route>
    </Routes>
  );
}
