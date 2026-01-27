import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const [products, orders, users] = await Promise.all([
    axiosInstance.get("/product"),       // public products
    axiosInstance.get("/admin/orders"),  // admin orders
    axiosInstance.get("/admin/users"),   // admin users
  ]);

  return {
    products: products.data.data || [],
    orders: orders.data.orders || [],
    users: users.data.users || [],
  };
};
