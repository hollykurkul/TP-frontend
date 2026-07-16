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
        <p className="eyebrow">The Pawdyssey</p>
        <h1>The Bus Stop</h1>
        <p>
          A weathered bus stop sits at the edge of the asphalt, its sign covered
          in pawprints. The road stretches on ahead.
        </p>
      </section>

      <section className="busstop-choices">
        <button
          type="button"
          className="busstop-button"
          onClick={() => onGo("ditch")}
        >
          Climb down into the ditch
        </button>

        <button
          type="button"
          className="busstop-button"
          onClick={() => onGo("restStop")}
        >
          Head over to the highway rest stop
        </button>
      </section>
    </main>
  );
}
