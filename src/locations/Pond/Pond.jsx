// src/game/Pond.jsx
import "./Pond.css";

export default function Pond({ onGo = () => {} }) {
  return (
    <main className="pond-page">
      <div className="pond-scene" aria-hidden="true">
        <span className="ripple" />
        <span className="ripple" />
        <span className="ripple" />
        <span className="lilypad one" />
        <span className="lilypad two" />
        <span className="dragonfly">
          <svg width="24" height="14" viewBox="0 0 24 14">
            <ellipse cx="7" cy="4" rx="6" ry="3" fill="#a8c8e0" opacity="0.8" />
            <ellipse
              cx="17"
              cy="4"
              rx="6"
              ry="3"
              fill="#a8c8e0"
              opacity="0.8"
            />
            <rect x="11" y="3" width="2" height="10" rx="1" fill="#2c3a2f" />
          </svg>
        </span>
        <span className="reeds-cluster">
          <span className="reed" />
          <span className="reed" />
          <span className="reed" />
          <span className="reed" />
        </span>
      </div>

      <section className="pond-text">
        <p className="eyebrow">The Pawdessey</p>
        <h1>The Pond</h1>
        <p>
          Still water reflects a sky that seems slightly wrong, like a painting
          of a memory. Dragonflies stitch the air. Something ripples near the
          reeds.
        </p>
      </section>

      <section className="pond-choices">
        <button
          type="button"
          className="pond-button"
          onClick={() => onGo("reeds")}
        >
          Peer into the reeds
        </button>
        <button
          type="button"
          className="pond-button"
          onClick={() => onGo("busStop")}
        >
          Head back to the bus stop
        </button>
      </section>
    </main>
  );
}
