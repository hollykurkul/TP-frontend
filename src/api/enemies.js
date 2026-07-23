const API_ORIGIN = import.meta.env.VITE_API ?? "http://127.0.0.1:3000";

async function requestCombatant(path) {
  const response = await fetch(`${API_ORIGIN}${path}`);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "The enemy service could not be reached.");
  }

  return response.json();
}

function normalizeCombatant(combatant) {
  const hp = Number(combatant?.hp);
  const imageUrl = combatant?.image_url ?? combatant?.imageUrl;

  if (
    !combatant?.name ||
    !Number.isInteger(hp) ||
    hp < 1 ||
    typeof imageUrl !== "string" ||
    imageUrl.trim() === ""
  ) {
    throw new Error("The backend returned invalid enemy data.");
  }

  return {
    ...combatant,
    hp,
    imageUrl,
  };
}

export async function getRandomEnemyByLocation(locationId) {
  const enemies = await requestCombatant(
    `/enemies/location/${locationId}`,
  );

  if (!Array.isArray(enemies) || enemies.length === 0) {
    throw new Error("No enemies were found for this location.");
  }

  const randomIndex = Math.floor(Math.random() * enemies.length);
  return normalizeCombatant(enemies[randomIndex]);
}

export async function getBossByLocation(locationId) {
  const boss = await requestCombatant(`/bosses/location/${locationId}`);
  return normalizeCombatant(boss);
}
