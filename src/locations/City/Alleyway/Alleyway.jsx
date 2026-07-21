import "./Alleyway.css";

export default function Alleyway({
  onGo = () => {},
  onCombat = () => {},
  onBossCombat = () => {},
}) {
  return (
    <main className="alleyway-page">
      <div className="alleyway-scene" aria-hidden="true">
        <div className="brick-wall wall-left" />
        <div className="brick-wall wall-right" />
        <div className="fire-escape" />
        <div className="neon-sign">ALLEYWAY</div>
        <div className="streetlight">
          <div className="light-cone" />
        </div>
        <div className="dumpster">
          <div className="dumpster-lid" />
        </div>
        <div className="puddle" />
        <div className="fog" />
      </div>

      <section className="alleyway-text">
        <p className="eyebrow">The Pawdyssey — Act Three</p>
        <h1>The Alleyway</h1>
        <p>
          Shadows stretch long beneath the lights from the street. Steam rises
          from the pavement, and the quiet here feels heavy and expectant.
        </p>
      </section>

      <section className="alleyway-choices">
        <button
          type="button"
          className="alleyway-button"
          onClick={() => onGo("cityPark")}
        >
          Retreat to the park
        </button>
        <button
          type="button"
          className="alleyway-button"
          onClick={onCombat}
        >
          Fight City Enemy
        </button>
        <button
          type="button"
          className="alleyway-button"
          onClick={onBossCombat}
        >
          Challenge City Boss
        </button>
      </section>
    </main>
  );
}
