import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
} from "lucide-react";

import AnimatedNumber from "../../components/AnimatedNumber";
import { getDashboardStats } from "../../api/dashboard.api";
import { calculateRevenueByMonth } from "../../utils/revenue";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const { products, orders, users } = await getDashboardStats();

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.pricing?.finalAmount || 0),
      0
    );

    setStats({
      products: products.length,
      orders: orders.length,
      users: users.length,
      revenue: totalRevenue,
    });

    setRevenueData(calculateRevenueByMonth(orders));
  };

  const cards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: <Package />,
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <ShoppingCart />,
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users />,
    },
    {
      title: "Revenue",
      value: stats.revenue,
      icon: <IndianRupee />,
      prefix: "₹",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 sm:space-y-10"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Store performance overview
        </p>

      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-900 border border-purple-800 rounded-xl p-6 text-purple-300 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">
                  {c.title}
                </p>
                <h2 className="text-3xl font-bold mt-1">
                  {c.prefix}
                  <AnimatedNumber value={c.value} />
                </h2>
              </div>
              <div className="bg-purple-800/40 p-3 rounded-lg">
                {c.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 border border-purple-800 rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-white sm:mb-4">
          Revenue Trend
        </h2>

        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
