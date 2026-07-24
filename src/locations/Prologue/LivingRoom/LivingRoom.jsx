import { useState } from "react";
import "./LivingRoom.css";

export default function LivingRoom({
  characterName = "Buddy",
  phase = "intro",
  onNext,
  characterSprite = "/images/player-sprite.png",
  ownerSprite = "/images/owner-sprite.png",
}) {
  const [introStep, setIntroStep] = useState("start");
  const [disturbanceStep, setDisturbanceStep] = useState("choice");
  const [chosenAction, setChosenAction] = useState(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const introLines = [
    {
      text: "The afternoon sun streams through the living room window. It’s a quiet and peaceful day.",
      speaker: "narrator",
    },
    {
      text: "Suddenly, the jingle of keys rattles from the front porch.",
      speaker: "narrator",
    },
    {
      text: "The front door swings open, and there they are—your human!",
      speaker: "narrator",
    },
    {
      text: `“Hey there, ${characterName}! Did you miss me? I missed you so much today!”`,
      speaker: "owner",
    },
  ];

  const playtimeLines = [
    {
      text: "You bound across the rug, full of energy. Your human laughs, scratching that perfect spot behind your ears.",
      speaker: "narrator",
    },
    {
      text: "“Oh, you are just a ball of energy today, aren’t you? Someone’s ready to conquer the world!”",
      speaker: "owner",
    },
  ];

  const cuddlesLines = [
    {
      text: "You lean your weight against their ankles. Your human wraps you in a warm, familiar hug.",
      speaker: "narrator",
    },
    {
      text: "“Yeah, I know buddy. It was a long day for me too. The best part of waking up is coming home to you.”",
      speaker: "owner",
    },
  ];

  const stormGuardLines = [
    {
      text: "You trot around the perimeter of the room, keeping a watchful eye on your domain.",
      speaker: "narrator",
    },
    {
      text: "Suddenly—CRASH! A terrifyingly loud thunderclap rattles the windowpanes, immediately followed by the scream of a car alarm down the street. The house shakes.",
      speaker: "narrator",
    },
  ];

  const stormNapLines = [
    {
      text: "You close your eyes, letting the heavy silence of the house lull you to sleep. But your rest is violently shattered.",
      speaker: "narrator",
    },
    {
      text: "BOOM! A massive crack of thunder roars directly overhead. The sudden shock jolts you awake, your heart hammering against your ribs.",
      speaker: "narrator",
    },
  ];

  const handleNextLine = (linesArray, onComplete) => {
    if (dialogueIndex < linesArray.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setDialogueIndex(0);
      onComplete();
    }
  };

  return (
    <main className="prologue-room living-room">
      <header className="chapter-header">
        <h2>Chapter I - The Living Room</h2>
      </header>

      <div className="sprites-container">
        {ownerSprite && (
          <img
            src={ownerSprite}
            alt="Human Owner"
            className="sprite owner-sprite"
          />
        )}
        {characterSprite && (
          <img
            src={characterSprite}
            alt={characterName}
            className="sprite player-sprite"
          />
        )}
      </div>

      {phase === "intro" && (
        <>
          {introStep === "start" && (
            <div
              className="story-textbox clickable"
              onClick={() =>
                handleNextLine(introLines, () => setIntroStep("choice"))
              }
            >
              <span className="speaker-label">
                {introLines[dialogueIndex].speaker === "owner"
                  ? "Human"
                  : "Story"}
              </span>
              <p>{introLines[dialogueIndex].text}</p>
            </div>
          )}

          {introStep === "choice" && (
            <div className="story-textbox choice-box">
              <p className="choice-prompt">How do you react?</p>
              <div className="choice-group">
                <button
                  className="choice-btn"
                  onClick={() => {
                    setDialogueIndex(0);
                    setIntroStep("playtime");
                  }}
                >
                  Sprint to the door to demand a play session
                </button>
                <button
                  className="choice-btn"
                  onClick={() => {
                    setDialogueIndex(0);
                    setIntroStep("cuddles");
                  }}
                >
                  Trot over gently and press your head against their leg for a
                  cozy cuddle
                </button>
              </div>
            </div>
          )}

          {introStep === "playtime" && (
            <div
              className="story-textbox clickable"
              onClick={() =>
                handleNextLine(playtimeLines, () => onNext("kitchen"))
              }
            >
              <span className="speaker-label">
                {playtimeLines[dialogueIndex].speaker === "owner"
                  ? "Human"
                  : "Story"}
              </span>
              <p>{playtimeLines[dialogueIndex].text}</p>
            </div>
          )}

          {introStep === "cuddles" && (
            <div
              className="story-textbox clickable"
              onClick={() =>
                handleNextLine(cuddlesLines, () => onNext("kitchen"))
              }
            >
              <span className="speaker-label">
                {cuddlesLines[dialogueIndex].speaker === "owner"
                  ? "Human"
                  : "Story"}
              </span>
              <p>{cuddlesLines[dialogueIndex].text}</p>
            </div>
          )}
        </>
      )}

      {phase === "disturbance" && (
        <>
          {disturbanceStep === "choice" && (
            <div className="story-textbox choice-box">
              <p className="choice-prompt">
                Back in the living room, you glance at the unlatched front door.
                What do you do while your human is away?
              </p>
              <div className="choice-group">
                <button
                  className="choice-btn"
                  onClick={() => {
                    setChosenAction("guard");
                    setDialogueIndex(0);
                    setDisturbanceStep("storm");
                  }}
                >
                  Guard the house. Pace around the living room and stay active.
                </button>
                <button
                  className="choice-btn"
                  onClick={() => {
                    setChosenAction("nap");
                    setDialogueIndex(0);
                    setDisturbanceStep("storm");
                  }}
                >
                  Curl up on your favorite spot on the couch for a quick nap.
                </button>
              </div>
            </div>
          )}

          {disturbanceStep === "storm" && (
            <div
              className="story-textbox clickable"
              onClick={() => {
                const activeLines =
                  chosenAction === "guard" ? stormGuardLines : stormNapLines;
                handleNextLine(activeLines, () => onNext("frontOfHouse"));
              }}
            >
              <span className="speaker-label">Story</span>
              <p>
                {chosenAction === "guard"
                  ? stormGuardLines[dialogueIndex].text
                  : stormNapLines[dialogueIndex].text}
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
