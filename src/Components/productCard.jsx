import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Productcard(props) {
  const product = props.product;

  return (
    <Link to={`/productInfo/${product.productId}`}>
      <div className="w-[300px] h-[450px] bg-white m-4 rounded-xl shadow-lg shadow-gray-500 hover:shadow-gray-300 hover:border-[3px] overflow-hidden flex flex-col">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name || "Product Image"}
          className="object-cover w-full h-[60%]"
        />
        <div className="max-h-[40%] h-[35%] p-4 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-center">{product.productName}</h1>
          <h2 className="text-center text-gray-400">{product.productId}</h2>

          {typeof product.lastPrice === "number" ? (
            <p className="text-xl font-semibold text-left">
              LKR.{product.lastPrice.toFixed(2)}
            </p>
          ) : (
            <p className="text-xl text-red-500 text-left">Price not available</p>
          )}

          {typeof product.price === "number" &&
            typeof product.lastPrice === "number" &&
            product.lastPrice < product.price && (
              <p className="text-xl font-semibold text-left text-gray-500 line-through">
                LKR.{product.price.toFixed(2)}
              </p>
            )}
        </div>
      </div>
    </Link>
  );
}
