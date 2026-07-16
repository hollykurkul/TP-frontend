const API_BASE_URL = "http://localhost:3000";
const TOKEN_KEY = "token";

async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === "string" ? data : data.message;
    throw new Error(message || "The server returned an error.");
  }

  return data;
}

window.PawdesseyApi = {
  setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  register(username, password) {
    return apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  login(username, password) {
    return apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  getSaves() {
    return Promise.resolve({ saves: [] });
  },

  createSave() {
    return Promise.resolve({ id: "preview" });
  },
};
