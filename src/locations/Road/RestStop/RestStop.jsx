// src/game/RestStop.jsx
import "./RestStop.css";

export default function RestStop({ onGo = () => {} }) {
  return (
    <main className="reststop-page">
      <div className="reststop-scene" aria-hidden="true">
        <div className="night-lamp">
          <div className="lamp-head" />
          <div className="lamp-pole" />
          <span className="moth one" />
          <span className="moth two" />
        </div>
        <div className="picnic-table">
          <span className="table-top" />
          <span className="table-seat left" />
          <span className="table-seat right" />
        </div>
        <div className="vending">
          <span className="vend-glow" />
        </div>
        <div className="trash-can" />
      </div>

      <section className="reststop-text">
        <p className="eyebrow">The Pawdessey — Act Two</p>
        <h1>The Rest Stop</h1>
        <p>
          A pool of lamplight in the dark, with a picnic table and a humming
          vending machine. Nobody around. A safe place to catch your breath.
        </p>
      </section>

      <section className="reststop-choices">
        <button
          type="button"
          className="reststop-button"
          onClick={() => onGo("rest")}
        >
          1. Curl up and rest (restore HP)
        </button>
        <button
          type="button"
          className="reststop-button"
          onClick={() => onGo("road")}
        >
          2. Return to the road
        </button>
      </section>
    </main>
  );
}
