export function loadCart() {
    const cart = localStorage.getItem("cart");
    console.log(localStorage.getItem("cart"));
  
    if (cart != null) {
      return JSON.parse(cart);
    } else {
      return [];
    }
  }
  
  export function addToCart(productId, qty = 1) {
    if (!Number.isFinite(qty)) {
      console.error("Invalid quantity:", qty);
      return;
    }
  
    console.log("Adding to cart:", { productId, qty });
    const cart = loadCart();
    console.log("Current cart:", cart);
  
    const index = cart.findIndex((item) => {
      return item.productId == productId;
    });
    console.log(index);
    if (index == -1) {//if there is not added product in previouse to cart add it.
      cart.push({ productId, qty });
    } else {
      const newQty = cart[index].qty + qty;
      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].qty = newQty;
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