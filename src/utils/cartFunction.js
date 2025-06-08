import axios from "axios";

// Add item to cart
export async function addToCart(productId, qty = 1) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  if (!Number.isFinite(qty)) {
    console.error("Invalid quantity:", qty);
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/orders/cart/save",
      {
        cartItems: [{ productId, qty }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product added to cart:", response.data);
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
}

// Delete item from cart
export async function deleteItem(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/orders/cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Deleted item from cart:", response.data);
  } catch (error) {
    console.error("Failed to delete item from cart:", error);
  }
}
