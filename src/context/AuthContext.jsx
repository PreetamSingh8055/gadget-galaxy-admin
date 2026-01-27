import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData,
        { withCredentials: true }
      );

      //  adjust if backend response changes
      const userRole = res.data?.data?.role || "admin";

      localStorage.setItem("token", "yes");
      localStorage.setItem("role", userRole);
      setRole(userRole);

      return { role: userRole };
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);