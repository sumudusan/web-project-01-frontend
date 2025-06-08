import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../../Components/cartCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasTried, setHasTried] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      .then((res) => {
        const savedCart = res.data;
        setCart(savedCart);

        if (savedCart.length > 0) {
          axios
            .post(
              "http://localhost:5000/api/orders/quote",
              { orderedItems: savedCart },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              setTotal(res.data.total);
              setLabeledTotal(res.data.labeledTotal);
            });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Cart fetch error:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hasTried, navigate]);

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
  const token = localStorage.getItem("token");

  // Clear cart in backend
  axios.post(
    "http://localhost:5000/api/orders/cart/save",
    { cartItems: [] },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  .then(() => {
    // Clear frontend cart state
    setCart([]);
    setTotal(0);
    setLabeledTotal(0);
    console.log("cle")
    // Navigate to shipping
    navigate("/shipping", {
      state: { items: cart },
    });
  })
  .catch((err) => {
    console.error("Failed to clear cart:", err);
    // Proceed anyway if needed
    navigate("/shipping", {
      state: { items: cart },
    });
  });
}


  if (loading) return <div className="text-center py-8 text-heading">Loading cart...</div>;

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

      {cart.length > 0 && (
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
