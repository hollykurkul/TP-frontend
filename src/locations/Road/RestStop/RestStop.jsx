import "./RestStop.css";

export default function RestStop({ onGo = () => {} }) {
  const handleRest = () => {
    alert("You curled up and restored your HP!");
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
      </div>

      <section className="reststop-text">
        <p className="eyebrow">The Pawdyssey — Act Two</p>
        <h1>The Rest Stop</h1>
        <p>
          A pool of lamplight in the dark, with a picnic table and a humming
          vending machine. Nobody around. A safe place to catch your breath.
        </p>
      </section>

      <section className="reststop-choices">
        <button type="button" className="reststop-button" onClick={handleRest}>
          Curl up and rest (restore HP)
        </button>

        <button
          type="button"
          className="reststop-button"
          onClick={() => onGo("busStop")}
        >
          Return to the bus stop
        </button>
      </section>
    </main>
  );
}
