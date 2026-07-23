import { useState } from "react";
import "./LivingRoom.css";

export default function LivingRoom({
  characterName = "Buddy",
  phase = "intro",
  onNext,
}) {
  const [introStep, setIntroStep] = useState("start");
  const [disturbanceStep, setDisturbanceStep] = useState("choice");
  const [chosenAction, setChosenAction] = useState(null);
  return (
    <main className="prologue-room living-room">
      <header className="chapter-header">
        <h2>Chapter I - The Living Room</h2>
      </header>
      {phase === "intro" && (
        <>
          {introStep === "start" && (
            <div className="story-textbox">
              <p>
                The afternoon sun streams through the living room window. It’s a
                quiet and peaceful day.
              </p>
              <p>Suddenly, the jingle of keys rattles from the front porch.</p>
              <p>The front door swings open, and there they are—your human!</p>
              <blockquote className="dialogue owner">
                “Hey there, {characterName}! Did you miss me? I missed you so
                much today!”
              </blockquote>
              <button
                className="action-btn"
                onClick={() => setIntroStep("choice")}
              >
                React to your human
              </button>
            </div>
          )}

          {introStep === "choice" && (
            <div className="story-textbox">
              <p>How do you react?</p>
              <div className="choice-group">
                <button
                  className="choice-btn"
                  onClick={() => setIntroStep("playtime")}
                >
                  Sprint to the door to demand a play session
                </button>
                <button
                  className="choice-btn"
                  onClick={() => setIntroStep("cuddles")}
                >
                  Trot over gently and press your head against their leg for a
                  cozy cuddle
                </button>
              </div>
            </div>
          )}

          {introStep === "playtime" && (
            <div className="story-textbox">
              <p>
                You bound across the rug, full of energy. Your human laughs,
                scratching that perfect spot behind your ears.
              </p>
              <blockquote className="dialogue owner">
                “Oh, you are just a ball of energy today, aren’t you? Someone’s
                ready to conquer the world!”
              </blockquote>
              <button className="action-btn" onClick={() => onNext("kitchen")}>
                Follow your human to the kitchen...
              </button>
            </div>
          )}

          {introStep === "cuddles" && (
            <div className="story-textbox">
              <p>
                You lean your weight against their ankles. Your human wraps you
                in a warm, familiar hug.
              </p>
              <blockquote className="dialogue owner">
                “Yeah, I know buddy. It was a long day for me too. The best part
                of waking up is coming home to you.”
              </blockquote>
              <button className="action-btn" onClick={() => onNext("kitchen")}>
                Follow your human to the kitchen...
              </button>
            </div>
          )}
        </>
      )}

      {phase === "disturbance" && (
        <>
          {disturbanceStep === "choice" && (
            <div className="story-textbox">
              <p>
                Back in the living room, you glance at the unlatched front door.
                What do you do while your human is away?
              </p>
              <div className="choice-group">
                <button
                  className="choice-btn"
                  onClick={() => {
                    setChosenAction("guard");
                    setDisturbanceStep("storm");
                  }}
                >
                  Guard the house. Pace around the living room and stay active.
                </button>
                <button
                  className="choice-btn"
                  onClick={() => {
                    setChosenAction("nap");
                    setDisturbanceStep("storm");
                  }}
                >
                  Curl up on your favorite spot on the couch for a quick nap.
                </button>
              </div>
            </div>
          )}

          {disturbanceStep === "storm" && (
            <div className="story-textbox">
              {chosenAction === "guard" ? (
                <>
                  <p>
                    You trot around the perimeter of the room, keeping a
                    watchful eye on your domain.
                  </p>
                  <p>
                    Suddenly—<strong>CRASH!</strong> A terrifyingly loud
                    thunderclap rattles the windowpanes, immediately followed by
                    the scream of a car alarm down the street. The house shakes.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    You close your eyes, letting the heavy silence of the house
                    lull you to sleep. But your rest is violently shattered.
                  </p>
                  <p>
                    <strong>BOOM!</strong> A massive crack of thunder roars
                    directly overhead. The sudden shock jolts you awake, your
                    heart hammering against your ribs.
                  </p>
                </>
              )}

              <button
                className="action-btn"
                onClick={() => onNext("frontOfHouse")}
              >
                Panic and head for the open door!
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
