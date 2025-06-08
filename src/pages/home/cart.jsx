import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../../Components/cartCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // 👈 New
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasTried, setHasTried] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Update totals whenever selectedItems changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      axios
        .post(
          "http://localhost:5000/api/orders/quote",
          { orderedItems: selectedItems },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        });
    } else {
      setTotal(0);
      setLabeledTotal(0);
    }
  }, [selectedItems]);

  useEffect(() => {
    if (!token) {
      if (!hasTried) {
        setTimeout(() => setHasTried(true), 300);
      } else {
        navigate("/login", { state: { from: "/cart" } });
      }
      return;
    }

    axios
      .get("http://localhost:5000/api/orders/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Cart fetch error:", err);
        }
      })
      .finally(() => setLoading(false));
  }, [hasTried, navigate]);

  function handleSelect(productId) {
    const item = cart.find((item) => item.productId === productId);
    const alreadySelected = selectedItems.find((i) => i.productId === productId);

    if (alreadySelected) {
      setSelectedItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  }

  function handleDeleteFromCart(productId) {
    axios
      .delete(`http://localhost:5000/api/orders/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        setSelectedItems((prev) => prev.filter((item) => item.productId !== productId));
      });
  }

  function onOrderCheckoutClick() {
    if (selectedItems.length === 0) {
      alert("Please select items to checkout.");
      return;
    }

    navigate("/shipping", {
      state: { items: selectedItems },
    });
  }

  if (loading) return <div className="text-center py-8 text-heading">Loading cart...</div>;

  return (
    <div className="flex flex-col items-end w-full h-full overflow-y-auto bg-background px-4 py-6 text-text">
      <table className="w-full border border-accent text-left bg-surface rounded shadow">
        <thead className="bg-primary text-background">
          <tr>
            <th className="p-2">Select</th>
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
            <tr key={item.productId}>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={!!selectedItems.find((i) => i.productId === item.productId)}
                  onChange={() => handleSelect(item.productId)}
                />
              </td>
              <CartCard
                productId={item.productId}
                qty={item.qty}
                onDelete={handleDeleteFromCart}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItems.length > 0 && (
        <div className="w-full mt-4 text-right space-y-2">
          <h1 className="text-xl font-semibold text-heading">Total: LKR {labeledTotal.toFixed(2)}</h1>
          <h1 className="text-xl font-semibold text-red-600">
            Discount: LKR {(labeledTotal - total).toFixed(2)}
          </h1>
          <h1 className="text-2xl font-bold text-heading">Grand Total: LKR {total.toFixed(2)}</h1>

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
