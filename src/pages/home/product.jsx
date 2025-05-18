/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Productcard from "../../Components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoadingStatus("loading");
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
        setLoadingStatus("error");
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    setLoadingStatus("loading");

    const url =
      q.trim() === ""
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/search/${q}`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading products");
        setLoadingStatus("error");
      });
  };

  return (
    <div className="w-full min-h-screen pt-6 bg-background text-text">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[50%] p-2 rounded border border-primary bg-surface text-text focus:outline-none shadow-md"
          onChange={handleSearch}
          value={query}
        />
      </div>

      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="w-16 h-16 border-4 border-b-primary border-surface rounded-full animate-spin" />
        </div>
      )}

      {/* Product Cards */}
      {loadingStatus === "loaded" && (
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {products.map((product) => (
            <Productcard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* Error State */}
      {loadingStatus === "error" && (
        <div className="text-center text-red-400 font-bold mt-10">
          Error loading products.
        </div>
      )}
    </div>
  );
}