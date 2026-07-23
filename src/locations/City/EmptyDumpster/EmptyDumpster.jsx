import { useState } from "react";
import "./EmptyDumpster.css";

export default function EmptyDumpster({
  onGo = () => {},
  onRest = () => {},
  playerHearts = 3,
}) {
  const [restMessage, setRestMessage] = useState("");

  const handleRest = () => {
    onRest();
    setRestMessage("You curl up in the shelter and restore your HP.");
  };

  return (
    <main className="emptydumpster-page">
      <div className="emptydumpster-scene" aria-hidden="true">
        <div className="back-wall" />
        <div className="drainpipe" />
        <div className="streetlight">
          <div className="light-cone" />
        </div>
        <div className="big-dumpster">
          <div className="lid-open" />
          <div className="dumpster-interior" />
          <div className="dumpster-front">
            <div className="front-ridge" />
            <div className="front-ridge" />
            <div className="front-ridge" />
          </div>
          <div className="wheel wheel-left" />
          <div className="wheel wheel-right" />
        </div>
        <div className="crumpled-paper" />
        <div className="bottle" />
        <div className="fly fly-one" />
        <div className="fly fly-two" />
        <div className="puddle" />
        <div className="fog" />
      </div>

      <section className="emptydumpster-text">
        <p className="eyebrow">The Pawdyssey — Act Three</p>
        <h1>The Empty Dumpster</h1>
        <p>
          An oversized green bin sits propped open beneath a flickering
          streetlamp. While it smells faintly of old cardboard, it looks
          surprisingly dry and sheltered, making it a quiet corner to tuck away
          from the busy streets.
        </p>
        <p role="status">
          Health: {playerHearts}/3. {restMessage}
        </p>
      </section>

      <section className="emptydumpster-choices">
        <button type="button" className="emptydumpster-button" onClick={handleRest}>
          Curl up and rest (restore HP)
        </button>

        <button
          type="button"
          className="emptydumpster-button"
          onClick={() => onGo("cityPark")}
        >
          Climb back out and return to the park
        </button>
      </section>
    </main>
  );
}
