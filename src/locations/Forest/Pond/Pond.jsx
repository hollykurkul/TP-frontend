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
        <p className="eyebrow">The Pawdyssey</p>
        <h1>The Pond</h1>
        <p>
          The water is still and cool. From here, you can seek shelter in a cozy
          den, or wander into a nearby sunlit clearing.
        </p>
      </section>

      {/* fixed buttons: now routing to game locations */}
      <section className="pond-choices">
        <button
          type="button"
          className="pond-button"
          onClick={() => onGo("den")} // sends the player to the den scene
        >
          Go to the Cozy Den
        </button>
        <button
          type="button"
          className="pond-button"
          onClick={() => onGo("clearing")} // sends the player to the clearing scene
        >
          Go to the Clearing
        </button>
      </section>
    </main>
  );
}
