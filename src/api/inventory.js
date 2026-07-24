const API_URL = `${import.meta.env.VITE_API ?? "http://127.0.0.1:3000"}/inventory`;

async function inventoryRequest(path, token, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Inventory request failed.");
  }

  return response.json();
}

function normalizeItem(item) {
  return {
    id: Number(item.id),
    name: item.name,
    type: item.type,
    effect: item.effect,
    description: item.description,
    imageUrl: item.image_url ?? item.imageUrl,
    canEquip: Boolean(item.can_equip ?? item.canEquip),
    canUse: Boolean(item.can_use ?? item.canUse),
    locationId: Number(item.location_id ?? item.locationId),
  };
}

export async function getInventory(token) {
  const items = await inventoryRequest("/", token);
  return items.map(normalizeItem);
}

export async function rollForItemDrop(locationId, token) {
  const result = await inventoryRequest("/drop", token, {
    method: "POST",
    body: JSON.stringify({ locationId }),
  });

  return {
    dropped: result.dropped,
    item: result.item ? normalizeItem(result.item) : null,
  };
}

export async function consumeHealingItem(itemId, token) {
  const result = await inventoryRequest(`/${itemId}/use`, token, {
    method: "POST",
  });

  return {
    item: normalizeItem(result.item),
    healingAmount: Number(result.healingAmount),
  };
}
