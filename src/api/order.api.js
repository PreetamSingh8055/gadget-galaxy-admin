import axiosInstance from "./axiosInstance";

// ADMIN: GET ALL ORDERS
export const getAllOrders = () => {
  return axiosInstance.get("/admin/orders");
};
