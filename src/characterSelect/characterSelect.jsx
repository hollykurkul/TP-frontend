import { useEffect, useState } from "react";

import { getCharacters } from "../api/characters.js";
import "./characterSelect.css";

export default function CharacterSelect({ onSelectCharacter }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCharacters() {
      try {
        const loadedCharacters = await getCharacters();
        if (active) setCharacters(loadedCharacters);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load characters.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCharacters();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="character-page">
      <section className="title-section">
        <p className="eyebrow">New journey</p>
        <h1>Choose Your Companion</h1>
        <p className="subtitle">
          Each traveler begins with a different strength, story, and way through
          the wild.
        </p>
      </section>

      {loading && (
        <p className="character-status" role="status">
          Loading companions...
        </p>
      )}
      {error && (
        <p className="character-status character-error" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && <section className="character-grid">
        {characters.map((char) => (
          <article key={char.id} className="character-card">
            <div className="character-image">
              {char.image ? (
                <img src={char.image} alt={`${char.name} character portrait`} />
              ) : (
                <span>Image</span>
              )}
            </div>
            <h2>{char.name}</h2>
            <p>{char.description}</p>
            <button type="button" onClick={() => onSelectCharacter(char)}>
              Choose {char.name}
            </button>
          </article>
        ))}
      </section>}
    </main>
  );
}
