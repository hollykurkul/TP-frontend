import "./CityPark.css";

export default function CityPark({ onGo = () => {} }) {
  return (
    <main className="citypark-page">
      <div className="citypark-scene" aria-hidden="true">
        <div className="skyline">
          <span className="building" />
          <span className="building" />
          <span className="building" />
          <span className="building" />
          <span className="building" />
          <span className="building" />
          <span className="building" />
        </div>

        <div className="tree left">
          <div className="canopy" />
          <div className="trunk" />
        </div>
        <div className="tree right">
          <div className="canopy" />
          <div className="trunk" />
        </div>

        <div className="fountain">
          <span className="jet a" />
          <span className="jet b" />
          <span className="jet c" />
          <div className="column" />
          <div className="basin" />
        </div>

        <div className="park-bench" />

        <div className="lamp">
          <div className="bulb" />
          <div className="pole" />
        </div>

        <span className="leaf one" />
        <span className="leaf two" />
        <span className="leaf three" />
      </div>

      <section className="citypark-text">
        <p className="eyebrow">The Pawdyssey — Act Three</p>
        <h1>The City Park</h1>
        <p>
          Beyond the wilderness, a tidy park sits at the feet of a hazy skyline.
          A fountain murmurs to itself, and a lamp glows though it is still
          daylight, as if it knows something you don&apos;t.
        </p>
      </section>

      <section className="citypark-choices">
        <button
          type="button"
          className="citypark-button"
          onClick={() => onGo("emptyDumpster")}
        >
          Check out the empty dumpster nearby
        </button>

        <button
          type="button"
          className="citypark-button"
          onClick={() => onGo("alleyWay")}
        >
          Head down the dark alleyway
        </button>
      </section>
    </main>
  );
}
