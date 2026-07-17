const INVENTORY_STORAGE_KEY = "pawdesseyInventory";

const itemCatalog = {
  littleStick: {
    id: "littleStick",
    name: "Little Stick",
    type: "Weapon",
    effect: "1d4 damage",
    description: "a small stick, pointy at the tip. ouch!",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/055/079/271/small/thin-wooden-stick-with-rustic-texture-free-png.png",
    canEquip: true,
    canUse: false,
  },
  bigBranch: {
    id: "bigBranch",
    name: "Big Branch",
    type: "Weapon",
    effect: "1d6 damage",
    description: "A sturdy branch, perfect for a makeshift club.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/050/768/669/small/tree-branch-isolated-on-transparent-background-png.png",
    canEquip: true,
    canUse: false,
  },
  Berries: {
    id: "Berries",
    name: "Berries",
    type: "Consumable",
    effect: "Restores 1 heart",
    description: "A handful of juicy berries. Naturally sweet and filling.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/053/811/570/small/3d-render-of-juicy-purple-berries-png.png",
    canEquip: false,
    canUse: true,
  },
  Fish: {
    id: "Fish",
    name: "Fish",
    type: "Consumable",
    effect: "Restores 2 hearts",
    description: "A fresh fish, still wriggling. It smells of the stream.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/048/718/584/small/fish-on-transparent-background-free-png.png",
    canEquip: false,
    canUse: true,
  },
  Apple: {
    id: "Apple",
    name: "Apple",
    type: "Consumable",
    effect: "Restores 1 heart",
    description: "A crisp, red apple. Sweet and satisfying.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/067/874/485/small/fresh-red-apple-with-green-leaf-free-png.png",
    canEquip: false,
    canUse: true,
  },
  theTwigBlade: {
    id: "theTwigBlade",
    name: "The Twig Blade",
    type: "Weapon",
    effect: "1d6 damage",
    description: "A polished wooden blade, light enough for quick strikes.",
    imageUrl:
      "https://cdn.wikimg.net/en/zeldawiki/images/thumb/2/21/TPHD_Wooden_Sword_Model.png/1200px-TPHD_Wooden_Sword_Model.png",
    canEquip: true,
    canUse: false,
  },
  stopSign: {
    id: "stopSign",
    name: "Stop Sign",
    type: "Weapon",
    effect: "1d8 damage",
    description: "A fallen stop sign, rusted and weathered.",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/acb5cb15-636b-4bd5-a06e-a62420c5fb7f/db9ryel-b6cd963e-af04-474e-a2e0-091f26cbc12d.png/v1/fill/w_1024,h_2977/stop_signs_png_by_kooyooss_db9ryel-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mjk3NyIsInBhdGgiOiIvZi9hY2I1Y2IxNS02MzZiLTRiZDUtYTA2ZS1hNjI0MjBjNWZiN2YvZGI5cnllbC1iNmNkOTYzZS1hZjA0LTQ3NGUtYTJlMC0wOTFmMjZjYmMxMmQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.qWoo4rbj18Vq8AN3Iwp2k6l8UpU7IEd9md7-nqfCxlQ",
    canEquip: true,
    canUse: false,
  },
  Rock: {
    id: "Rock",
    name: "Rock",
    type: "Weapon",
    effect: "1d4 damage",
    description: "A smooth, round stone. Perfect for throwing.",
    imageUrl: "https://images.fallout.wiki/3/3a/FO76WA_Pet_rock.png",
    canEquip: true,
    canUse: true,
  },
  pocketSand: {
    id: "pocketSand",
    name: "Pocket Sand",
    type: "Consumable",
    effect: "Blinds an enemy for 1 turn",
    description: "A small pouch of fine sand. Useful for distracting foes.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/035/320/452/small/ai-generated-sand-pile-isolated-on-transparent-background-png.png",
    canEquip: false,
    canUse: true,
  },
  cactusFruit: {
    id: "cactusFruit",
    name: "Cactus Fruit",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A spiky fruit that yields a sweet, refreshing juice. its the quenchiest",
    imageUrl:
      "https://www.havlikovaapoteka.cz/user/articles/images/opuncie--mucosave___.png",
    canEquip: false,
    canUse: true,
  },
  waterBottle: {
    id: "waterBottle",
    name: "Water Bottle",
    type: "Consumable",
    effect: "Restores 2 hearts",
    description: "An abandoned bottle filled with clean water.",
    imageUrl:
      "https://png.pngtree.com/png-vector/20250325/ourmid/pngtree-water-bottle-png-image_15868794.png",
    canEquip: false,
    canUse: true,
  },
  roadKill: {
    id: "roadKill",
    name: "Road Kill",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A small body of an animal that has been hit by a vehicle. still warm",
    imageUrl:
      "https://www.clipartmax.com/png/full/91-917882_dead-clipart-dead-mouse-dead-animal-cartoon-png.png",
    canEquip: false,
    canUse: true,
  },
  leadPipe: {
    id: "leadPipe",
    name: "Lead Pipe",
    type: "Weapon",
    effect: "1d8 damage",
    description: "A heavy pipe, useful for striking enemies.",
    imageUrl: "https://images.fallout.wiki/2/23/Lead_pipe.png",
    canEquip: true,
    canUse: false,
  },
  walkingStick: {
    id: "walkingStick",
    name: "Walking Stick",
    type: "Weapon",
    effect: "1d4 damage",
    description: "A simple stick, useful for support and striking.",
    imageUrl:
      "https://pngimg.com/uploads/walking_stick/walking_stick_PNG33.png",
    canEquip: true,
    canUse: false,
  },
  moonBall: {
    id: "moonBall",
    name: "Moon Ball",
    type: "Weapon",
    effect: "1d6 damage",
    description:
      "A very bouncy ball. Never fails to bounce back to the thrower.",
    imageUrl:
      "https://dischub.com/cdn/shop/files/moon-ball-blue.png?v=1693274777&width=1445",
    canEquip: true,
    canUse: true,
  },
  fastFoodBag: {
    id: "fastFoodBag",
    name: "Fast Food Bag",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A bag of fast food. Not very nutritious, but filling and delicious.",
    imageUrl:
      "https://www.pngarts.com/files/7/Paper-Bag-McDonalds-Bag-Vector-PNG.png",
    canEquip: false,
    canUse: true,
  },
  lunchBox: {
    id: "lunchBox",
    name: "Lunch Box",
    type: "Consumable",
    effect: "Restores 2 hearts",
    description:
      "A packed lunch box with a variety of food items. A hearty meal for the journey.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/045/547/171/small/choosing-the-perfect-lunch-box-for-any-occasion-free-png.png",
    canEquip: false,
    canUse: true,
  },
  thrownOutFood: {
    id: "thrownOutFood",
    name: "Thrown Out Food",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A piece of food that has been discarded in the dump. Still edible, but not very appetizing.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/033/293/177/small/food-waste-isolated-on-transparent-generative-ai-free-png.png",
    canEquip: false,
    canUse: true,
  },
};

