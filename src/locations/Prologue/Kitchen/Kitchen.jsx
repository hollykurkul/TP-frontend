import { useState } from "react";
import "./Kitchen.css";

export default function Kitchen({ characterName = "Buddy", onNext }) {
  const [step, setStep] = useState("treat");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const treatLines = [
    {
      text: "Your human walks into the kitchen and rattles your bag of food. Your ears perk up.",
      speaker: "narrator",
    },
    {
      text: "They pour a fresh bowl of kibble, then reach into the top cabinet to pull out your absolute favorite treat.",
      speaker: "narrator",
    },
    {
      text: "They hold it just out of reach, teasing you with a grin.",
      speaker: "narrator",
    },
    {
      text: `“Sit… stay… good job, ${characterName}! You get this big one when I get back. Oh shoot, I forgot the milk and eggs at the market. I’m gonna run right back out, okay? Be good, I’ll be back in ten minutes!”`,
      speaker: "owner",
    },
  ];

  const departureLines = [
    {
      text: "They rush out toward the front, pulling the heavy wooden door shut behind them. But in their hurry, the latch doesn’t click.",
      speaker: "narrator",
    },
    {
      text: "The door rests just a centimeter open—a tiny sliver of the outside world visible through the crack.",
      speaker: "narrator",
    },
    { text: "You are left alone in the quiet house.", speaker: "narrator" },
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
    <main className="prologue-room kitchen">
      <header className="chapter-header">
        <h2>Chapter I - The Kitchen</h2>
      </header>

      <div className="sprites-container"></div>

      {step === "treat" && (
        <div
          className="story-textbox clickable"
          onClick={() => handleNextLine(treatLines, () => setStep("departure"))}
        >
          <span className="speaker-label">
            {treatLines[dialogueIndex].speaker === "owner" ? "Human" : "Story"}
          </span>
          <p>{treatLines[dialogueIndex].text}</p>
        </div>
      )}

      {step === "departure" && (
        <div
          className="story-textbox clickable"
          onClick={() =>
            handleNextLine(departureLines, () =>
              onNext("livingRoomDisturbance"),
            )
          }
        >
          <span className="speaker-label">Story</span>
          <p>{departureLines[dialogueIndex].text}</p>
        </div>
      )}
    </main>
  );
}
