import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../Components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedCart = loadCart();
    setCart(loadedCart);

    if (loadedCart.length > 0) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, {
          orderedItems: loadedCart,
        })
        .then((res) => {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        })
  function handleDeleteFromCart(productId) {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/orders/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
      });
  }

  function onOrderCheckoutClick() {
    navigate("/shipping", {
      state: { items: cart },
    });
  }

  return (
    <div className="flex flex-col items-end w-full h-full overflow-y-auto bg-background px-4 py-6 text-text">
      <table className="w-full border border-accent text-left bg-surface rounded shadow">
        <thead className="bg-primary text-background">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Product ID</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <CartCard
              key={item.productId}
              productId={item.productId}
              qty={item.qty}
              onDelete={handleDeleteFromCart}
            />
          ))}
        </tbody>
      </table>

      {typeof labeledTotal === "number" && typeof total === "number" && cart.length > 0 && (
        <div className="w-full mt-4 text-right space-y-2">
          <h1 className="text-xl font-semibold text-heading">
            Total: LKR {labeledTotal.toFixed(2)}
          </h1>
          <h1 className="text-xl font-semibold text-red-600">
            Discount: LKR {(labeledTotal - total).toFixed(2)}
          </h1>
          <h1 className="text-2xl font-bold text-heading">
            Grand Total: LKR {total.toFixed(2)}
          </h1>

          <button
            onClick={onOrderCheckoutClick}
            className="bg-primary hover:bg-accent text-background font-semibold py-2 px-6 rounded-lg mt-3 transition duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
