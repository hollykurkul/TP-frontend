import { useState } from "react";
import "./EmptyDumpster.css";

export default function EmptyDumpster({
  onGo = () => {},
  onRest = () => {},
  currentHp = 3,
  maxHp = 3,
}) {
  const [restMessage, setRestMessage] = useState("");
  const [sleeping, setSleeping] = useState(false);

  const handleRest = () => {
    if (sleeping) return;

    setSleeping(true);
    setRestMessage("");
    setTimeout(() => {
      onRest();
      setRestMessage("You curl up in the shelter and restore your HP.");
      setSleeping(false);
    }, 2200);
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
        {sleeping && (
          <div className="emptydumpster-sleep-overlay">
            <span className="emptydumpster-zzz emptydumpster-zzz-one">z</span>
            <span className="emptydumpster-zzz emptydumpster-zzz-two">z</span>
            <span className="emptydumpster-zzz emptydumpster-zzz-three">Z</span>
          </div>
        )}
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
        <p role="status" aria-live="polite">
          Health: {currentHp}/{maxHp}. {restMessage}
        </p>
      </section>

      <section className="emptydumpster-choices">
        <button
          type="button"
          className="emptydumpster-button"
          onClick={handleRest}
          disabled={sleeping}
        >
          {sleeping
            ? "Sleeping..."
            : restMessage
              ? "HP restored"
              : "Curl up and rest (restore HP)"}
        </button>

        <button
          type="button"
          className="emptydumpster-button"
          onClick={() => onGo("cityPark")}
          disabled={sleeping}
        >
          Climb back out and return to the park
        </button>
      </section>
    </main>
  );
}
