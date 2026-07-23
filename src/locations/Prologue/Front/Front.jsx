import "./Front.css";

export default function House({
  characterName = "Buddy",
  onComplete = () => {},
}) {
  return (
    <main className="house">
      <div className="house-scene">
        <div className="star" style={{ top: 36, left: 60 }} />
        <div
          className="star"
          style={{ top: 80, left: 180, animationDelay: "0.8s" }}
        />
        <div
          className="star"
          style={{ top: 50, left: 320, animationDelay: "1.4s" }}
        />
        <div
          className="star"
          style={{ top: 110, left: 470, animationDelay: "0.4s" }}
        />
        <div
          className="star"
          style={{ top: 30, left: 560, animationDelay: "2s" }}
        />
        <div
          className="star"
          style={{ top: 140, left: 100, animationDelay: "1.1s" }}
        />
        <div className="moon" />
        <div className="ground" />
        <div className="roof" />
        <div className="chimney" />
        <div className="house-body" />
        <div className="win win-left">
          <div className="win-bar-v" />
          <div className="win-bar-h" />
        </div>
        <div className="win win-right">
          <div className="win-bar-v" />
          <div className="win-bar-h" />
        </div>
        <div className="porch-light" />
        <div className="porch-glow" />
        <div className="door">
          <div className="doorknob" />
          <div className="pet-flap" />
        </div>
        <div className="path" />
        <div className="fence-post" style={{ left: 24 }} />
        <div className="fence-post" style={{ left: 74 }} />
        <div className="fence-post" style={{ left: 124 }} />
        <div className="fence-rail" style={{ left: 18, width: 130 }} />
        <div className="fence-post" style={{ right: 24 }} />
        <div className="fence-post" style={{ right: 74 }} />
        <div className="fence-post" style={{ right: 124 }} />
        <div className="fence-rail" style={{ right: 18, width: 130 }} />
        <div className="bush" style={{ left: 160 }} />
        <div className="bush bush-small" style={{ right: 160 }} />
      </div>

      <section className="front-storybox">
        <p className="front-eyebrow">The journey begins</p>
        <h1>Beyond the Front Yard</h1>
        <p>
          Startled by the storm, {characterName} races down the path and through
          the open gate. The familiar porch light grows smaller behind you as a
          trail of pawprints leads toward the dark line of trees.
        </p>
        <button type="button" className="front-continue" onClick={onComplete}>
          Follow the trail into the forest
        </button>
      </section>
    </main>
  );
}
