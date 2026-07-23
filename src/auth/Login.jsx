import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="menu-panel auth-card">
        <h2>Log in to your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="divider" />

        <p className="auth-footer-text">Need an account?</p>
        <Link to="/register" className="menu-button secondary-button">
          Register Here
        </Link>
      </div>
    </div>
  );
}
