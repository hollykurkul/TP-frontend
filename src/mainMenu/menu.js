const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const newGameButton = document.getElementById("newGameButton");
const loadGameButton = document.getElementById("loadGameButton");
const saveList = document.getElementById("saveList");
const menuMessage = document.getElementById("menuMessage");

let selectedSaveId = null;

function setMenuMessage(message) {
  menuMessage.textContent = message;
}

function getFormValues(form) {
  const formData = new FormData(form);
  return {
    username: formData.get("username"),
    password: formData.get("password"),
  };
}

function renderSaves(saves) {
  saveList.innerHTML = "";
  selectedSaveId = null;
  loadGameButton.disabled = true;

  if (!saves.length) {
    saveList.innerHTML = `
      <div class="save-slot empty">
        <span>No saved games</span>
        <small>Start a new game to create one</small>
      </div>
    `;
    return;
  }

  saves.forEach((save) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "save-slot save-choice";
    button.dataset.saveId = save.id;
    button.innerHTML = `
      <span>${save.name || `Save ${save.id}`}</span>
      <small>${save.currentSceneName || "Unknown location"} - HP ${save.healthPoints || 3}/3</small>
    `;

    button.addEventListener("click", () => {
      document.querySelectorAll(".save-choice").forEach((slot) => {
        slot.classList.remove("selected");
      });

      button.classList.add("selected");
      selectedSaveId = save.id;
      loadGameButton.disabled = false;
    });

    saveList.appendChild(button);
  });
}

async function refreshSaves() {
  try {
    const saves = await window.PawdesseyApi.getSaves();
    renderSaves(Array.isArray(saves) ? saves : saves.saves || []);
  } catch (error) {
    setMenuMessage(error.message);
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { username, password } = getFormValues(loginForm);

  try {
    const result = await window.PawdesseyApi.login(username, password);
    window.PawdesseyApi.setToken(result.token);
    setMenuMessage("Logged in. Saved games loaded.");
    await refreshSaves();
  } catch (error) {
    setMenuMessage(error.message);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { username, password } = getFormValues(registerForm);

  try {
    const result = await window.PawdesseyApi.register(username, password);
    window.PawdesseyApi.setToken(result.token);
    setMenuMessage("Account created. You can start a new game.");
    await refreshSaves();
  } catch (error) {
    setMenuMessage(error.message);
  }
});

newGameButton.addEventListener("click", async () => {
  try {
    const save = await window.PawdesseyApi.createSave();
    window.location.href = `combat.html?saveId=${save.id}`;
  } catch (error) {
    setMenuMessage(error.message);
  }
});

loadGameButton.addEventListener("click", () => {
  if (!selectedSaveId) {
    setMenuMessage("Choose a save slot first.");
    return;
  }

  window.location.href = `combat.html?saveId=${selectedSaveId}`;
});

if (window.PawdesseyApi.getToken()) {
  refreshSaves();
}
