import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/order.api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <>
                {/* MAIN ROW */}
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {order.orderId}
                  </td>

                  <td className="p-3">
                    <div className="text-sm font-medium">
                      {order.user?.userId?.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.userId?.email}
                    </div>
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{order.pricing?.finalAmount}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.payment?.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.payment?.method} ·{" "}
                      {order.payment?.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {order.status?.orderStatus}
                    </span>
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        setOpenOrderId(
                          openOrderId === order._id
                            ? null
                            : order._id
                        )
                      }
                      className="text-purple-600 text-sm hover:underline"
                    >
                      {openOrderId === order._id
                        ? "Hide"
                        : "View"}
                    </button>
                  </td>
                </tr>

                {/* EXPANDED DETAILS */}
                {openOrderId === order._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="p-4">
                      <div className="grid grid-cols-2 gap-6">

                        {/* ITEMS */}
                        <div>
                          <h3 className="font-semibold mb-2">
                            Items
                          </h3>
                          <ul className="space-y-2">
                            {order.items.map((item) => (
                              <li
                                key={item._id}
                                className="flex gap-3 items-center"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} · ₹
                                    {item.totalPrice}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* ADDRESS */}
                        <div>
                          <h3 className="font-semibold mb-2">
                            Delivery Address
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.address?.house},{" "}
                            {order.address?.street},{" "}
                            {order.address?.city},{" "}
                            {order.address?.state} -{" "}
                            {order.address?.pincode}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.address?.country}
                          </p>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
