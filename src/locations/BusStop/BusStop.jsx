// src/game/BusStop.jsx
import "./BusStop.css";

export default function BusStop({ onGo = () => {} }) {
  return (
    <main className="busstop-page">
      <div className="busstop-scene" aria-hidden="true">
        <span className="cloud one" />
        <span className="cloud two" />

        <div className="shelter-roof" />
        <div className="shelter-post left" />
        <div className="shelter-post right" />
        <div className="shelter-bench" />

        <div className="stop-sign">
          <div className="sign-face">🐾🐾</div>
          <div className="sign-pole" />
        </div>
      </div>

      <section className="busstop-text">
        <p className="eyebrow">The Pawdessey</p>
        <h1>The Bus Stop</h1>
        <p>
          A weathered bus stop sits at the edge of the wilderness, its sign
          covered in pawprints instead of route numbers. Trails lead off in
          every direction. This feels like a place you&apos;ll return to often.
        </p>
      </section>

      <section className="busstop-choices">
        <button
          type="button"
          className="busstop-button"
          onClick={() => onGo("pond")}
        >
          Follow the muddy trail to the pond
        </button>
        <button
          type="button"
          className="busstop-button"
          onClick={() => onGo("forest")}
        >
          Take the shaded path into the forest
        </button>
        <button
          type="button"
          className="busstop-button"
          onClick={() => onGo("hill")}
        >
          Climb the grassy hill
        </button>
      </section>
    </main>
  );
}
