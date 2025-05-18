import { useEffect, useState } from "react";
import axios from "axios";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard({ productId, qty }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
        .then((response) => {
          if (response.data) {
            setProduct(response.data);
            setLoaded(true);
          } else {
            deleteItem(productId); // Remove invalid product
          }
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }
  }, [productId, loaded]);

  if (!product) return null;

  return (
    <tr className="hover:bg-accent transition duration-200 text-text">
      <td className="p-2 text-center">
        <img
          src={product.images?.[0]}
          alt={product.productName}
          className="w-[90px] h-auto object-cover mx-auto rounded"
        />
      </td>
      <td className="p-2 text-center">{product.productName}</td>
      <td className="p-2 text-center">{productId}</td>
      <td className="p-2 text-center">{qty}</td>
      <td className="p-2 text-center">LKR {product.lastPrice.toFixed(2)}</td>
      <td className="p-2 text-center">LKR {(product.lastPrice * qty).toFixed(2)}</td>
    </tr>
  );
}
