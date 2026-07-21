import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import "./combat.css";

const MAX_HEARTS = 3;

function chooseEnemyIntent() {
  return Math.random() < 0.5 ? "attack" : "block";
}

function HeartBar({ current, label }) {
  return (
    <div
      className="heart-bar"
      role="img"
      aria-label={`${label}: ${current} of ${MAX_HEARTS} hearts`}
    >
      {Array.from({ length: MAX_HEARTS }, (_, index) => (
        <span
          aria-hidden="true"
          className={index < current ? "heart full" : "heart empty"}
          key={index}
        />
      ))}
    </div>
  );
}

export default function Combat({ character }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [playerHearts, setPlayerHearts] = useState(MAX_HEARTS);
  const [enemyHearts, setEnemyHearts] = useState(MAX_HEARTS);
  const [enemyIntent, setEnemyIntent] = useState(chooseEnemyIntent);
  const [message, setMessage] = useState(
    "The creature watches you carefully. Choose your move.",
  );

  const combatEnded = playerHearts === 0 || enemyHearts === 0;
  const playerName = character?.name ?? "Adventurer";
  const playerImage = character?.image;
  const enemyName = location.state?.enemyName ?? "Wild Creature";

  function takeTurn(playerAction) {
    if (combatEnded) return;

    let nextPlayerHearts = playerHearts;
    let nextEnemyHearts = enemyHearts;
    const turnMessages = [];

    if (playerAction === "attack") {
      if (enemyIntent === "block") {
        turnMessages.push("The enemy blocks your attack.");
      } else {
        nextEnemyHearts = Math.max(0, nextEnemyHearts - 1);
        turnMessages.push("Your slash damages the enemy.");
      }
    }

    if (nextEnemyHearts === 0) {
      setEnemyHearts(0);
      setMessage(`${turnMessages.join(" ")} You won the fight!`);
      return;
    }

    if (enemyIntent === "attack") {
      if (playerAction === "block") {
        turnMessages.push("You block the enemy's attack and take no damage.");
      } else {
        nextPlayerHearts = Math.max(0, nextPlayerHearts - 1);
        turnMessages.push("The enemy attacks and cuts your fur.");
      }
    } else if (playerAction === "block") {
      turnMessages.push("Both fighters block. No hearts are lost.");
    }

    setPlayerHearts(nextPlayerHearts);
    setEnemyHearts(nextEnemyHearts);

    if (nextPlayerHearts === 0) {
      setMessage(`${turnMessages.join(" ")} You were defeated.`);
      return;
    }

    const nextIntent = chooseEnemyIntent();
    setEnemyIntent(nextIntent);
    turnMessages.push(`The enemy seems like it might ${nextIntent} next turn.`);
    setMessage(turnMessages.join(" "));
  }

  function flee() {
    const returnTo = location.state?.returnTo ?? "/forest";
    const returnScene = location.state?.returnScene;

    navigate(returnTo, {
      replace: true,
      state: returnScene ? { scene: returnScene } : undefined,
    });
  }

  return (
    <main className="combat-page">
      <section className="combat-header">
        <p className="eyebrow">Combat encounter</p>
        <h1>{enemyName} Attacks</h1>
      </section>

      <section className="combat-arena">
        <article className="fighter-card">
          <div className="avatar-frame">
            {playerImage ? (
              <img
                className="combat-avatar"
                src={playerImage}
                alt={`${playerName} portrait`}
              />
            ) : (
              <span>{playerName}</span>
            )}
          </div>
          <h2>{playerName}</h2>
          <HeartBar current={playerHearts} label={`${playerName} health`} />
        </article>

        <div className="versus">VS</div>

        <article className="fighter-card enemy-card">
          <div className="avatar-frame enemy-placeholder" aria-hidden="true">
            ?
          </div>
          <h2>{enemyName}</h2>
          <HeartBar current={enemyHearts} label="Enemy health" />
        </article>
      </section>

      <section className="combat-log" aria-live="polite">
        {!combatEnded && (
          <p className={`enemy-intent intent-${enemyIntent}`}>
            Enemy intent: <strong>{enemyIntent.toUpperCase()}</strong>
          </p>
        )}
        <p>{message}</p>
      </section>

      <section className="combat-actions" aria-label="Combat actions">
        <button
          type="button"
          disabled={combatEnded}
          onClick={() => takeTurn("attack")}
        >
          Attack
        </button>
        <button
          type="button"
          className="secondary-button"
          disabled={combatEnded}
          onClick={() => takeTurn("block")}
        >
          Block
        </button>
        <button type="button" className="danger-button" onClick={flee}>
          {enemyHearts === 0 ? "Return" : "Flee"}
        </button>
      </section>
    </main>
  );
}