const inventoryList = document.getElementById("inventoryList");
const itemCount = document.getElementById("itemCount");
const foundItemsList = document.getElementById("foundItemsList");
const detailImage = document.getElementById("detailImage");
const detailImageLabel = document.getElementById("detailImageLabel");
const detailType = document.getElementById("detailType");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailEffect = document.getElementById("detailEffect");
const detailStatus = document.getElementById("detailStatus");
const equipButton = document.getElementById("equipButton");
const useButton = document.getElementById("useButton");
const trashButton = document.getElementById("trashButton");
const inventoryMessage = document.getElementById("inventoryMessage");

let inventoryItems = loadInventory();
let selectedItemId = null;

function loadInventory() {
  const savedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY);

  if (!savedInventory) {
    return [];
  }

  try {
    const parsedInventory = JSON.parse(savedInventory);
    return Array.isArray(parsedInventory) ? parsedInventory : [];
  } catch {
    return [];
  }
}

function saveInventory() {
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventoryItems));
}

function getInventoryEntry(itemId) {
  return inventoryItems.find((entry) => entry.id === itemId);
}

function getInventoryItem(itemId) {
  const catalogItem = itemCatalog[itemId];
  const inventoryEntry = getInventoryEntry(itemId);

  if (!catalogItem || !inventoryEntry) {
    return null;
  }

  return {
    ...catalogItem,
    equipped: Boolean(inventoryEntry.equipped),
  };
}

function getSelectedItem() {
  return getInventoryItem(selectedItemId);
}

function setInventoryMessage(message) {
  inventoryMessage.textContent = message;
}

function addItemToInventory(itemId) {
  const catalogItem = itemCatalog[itemId];

  if (!catalogItem) {
    setInventoryMessage(`Unknown item id: ${itemId}`);
    return false;
  }

  if (getInventoryEntry(itemId)) {
    setInventoryMessage(`${catalogItem.name} is already in your satchel.`);
    return false;
  }

  inventoryItems.push({
    id: itemId,
    equipped: false,
  });

  saveInventory();
  selectedItemId = itemId;
  renderPage();
  setInventoryMessage(`${catalogItem.name} added to inventory.`);
  return true;
}

function removeItemFromInventory(itemId) {
  inventoryItems = inventoryItems.filter((entry) => entry.id !== itemId);
  saveInventory();
}

