import { useState } from "react";
import "./Den.css";

export default function Den({
  onNavigate = (id) => console.log("navigate →", id),
  onRest = () => {},
}) {
  const [sleeping, setSleeping] = useState(false);

  const sleep = () => {
    if (sleeping) return;
    setSleeping(true);
    setTimeout(() => {
      onRest();
      setSleeping(false);
    }, 2200);
  };

  return (
    <div className="den">
      <div className="den-scene">
        <div className="den-earth" />
        <div className="den-hollow" />
        <div className="den-entrance">
          <div className="den-entrance-sky" />
          <div className="den-entrance-moon" />
        </div>
        <div className="den-root den-root-one" />
        <div className="den-root den-root-two" />
        <div className="den-root den-root-three" />
        <div className="den-rock den-rock-one" />
        <div className="den-rock den-rock-two" />
        <div className="den-moss den-moss-one" />
        <div className="den-moss den-moss-two" />
        <div className="den-mushroom den-mushroom-one" />
        <div className="den-mushroom den-mushroom-two" />
        <div className="den-leaf-bed">
          <div className="den-leaf den-leaf-one" />
          <div className="den-leaf den-leaf-two" />
          <div className="den-leaf den-leaf-three" />
        </div>
        <div className="den-acorn-stash">
          <div className="den-acorn" />
          <div className="den-acorn den-acorn-two" />
          <div className="den-acorn den-acorn-three" />
        </div>
        <div className="den-glow" />
        <div className="den-mote" style={{ top: "40%", left: "36%" }} />
        <div
          className="den-mote"
          style={{ top: "52%", left: "58%", animationDelay: "1.4s" }}
        />
        <div
          className="den-mote"
          style={{ top: "34%", left: "64%", animationDelay: "2.6s" }}
        />
        {sleeping && (
          <div className="den-sleep-overlay">
            <span className="den-zzz den-zzz-one">z</span>
            <span className="den-zzz den-zzz-two">z</span>
            <span className="den-zzz den-zzz-three">Z</span>
          </div>
        )}
      </div>

      <div className="den-ui">
        <h1 className="den-title">Den</h1>
        <p className="den-desc">A safe haven where you can rest and recover</p>
        <div className="den-actions">
          <button className="den-btn" onClick={sleep} disabled={sleeping}>
            {sleeping ? "Sleeping..." : "Sleep (restore HP)"}
          </button>
          <button
            className="den-btn den-btn-secondary"
            onClick={() => onNavigate("pond")}
          >
            Return to Pond
          </button>
        </div>
      </div>
    </div>
  );
}
