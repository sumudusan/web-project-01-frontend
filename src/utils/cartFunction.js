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
    }
    saveCart(cart);
    console.log("Updated cart:", cart);
  }

  export function saveCart(cart){
    //stringify uses for convert string to json or convert json to string
    localStorage.setItem("cart", JSON.stringify(cart))
  }
   
  export function deleteItem(productId){
    const cart =loadCart()

    const index = cart.findIndex(
      (item)=>{
        return item.productId==productId
      }
    )

    if(index!=-1){
      cart.splice(index,1)
    }
  }