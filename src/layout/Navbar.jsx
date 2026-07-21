import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>Main Menu</p>
      </NavLink>

      <nav>
        {token ? (
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
