import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );

  const login = async (formData) => {
    try {
      const res = await axiosInstance.post(
        "/auth/signin",
        formData
      );

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

  const logout = async () => {
    try {
      await axiosInstance.get("/auth/logOut");
    } catch (err) {
      // ignore
    }

    localStorage.clear();
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
