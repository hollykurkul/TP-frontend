import { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../api/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const register = async (credentials) => {
    const result = await registerUser(
      credentials.username,
      credentials.password,
    );
    setToken(result.token);
    setUser(result.user || { username: credentials.username });
  };

  const login = async (credentials) => {
    const result = await loginUser(credentials.username, credentials.password);
    setToken(result.token);
    setUser(result.user || { username: credentials.username });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, user, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
