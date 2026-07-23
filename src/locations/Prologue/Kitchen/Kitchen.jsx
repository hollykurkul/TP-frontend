import { useState } from "react";
import "./Kitchen.css";

export default function Kitchen({ characterName = "Buddy", onNext }) {
  const [step, setStep] = useState("treat");

  return (
    <main className="prologue-room kitchen">
      <header className="chapter-header">
        <h2>Chapter I - The Kitchen</h2>
      </header>
      {step === "treat" && (
        <div className="story-textbox">
          <p>
            Your human walks into the kitchen and rattles your bag of food. Your
            ears perk up.
          </p>
          <p>
            They pour a fresh bowl of kibble, then reach into the top cabinet to
            pull out your absolute favorite treat.
          </p>
          <p>They hold it just out of reach, teasing you with a grin.</p>
          <blockquote className="dialogue owner">
            “Sit… stay… good job, {characterName}! You get this big one when I
            get back. Oh shoot, I forgot the milk and eggs at the market. I’m
            gonna run right back out, okay? Be good, I’ll be back in ten
            minutes!”
          </blockquote>

          <button
            type="button"
            className="action-btn"
            onClick={() => setStep("departure")}
          >
            Watch them leave
          </button>
        </div>
      )}
      {step === "departure" && (
        <div className="story-textbox">
          <p>
            They rush out toward the front, pulling the heavy wooden door shut
            behind them. But in their hurry, the latch doesn’t click.
          </p>
          <p>
            The door rests just a centimeter open—a tiny sliver of the outside
            world visible through the crack. You are left alone in the quiet
            house.
          </p>

          <button
            type="button"
            className="action-btn"
            onClick={() => onNext("livingRoomDisturbance")}
          >
            Wander back to the living room...
          </button>
        </div>
      )}
    </main>
  );
}
