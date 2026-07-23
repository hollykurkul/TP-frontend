import { useState } from "react";
import LivingRoom from "./LivingRoom/LivingRoom";
import Kitchen from "./Kitchen/Kitchen";
import FrontOfHouse from "./Front/Front";

export default function PrologueController({
  characterName = "Buddy",
  onComplete,
}) {
  const [currentScene, setCurrentScene] = useState("livingRoomIntro");

  return (
    <div className="prologue-container">
      {currentScene === "livingRoomIntro" && (
        <LivingRoom
          characterName={characterName}
          phase="intro"
          onNext={() => setCurrentScene("kitchen")}
        />
      )}

      {currentScene === "kitchen" && (
        <Kitchen
          characterName={characterName}
          onNext={() => setCurrentScene("livingRoomDisturbance")}
        />
      )}

      {currentScene === "livingRoomDisturbance" && (
        <LivingRoom
          characterName={characterName}
          phase="disturbance"
          onNext={() => setCurrentScene("frontOfHouse")}
        />
      )}

      {currentScene === "frontOfHouse" && (
        <FrontOfHouse characterName={characterName} onComplete={onComplete} />
      )}
    </div>
  );
}
