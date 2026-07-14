import "./EmptyDumpster.css";

export default function EmptyDumpster() {
  return (
    <div className="empty-dumpster">
      <div className="dumpster-scene">
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
    </div>
  );
}