function renderEmptyInventory() {
  inventoryList.innerHTML = `
    <div class="empty-inventory">
      <strong>Your satchel is empty.</strong>
      <span>Items found in scenes, combat rewards, or treasure spots will appear here.</span>
    </div>
  `;
}

function renderInventoryList() {
  inventoryList.innerHTML = "";
  itemCount.textContent = `${inventoryItems.length} item${inventoryItems.length === 1 ? "" : "s"}`;

  if (!inventoryItems.length) {
    renderEmptyInventory();
    return;
  }

  inventoryItems.forEach((inventoryEntry) => {
    const item = getInventoryItem(inventoryEntry.id);

    if (!item) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-item";
    button.dataset.itemId = item.id;

    if (item.id === selectedItemId) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="inventory-item-icon">${item.name.charAt(0)}</span>
      <span>
        <strong>${item.name}</strong>
        <small>${item.type}${item.equipped ? " - Equipped" : ""}</small>
      </span>
    `;

    button.addEventListener("click", () => {
      selectedItemId = item.id;
      renderPage();
      setInventoryMessage(`${item.name} selected.`);
    });

    inventoryList.appendChild(button);
  });
}

function renderFoundItems() {
  foundItemsList.innerHTML = "";

  Object.values(itemCatalog).forEach((item) => {
    const alreadyOwned = Boolean(getInventoryEntry(item.id));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "found-item-button";
    button.disabled = alreadyOwned;
    button.textContent = alreadyOwned
      ? `${item.name} found`
      : `Add ${item.name}`;

    button.addEventListener("click", () => {
      addItemToInventory(item.id);
    });

    foundItemsList.appendChild(button);
  });
}

function renderItemImage(item) {
  if (!item || !item.imageUrl) {
    detailImage.removeAttribute("src");
    detailImage.style.display = "none";
    detailImageLabel.style.display = "block";
    detailImageLabel.textContent = item
      ? `${item.name} image`
      : "Select an item";
    return;
  }

  detailImage.src = item.imageUrl;
  detailImage.alt = `${item.name} item art`;
  detailImage.style.display = "block";
  detailImageLabel.style.display = "none";
}

function renderItemDetails() {
  const item = getSelectedItem();

  if (!item) {
    detailType.textContent = "No item selected";
    detailName.textContent = inventoryItems.length
      ? "Choose an item."
      : "Your satchel is empty.";
    detailDescription.textContent = inventoryItems.length
      ? "Click any item in your inventory to see its story, stats, and available actions."
      : "When another scene awards an item, it can be added here by item ID.";
    detailEffect.textContent = "-";
    detailStatus.textContent = "-";
    equipButton.disabled = true;
    useButton.disabled = true;
    trashButton.disabled = true;
    renderItemImage(null);
    return;
  }

  detailType.textContent = item.type;
  detailName.textContent = item.name;
  detailDescription.textContent = item.description;
  detailEffect.textContent = item.effect;
  detailStatus.textContent = item.equipped ? "Equipped" : "In satchel";

  equipButton.disabled = !item.canEquip;
  equipButton.textContent = item.equipped ? "Unequip Item" : "Equip Item";
  useButton.disabled = !item.canUse;
  trashButton.disabled = false;

  renderItemImage(item);
}

function renderPage() {
  renderInventoryList();
  renderFoundItems();
  renderItemDetails();
}

equipButton.addEventListener("click", () => {
  const item = getSelectedItem();
  const inventoryEntry = getInventoryEntry(selectedItemId);

  if (!item || !inventoryEntry || !item.canEquip) {
    return;
  }

  inventoryEntry.equipped = !inventoryEntry.equipped;
  saveInventory();
  renderPage();
  setInventoryMessage(
    `${item.name} ${inventoryEntry.equipped ? "equipped" : "unequipped"}.`,
  );
});

useButton.addEventListener("click", () => {
  const item = getSelectedItem();

  if (!item || !item.canUse) {
    return;
  }

  setInventoryMessage(
    `${item.name} used. Your backend would apply the effect here.`,
  );
});

trashButton.addEventListener("click", () => {
  const item = getSelectedItem();

  if (!item) {
    return;
  }

  removeItemFromInventory(item.id);
  selectedItemId = null;

  renderPage();
  setInventoryMessage(`${item.name} removed from inventory.`);
});

function addItemFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("add");

  if (itemId) {
    addItemToInventory(itemId);
  }
}

window.PawdesseyInventory = {
  addItem: addItemToInventory,
  getItems() {
    return [...inventoryItems];
  },
  clear() {
    inventoryItems = [];
    selectedItemId = null;
    saveInventory();
    renderPage();
    setInventoryMessage("Inventory cleared.");
  },
};

addItemFromQueryString();
renderPage();
