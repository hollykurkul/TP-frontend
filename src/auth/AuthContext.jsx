import { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../api/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

  const register = async (credentials) => {
    const result = await registerUser(
      credentials.username,
      credentials.password,
    );
    setToken(result.token);
  };

  const login = async (credentials) => {
    const result = await loginUser(credentials.username, credentials.password);
    setToken(result.token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
