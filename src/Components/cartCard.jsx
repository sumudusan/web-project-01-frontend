import { useEffect, useState } from "react";
import axios from "axios";
import { deleteItem } from "../utils/cartFunction";
import { FaTrash } from "react-icons/fa";

export default function CartCard({ productId, qty, onDelete }) {
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
            deleteItem(productId).then(() => {
              onDelete?.(productId);
            });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }
  }, [productId, loaded, onDelete]);

  if (!product) return (
    <>
      <td colSpan="6" className="text-center text-gray-500 py-4">Loading product...</td>
    </>
  );

  return (
    <>
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
      <td className="p-2 text-center">
        LKR {(product.lastPrice * qty).toFixed(2)}
      </td>
      <td className="p-2 text-center">
        <button
          onClick={() => onDelete?.(productId)}
          className="text-red-600 hover:text-red-800 transition"
          title="Remove from cart"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </td>
    </>
  );
}
