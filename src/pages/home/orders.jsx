import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/orders/getOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div
      className="flex flex-col items-center w-full p-4 min-h-screen"
      style={{ backgroundColor: "#FAF4EB" }}
    >
      <h1
        className="mb-6 text-3xl font-bold"
        style={{ color: "#5C3D2E" }}
      >
        My Orders
      </h1>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto">
          <table
            className="min-w-full text-sm border border-gray-300 rounded-lg shadow-sm"
            style={{ backgroundColor: "#FFFDF9" }}
          >
            <thead style={{ backgroundColor: "#E7A1A1" }}>
              <tr>
                <th className="px-4 py-3 border-b font-semibold text-left" style={{ color: "#5C3D2E" }}>
                  Order ID
                </th>
                <th className="px-4 py-3 border-b font-semibold text-left" style={{ color: "#5C3D2E" }}>
                  Status
                </th>
                <th className="px-4 py-3 border-b font-semibold text-left" style={{ color: "#5C3D2E" }}>
                  Date
                </th>
                <th className="px-4 py-3 border-b font-semibold text-left" style={{ color: "#5C3D2E" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  onClick={() => handleRowClick(order)}
                  className="cursor-pointer hover:bg-gray-100 transition"
                  style={{ color: "#4B3F3F" }}
                >
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3" style={{ color: "#C9B037" }}>{order.status}</td>
                  <td className="px-4 py-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    LKR {calculateTotal(order.orderedItems).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <div
            className="w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#FFFDF9", color: "#4B3F3F" }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: "#5C3D2E" }}>
              Order Details
            </h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes || "None"}</p>

            <h3 className="mt-4 font-semibold" style={{ color: "#5C3D2E" }}>
              Ordered Items:
            </h3>
            <div className="mt-3 space-y-4 border-t pt-4">
              {selectedOrder.orderedItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                  />
                  <div className="flex flex-col text-sm">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Price:</strong> LKR {Number(item.price).toFixed(2)}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Subtotal:</strong> LKR {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded text-white"
                style={{
                  backgroundColor: "#C9B037",
                  color: "#FFFDF9",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
