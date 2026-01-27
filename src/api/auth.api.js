import axiosInstance from "./axiosInstance";

// ADMIN LOGIN (uses same backend auth)
export const adminLogin = (data) => {
  return axiosInstance.post("/auth/signin", data);
};

// ADMIN LOGOUT
export const adminLogout = () => {
  return axiosInstance.get("/auth/logOut");
};
