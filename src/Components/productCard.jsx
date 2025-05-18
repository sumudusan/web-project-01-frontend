import { Link } from "react-router-dom"; // Fix import
export default function Productcard({ product }) {
  if (!product) return null;

  return (
    <Link to={`/productInfo/${product.productId}`}>
      <div className="w-[225px] h-[400px] bg-surface rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 border border-primary">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name || "Product Image"}
          className="w-full h-[70%] object-cover"
        />
        <div className="h-[30%] px-4 py-2 flex flex-col justify-between text-text">
          <h1 className="text-xl px-4 font-bold text-center text-heading ">{product.productName}</h1>
          {/*<h2 className="text-sm text-center text-accent">{product.productId}</h2>*/}
          {typeof product.lastPrice === "number" ? (
            <p className="text-xl font-semibold text-primary text-center">
              LKR {product.lastPrice.toFixed(2)}
            </p>
          ) : (
            <p className="text-xl text-red-500 text-center">Price not available</p>
          )}
          {product.price > product.lastPrice && (
            <p className="text-sm line-through text-gray-400 text-center">
              LKR {product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
