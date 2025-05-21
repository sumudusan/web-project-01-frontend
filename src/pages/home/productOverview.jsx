import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ProductNotFound from "./productNotFound";
import ImageSlider from "../../Components/imageSlider";
import { addToCart } from "../../utils/cartFunction";

export default function ProductOverview() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setStatus("not-found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((res) => {
        if (!res.data) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setStatus("not-found");
      });
  }, [productId]);

  const onAddToCartClick = () => {
    if (product?.productId) {
      addToCart(product.productId);
      toast.success(`"${product.productName}" added to cart.`);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#fff7ed] p-4 pt-6">
      {status === "loading" && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-400 border-b-amber-500"></div>
        </div>
      )}

      {status === "not-found" && <ProductNotFound />}

      {status === "found" && product && (
        <div className="flex flex-col-reverse gap-6 items-center justify-center w-full md:flex-row lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-[30%] p-2">
            <ImageSlider images={product.images} />
          </div>

          {/* Product Info Section */}
          <div className="lg:w-[60%] flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg border">
            <h1 className="text-3xl font-bold text-[#be843d]">{product.productName}</h1>

            <h2 className="text-lg text-gray-500 font-medium">
              {product.altNames?.join(" | ")}
            </h2>

            <p className="text-xl text-gray-800">
              {product.price > product.lastPrice && (
                <span className="text-red-500 line-through mr-2">
                  LKR.{product.price}
                </span>
              )}
              <span className="text-[#926228] font-semibold">LKR.{product.lastPrice}</span>
            </p>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <button
              onClick={onAddToCartClick}
              className="px-6 py-2 rounded-md text-white bg-accent hover:bg-[#a86e2d] transition-all shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
