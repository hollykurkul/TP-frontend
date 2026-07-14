// src/game/Ditch.jsx
import "./Ditch.css";

export default function Ditch({ onGo = () => {} }) {
  return (
    <main className="ditch-page">
      <div className="ditch-scene" aria-hidden="true">
        <div className="road-edge" />
        <div className="ditch-hollow" />
        <div className="culvert">
          <span className="glint left" />
          <span className="glint right" />
        </div>
        <div className="weed one" />
        <div className="weed two" />
        <div className="weed three" />
        <div className="bottle" />
      </div>

      <section className="ditch-text">
        <p className="eyebrow">The Pawdessey — Act Two</p>
        <h1>The Ditch</h1>
        <p>
          A muddy trench runs beside the road, littered with lost things. From
          the mouth of a culvert pipe, two eyes catch the light — and they are
          not friendly.
        </p>
      </section>

      <section className="ditch-choices">
        <button
          type="button"
          className="ditch-button danger"
          onClick={() => onGo("combat")}
        >
          1. Enter combat
        </button>
        <button
          type="button"
          className="ditch-button"
          onClick={() => onGo("road")}
        >
          2. Scramble back to the road
        </button>
      </section>
    </main>
  );
}
