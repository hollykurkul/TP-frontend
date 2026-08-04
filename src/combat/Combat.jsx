import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { rollForItemDrop } from "../api/inventory.js";
import { useAuth } from "../auth/AuthContext.jsx";
import Inventory from "../inventory/Inventory.jsx";
import "./combat.css";

const DEFAULT_MAX_HP = 3;

function chooseEnemyIntent() {
  return Math.random() < 0.5 ? "attack" : "block";
}

function HealthBar({ currentHp, maxHp, label, variant = "player" }) {
  const safeMaxHp = Math.max(1, Number(maxHp) || 1);
  const safeCurrentHp = Math.max(
    0,
    Math.min(Number(currentHp) || 0, safeMaxHp),
  );

  const percentage = (safeCurrentHp / safeMaxHp) * 100;

  return (
    <div className={`health-display health-${variant}`}>
      <div className="health-label">
        <span>{label}</span>
        <strong>
          {safeCurrentHp}/{safeMaxHp} HP
        </strong>
      </div>

      <div
        className="health-track"
        role="progressbar"
        aria-label={`${label}: ${safeCurrentHp} of ${safeMaxHp} HP`}
        aria-valuemin="0"
        aria-valuemax={safeMaxHp}
        aria-valuenow={safeCurrentHp}
      >
        <span className="health-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default function Combat({
  character,
  currentHp = DEFAULT_MAX_HP,
  maxHp = DEFAULT_MAX_HP,
  onHealthChange = () => {},
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const enemyName = location.state?.enemyName ?? "Wild Creature";
  const enemyMaxHearts = location.state?.enemyMaxHearts ?? DEFAULT_MAX_HP;
  const enemyImageUrl = location.state?.enemyImageUrl;
  const combatLocationId = Number(location.state?.locationId);
  const isBoss = Boolean(location.state?.isBoss);
  const victoryTo = location.state?.victoryTo;
  const victoryScene = location.state?.victoryScene;

  const [enemyHearts, setEnemyHearts] = useState(enemyMaxHearts);
  const [enemyIntent, setEnemyIntent] = useState(chooseEnemyIntent);
  const [message, setMessage] = useState(
    "The creature watches you carefully. Choose your move.",
  );
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [dropPending, setDropPending] = useState(false);

  const combatEnded = currentHp === 0 || enemyHearts === 0;
  const playerName =
    location.state?.playerName ?? character?.name ?? "Adventurer";
  const playerImage =
    location.state?.playerImageUrl ??
    character?.image ??
    character?.imageUrl ??
    character?.image_url;

  async function takeTurn(playerAction) {
    if (combatEnded) return;

    let nextCurrentHp = currentHp;
    let nextEnemyHearts = enemyHearts;
    const turnMessages = [];

    if (playerAction === "attack") {
      if (enemyIntent === "block") {
        const blockSucceeded = Math.random() < 0.5;

        if (blockSucceeded) {
          turnMessages.push("The enemy blocks your attack.");
        } else {
          nextEnemyHearts = Math.max(0, nextEnemyHearts - 1);
          turnMessages.push(
            "The enemy tries to block, but you get past their guard.",
          );
        }
      } else {
        nextEnemyHearts = Math.max(0, nextEnemyHearts - 1);
        turnMessages.push("Your slash damages the enemy.");
      }
    }

    if (nextEnemyHearts === 0) {
      const victoryMessage = `${turnMessages.join(" ")} You won the fight!`;
      setEnemyHearts(0);
      setMessage(victoryMessage);

      if (!token || !Number.isInteger(combatLocationId)) return;

      setDropPending(true);
      setMessage(`${victoryMessage} Checking the enemy for loot...`);

      try {
        const drop = await rollForItemDrop(combatLocationId, token);
        setMessage(
          drop.dropped
            ? `${victoryMessage} ${drop.item.name} dropped and was added to your inventory!`
            : `${victoryMessage} The enemy did not drop an item.`,
        );
      } catch (error) {
        setMessage(
          `${victoryMessage} ${
            error instanceof Error ? error.message : "Unable to check for loot."
          }`,
        );
      } finally {
        setDropPending(false);
      }
      return;
    }

    if (enemyIntent === "attack") {
      if (playerAction === "block") {
        turnMessages.push("You block the enemy's attack and take no damage.");
      } else {
        nextCurrentHp = Math.max(0, nextCurrentHp - 1);
        turnMessages.push("The enemy attacks and cuts your fur.");
      }
    } else if (playerAction === "block") {
      turnMessages.push("Both fighters block. No hearts are lost.");
    }

    onHealthChange(nextCurrentHp);
    setEnemyHearts(nextEnemyHearts);

    if (nextCurrentHp === 0) {
      setMessage(`${turnMessages.join(" ")} You were defeated.`);
      return;
    }

    const nextIntent = chooseEnemyIntent();
    setEnemyIntent(nextIntent);
    turnMessages.push(`The enemy seems like it might ${nextIntent} next turn.`);
    setMessage(turnMessages.join(" "));
  }

  function exitCombat() {
    if (enemyHearts === 0 && isBoss && victoryTo) {
      navigate(victoryTo, {
        replace: true,
        state: victoryScene ? { scene: victoryScene } : undefined,
      });
      return;
    }

    const returnTo = location.state?.returnTo ?? "/forest";
    const returnScene = location.state?.returnScene;
    const defeatScene = location.state?.defeatScene;
    const destinationScene =
      currentHp === 0 && defeatScene ? defeatScene : returnScene;

    navigate(returnTo, {
      replace: true,
      state: destinationScene ? { scene: destinationScene } : undefined,
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
          <HealthBar
            currentHp={currentHp}
            maxHp={maxHp}
            label={`${playerName} health`}
          />
        </article>

        <div className="versus">VS</div>

        <article className="fighter-card enemy-card">
          <div className="avatar-frame enemy-placeholder">
            {enemyImageUrl ? (
              <img
                className="combat-avatar enemy-avatar"
                src={enemyImageUrl}
                alt={`${enemyName} portrait`}
              />
            ) : (
              <span aria-hidden="true">?</span>
            )}
          </div>
          <h2>{enemyName}</h2>
          <HealthBar
            currentHp={enemyHearts}
            maxHp={enemyMaxHearts}
            label={`${enemyName} health`}
            variant="enemy"
          />
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
        <button
          type="button"
          className="secondary-button"
          onClick={() => setInventoryOpen(true)}
        >
          Inventory
        </button>
        <button
          type="button"
          className="danger-button"
          disabled={dropPending}
          onClick={exitCombat}
        >
          {dropPending
            ? "Checking for loot..."
            : enemyHearts === 0
              ? isBoss && victoryTo
                ? "Proceed"
                : "Return"
              : "Flee"}
        </button>
      </section>

      {inventoryOpen && (
        <div
          className="combat-inventory-overlay"
          role="dialog"
          aria-modal="true"
        >
          <Inventory
            embedded
            onClose={() => setInventoryOpen(false)}
            currentHp={currentHp}
            maxHp={maxHp}
            onHealthChange={onHealthChange}
          />
        </div>
      )}
    </main>
  );
}
