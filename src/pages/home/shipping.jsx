import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../../Components/cartCard"; // ✅ Corrected import

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cart) {
      toast.error("No items received");
      navigate("/cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order quote. Please try again.");
        console.error(err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!address.trim()) return toast.error("Please enter your address.");
    if (!phone.trim() || !/^\d{10}$/.test(phone))
      return toast.error("Please enter a valid 10-digit phone number.");
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/createOrder`,
        { orderedItems: cart, name, address, phone },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => {
        toast.error("Failed to place order. Please try again.");
        console.error(err);
      });
  }

  if (!cart) return null;

  return (
    <div className="w-full h-full bg-white p-4 flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Shipping Details</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Product ID</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            ))}
          </tbody>
        </table>

        <div className="space-y-1 text-right">
          <h1 className="text-xl font-semibold text-gray-700">
            Total: LKR {labeledTotal.toFixed(2)}
          </h1>
          <h1 className="text-xl font-semibold text-red-500">
            Discount: LKR {(labeledTotal - total).toFixed(2)}
          </h1>
          <h1 className="text-2xl font-bold text-gray-800">
            Grand Total: LKR {total.toFixed(2)}
          </h1>
        </div>

        <button
          className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 font-semibold"
          onClick={createOrder}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
