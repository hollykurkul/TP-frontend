import "./Alleyway.css";

export default function Alleyway() {
  return (
    <div className="alleyway">
      <div className="alley-scene">
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
    </div>
  );
}
