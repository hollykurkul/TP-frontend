import "./Clearing.css";

// added onGo to receive scene swapping function
export default function Clearing({
  onGo = () => {},
  onCombat = () => {},
  onBossCombat = () => {},
  combatLoading = false,
  combatError = "",
}) {
  return (
    <div className="clearing">
      <div className="clearing-scene">
        <div className="cl-sun" />
        <div className="cl-cloud cl-cloud-one" />
        <div className="cl-cloud cl-cloud-two" />
        <div className="cl-cloud cl-cloud-three" />
        <div className="cl-treeline cl-treeline-back" />
        <div className="cl-treeline cl-treeline-front" />
        <div className="cl-tree cl-tree-left">
          <div className="cl-trunk" />
          <div className="cl-canopy" />
        </div>
        <div className="cl-tree cl-tree-right">
          <div className="cl-trunk" />
          <div className="cl-canopy" />
        </div>
        <div className="cl-grass" />
        <div className="cl-stump" />
        <div className="cl-rock cl-rock-big" />
        <div className="cl-rock cl-rock-small" />
        <div className="cl-flower" style={{ left: "16%", bottom: "22%" }} />
        <div
          className="cl-flower cl-flower-pink"
          style={{ left: "52%", bottom: "13%" }}
        />
        <div className="cl-flower" style={{ left: "80%", bottom: "24%" }} />
        <div
          className="cl-flower cl-flower-pink"
          style={{ left: "36%", bottom: "9%" }}
        />
        <div className="cl-deer">
          <div className="cl-deer-body" />
          <div className="cl-deer-head" />
          <div className="cl-deer-leg cl-deer-leg-one" />
          <div className="cl-deer-leg cl-deer-leg-two" />
        </div>
        <div className="cl-fox">
          <div className="cl-fox-body" />
          <div className="cl-fox-head" />
          <div className="cl-fox-tail" />
        </div>
        <div className="cl-rabbit">
          <div className="cl-rabbit-ear" />
          <div className="cl-rabbit-ear cl-rabbit-ear-two" />
        </div>
        <div className="cl-squirrel">
          <div className="cl-squirrel-tail" />
        </div>
        <div className="cl-frog" />
        <div className="cl-bird cl-bird-ground" />
        <div className="cl-bird-flying cl-bird-fly-one" />
        <div className="cl-bird-flying cl-bird-fly-two" />
        <div className="cl-butterfly" style={{ top: "48%", left: "40%" }} />
        <div
          className="cl-butterfly cl-butterfly-blue"
          style={{ top: "56%", left: "68%" }}
        />
      </div>
      {/* added ui text and interactive buttons so game functions */}
      <div className="clearing-ui" style={{ position: "relative", zIndex: 10 }}>
        <h1
          className="clearing-title"
          style={{ fontSize: "2rem", margin: "10px 0" }}
        >
          The Clearing
        </h1>
        <p className="clearing-desc" style={{ marginBottom: "20px" }}>
          Wildflowers dance in a wide, sunny clearing. You see gentle forest
          critters playing in the tall grass, but the open sky leaves you
          feeling exposed.
        </p>

        {(combatLoading || combatError) && (
          <p role="status" aria-live="polite">
            {combatLoading ? "Choosing an opponent..." : combatError}
          </p>
        )}
        <div className="clearing-actions">
          <button
            type="button"
            className="clearing-btn"
            onClick={() => onGo("pond")}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Return to Pond
          </button>
          <button
            type="button"
            className="clearing-btn"
            onClick={onCombat}
            disabled={combatLoading}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Fight Forest Enemy
          </button>
          <button
            type="button"
            className="clearing-btn"
            onClick={onBossCombat}
            disabled={combatLoading}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Challenge Forest Boss
          </button>
        </div>
      </div>
    </div>
  );
}
