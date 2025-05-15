import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
// import ImageSlider from "../components/imageSlider";

import toast from "react-hot-toast";
import { addToCart } from "../../utils/cartFunction";
import ImageSlider from "../../Components/imageSlider";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);

        if (res.data == null) {
          setStatus("not-found");
        }

        if (res.data != null) {
          setProduct(res.data);
          setStatus("found");
        }
      });
  }, []);

  function onAddToCartClick(){
    addToCart(product.productId)
    toast.success(product.productId+" Added to Cart")
  }



  return (
    <div className="w-full h-[calc(100vh-100px)] bg-white ">
      {status == "loading" && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-[#b88c44] border-b-4"></div>
        </div>
      )}
      {status == "not-found" && <ProductNotFound />}
      {status == "found" && (
        <div className="flex flex-col items-center justify-center w-full h-full md:flex-row lg:flex-row ">
          <h1 className="text-3xl font-bold text-gray-800 lg:hidden md:hidden">{product.productName}</h1>
          <p className="text-xl text-gray-600 lg:hidden">
              {product.price > product.lastPrice && (
                <span className="text-red-600 line-through">
                  LKR.{product.price}
                </span>
              )}
              <span>{"LKR" + product.lastPrice}</span>
            </p>
         <div className="w-full lg:w-[35%] border-2 border-gray-200 rounded-lg shadow-md p-2 bg-white">
         <ImageSlider images={product.images} />
         </div>


          <div className="h-full p-4 lg:w-[65%]">
            <h1 className="hidden text-3xl font-bold text-gray-800 lg:block md:block">
              {product.productName}
            </h1>
            <h1 className="text-3xl font-bold text-gray-500">
              {product.altNames.join(" | ")}
            </h1>
            <p className="hidden text-xl text-gray-600 lg:block">
              {product.price > product.lastPrice && (
                <span className="text-red-600 line-through">
                  LKR.{product.price}
                </span>
              )}
              <span>{"LKR." + product.lastPrice}</span>
            </p>
            <p className="text-lg text-gray-600 line-clamp-3">
              {product.description}
            </p>
            <button onClick={onAddToCartClick} className="p-2 text-white rounded-lg bg-accent hover:cursor-pointer bg-amber-500">Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
}