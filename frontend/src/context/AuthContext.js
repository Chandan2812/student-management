import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = `http://localhost:8000/api`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // SIGNUP
  const signup = async (email, password, role = "user") => {
    try {
      await axios.post(`${API_URL}/signup`, {
        email,
        password,
        role,
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
