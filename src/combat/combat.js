const params = new URLSearchParams(window.location.search);
const saveId = params.get("saveId");

const playerName = document.getElementById("playerName");
const enemyName = document.getElementById("enemyName");
const playerHearts = document.getElementById("playerHearts");
const enemyHearts = document.getElementById("enemyHearts");
const combatMessage = document.getElementById("combatMessage");
const attackButton = document.getElementById("attackButton");
const blockButton = document.getElementById("blockButton");
const fleeButton = document.getElementById("fleeButton");
const playerAvatar = document.getElementById("playerAvatar");
const enemyAvatar = document.getElementById("enemyAvatar");
const playerAvatarLabel = document.getElementById("playerAvatarLabel");
const enemyAvatarLabel = document.getElementById("enemyAvatarLabel");

function setCombatMessage(message) {
  combatMessage.textContent = message;
}

function renderHearts(container, current = 3, max = 3) {
  container.innerHTML = "";

  for (let i = 1; i <= max; i += 1) {
    const heart = document.createElement("span");
    heart.className = i <= current ? "heart full" : "heart empty";
    container.appendChild(heart);
  }
}

function renderAvatar(imageElement, labelElement, url) {
  if (!url) {
    imageElement.removeAttribute("src");
    imageElement.style.display = "none";
    labelElement.style.display = "block";
    return;
  }

  imageElement.src = url;
  imageElement.style.display = "block";
  labelElement.style.display = "none";
}

function renderCombatState(data) {
  const player = data.player || data.save?.player || {};
  const enemy =
    data.enemy || data.currentEnemy || data.save?.currentEnemy || {};

  playerName.textContent = player.name || "Adventurer";
  enemyName.textContent = enemy.name || "Unknown Rival";

  renderAvatar(playerAvatar, playerAvatarLabel, player.avatarUrl);
  renderAvatar(enemyAvatar, enemyAvatarLabel, enemy.avatarUrl);

  renderHearts(
    playerHearts,
    player.healthPoints ?? data.healthPoints ?? 3,
    player.maxHealthPoints ?? 3,
  );
  renderHearts(
    enemyHearts,
    enemy.healthPoints ?? 3,
    enemy.maxHealthPoints ?? 3,
  );

  if (data.message) {
    setCombatMessage(data.message);
  }
}

async function loadCombat() {
  if (!saveId) {
    setCombatMessage(
      "No saveId was provided. Open this page from a saved game.",
    );
    attackButton.disabled = true;
    blockButton.disabled = true;
    fleeButton.disabled = true;
    renderHearts(playerHearts, 3, 3);
    renderHearts(enemyHearts, 3, 3);
    return;
  }

  try {
    const save = await window.PawdesseyApi.getSave(saveId);
    renderCombatState(save);

    if (!save.currentEnemy && !save.enemy) {
      const encounter = await window.PawdesseyApi.rollEncounter(saveId);
      renderCombatState(encounter);
    }
  } catch (error) {
    setCombatMessage(error.message);
  }
}

async function runCombatAction(action) {
  try {
    const result = await action(saveId);
    renderCombatState(result);

    if (result.outcome === "fled") {
      setTimeout(() => {
        window.location.href = "index.html";
      }, 700);
    }
  } catch (error) {
    setCombatMessage(error.message);
  }
}

attackButton.addEventListener("click", () => {
  runCombatAction(window.PawdesseyApi.attack);
});

blockButton.addEventListener("click", () => {
  runCombatAction(window.PawdesseyApi.block);
});

fleeButton.addEventListener("click", () => {
  runCombatAction(window.PawdesseyApi.flee);
});

loadCombat();
