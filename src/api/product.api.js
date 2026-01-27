import axiosInstance from "./axiosInstance";

// PUBLIC (used for listing)
export const getAllProducts = () =>
  axiosInstance.get("/product");

// ADMIN CREATE PRODUCT
export const adminCreateProduct = (formData) =>
  axiosInstance.post("/admin/products", formData);

// ADMIN DELETE
export const adminDeleteProduct = (id) =>
  axiosInstance.delete(`/admin/products/${id}`);
