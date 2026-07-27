const API_ORIGIN = (
  import.meta.env.VITE_API ?? "http://127.0.0.1:3000"
).replace(/\/+$/, "");

async function requestCombatant(path) {
  const response = await fetch(`${API_ORIGIN}${path}`);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "The enemy service could not be reached.");
  }

  return response.json();
}

function getImageVersion(imageUrl) {
  const driveFileMatch =
    /drive\.google\.com\/file\/d\/([^/]+)/.exec(imageUrl ?? "");

  return driveFileMatch?.[1] ?? imageUrl;
}

function normalizeCombatant(combatant, resourceName) {
  const id = Number(combatant?.id);
  const hp = Number(combatant?.hp);
  const sourceImageUrl = combatant?.image_url ?? combatant?.imageUrl;
  const imageVersion = getImageVersion(sourceImageUrl);

  if (
    !combatant?.name ||
    !Number.isInteger(id) ||
    id < 1 ||
    !Number.isInteger(hp) ||
    hp < 1 ||
    typeof imageVersion !== "string" ||
    imageVersion.trim() === ""
  ) {
    throw new Error("The backend returned invalid enemy data.");
  }

  return {
    ...combatant,
    id,
    hp,
    imageUrl: `${API_ORIGIN}/${resourceName}/${id}/image?v=${encodeURIComponent(
      imageVersion,
    )}`,
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
  return normalizeCombatant(enemies[randomIndex], "enemies");
}

export async function getBossByLocation(locationId) {
  const boss = await requestCombatant(`/bosses/location/${locationId}`);
  return normalizeCombatant(boss, "bosses");
}
