import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register({ username, password });
      navigate("/character-select", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="menu-page">
      <form className="menu-panel" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="status-message">{error}</p>}

        <button className="menu-button" type="submit">
          Register
        </button>
      </form>
    </main>
  );
}
