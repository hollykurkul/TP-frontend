const API_ORIGIN = import.meta.env.VITE_API ?? "http://127.0.0.1:3000";
const API_URL = `${API_ORIGIN}/characters`;

function normalizeCharacter(character) {
  return {
    id: Number(character.id),
    name: character.name,
    animalType: character.animal_type ?? character.animalType,
    description: character.description,
    image: `${API_URL}/${character.id}/image`,
  };
}

export async function getCharacters() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error((await response.text()) || "Unable to load characters.");
  }

  const characters = await response.json();

  if (!Array.isArray(characters)) {
    throw new Error("The character response was not a list.");
  }

  return characters.map(normalizeCharacter);
}
