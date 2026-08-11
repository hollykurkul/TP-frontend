import { useState } from "react";
import "./RestStop.css";

export default function RestStop({
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
      setRestMessage("You curled up and restored your HP.");
      setSleeping(false);
    }, 2200);
  };

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
        {sleeping && (
          <div className="reststop-sleep-overlay">
            <span className="reststop-zzz reststop-zzz-one">z</span>
            <span className="reststop-zzz reststop-zzz-two">z</span>
            <span className="reststop-zzz reststop-zzz-three">Z</span>
          </div>
        )}
      </div>

      <section className="reststop-text">
        <p className="eyebrow">The Pawdyssey — Act Two</p>
        <h1>The Rest Stop</h1>
        <p>
          A pool of lamplight in the dark, with a picnic table and a humming
          vending machine. Nobody around. A safe place to catch your breath.
        </p>
        <p role="status">
          Health: {currentHp}/{maxHp}. {restMessage}
        </p>
      </section>

      <section className="reststop-choices">
        <button
          type="button"
          className="reststop-button"
          onClick={handleRest}
          disabled={sleeping}
        >
          {sleeping ? "Sleeping..." : "Curl up and rest (restore HP)"}
        </button>

        <button
          type="button"
          className="reststop-button"
          onClick={() => onGo("busStop")}
          disabled={sleeping}
        >
          Return to the bus stop
        </button>
      </section>
    </main>
  );
}
