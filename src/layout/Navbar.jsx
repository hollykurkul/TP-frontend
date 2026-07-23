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
    <header className="main-navbar">
      <div className="navbar-container">
        <NavLink className="nav-brand" to="/">
          Main Menu
        </NavLink>

        <nav className="nav-links">
          {token ? (
            <button type="button" className="nav-btn" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <NavLink className="nav-link" to="/login">
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
