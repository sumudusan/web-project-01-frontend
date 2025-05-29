import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/orders/getOrders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status, notes: order.notes || "" });
    setUpdateModalVisible(true);
  };

  const closeModals = () => {
    setSelectedOrder(null);
    setUpdateModalVisible(false);
    setDetailModalVisible(false);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/orders/${selectedOrder.orderId}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Order updated successfully.");
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === selectedOrder.orderId
              ? { ...order, ...updateData }
              : order
          )
        );
        closeModals();
      })
      .catch(() => toast.error("Failed to update order."));
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-background text-text">
      <h1 className="mb-4 text-xl font-bold text-heading">Admin Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full max-w-4xl border border-accent rounded-lg shadow-sm bg-surface text-text">
          <thead className="bg-surface">
            <tr>
              <th className="p-2 text-left border-b border-accent">Order ID</th>
              <th className="p-2 text-left border-b border-accent">Status</th>
              <th className="p-2 text-left border-b border-accent">Date</th>
              <th className="p-2 text-left border-b border-accent">Total</th>
              <th className="p-2 text-left border-b border-accent">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100">
                <td className="p-2 border-b border-accent">{order.orderId}</td>
                <td className="p-2 border-b border-accent">{order.status}</td>
                <td className="p-2 border-b border-accent">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-2 border-b border-accent">
                  LKR {calculateTotal(order.orderedItems).toFixed(2)}
                </td>
                <td className="p-2 border-b border-accent">
                  <button
                    className="px-3 py-1 mr-2 text-white bg-primary rounded-lg hover:bg-accent"
                    onClick={() => handleViewDetails(order)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-accent rounded-lg hover:bg-primary"
                    onClick={() => handleUpdateOrder(order)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Detail Modal */}
      {detailModalVisible && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full h-[500px] max-w-md p-4 overflow-y-scroll bg-surface rounded-lg shadow-lg text-text">
            <h2 className="mb-4 text-lg font-bold text-heading">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes || "None"}</p>
            <h3 className="mt-4 text-md font-bold text-heading">Ordered Items:</h3>
            <div className="pt-2 mt-2 border-t border-gray-200">
              {selectedOrder.orderedItems.map((item, index) => (
                <div key={index} className="mb-3">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> LKR {Number(item.price).toFixed(2)}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Subtotal:</strong> LKR {(item.price * item.quantity).toFixed(2)}</p>
                  <img src={item.image} alt={item.name} className="w-16 h-16 mt-1 rounded-md" />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-white bg-accent rounded-lg hover:bg-primary"
                onClick={closeModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModalVisible && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-4 bg-surface rounded-lg shadow-lg text-text">
            <h2 className="mb-4 text-lg font-bold text-heading">Update Order</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Status</label>
              <select
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({ ...updateData, status: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="preparing">Preparing</option>
                <option value="cancelled">Cancelled</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="pended">Pended</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                value={updateData.notes}
                onChange={(e) =>
                  setUpdateData({ ...updateData, notes: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-text bg-gray-300 rounded-lg"
                onClick={closeModals}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-accent"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
