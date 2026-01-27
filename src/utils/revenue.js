export const calculateRevenueByMonth = (orders) => {
  const map = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    map[key] =
      (map[key] || 0) + (order.pricing?.finalAmount || 0);
  });

  return Object.entries(map).map(([month, revenue]) => ({
    month,
    revenue,
  }));
};
