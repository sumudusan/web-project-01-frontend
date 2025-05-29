import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [productLoaded, setProductLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data.products);
          setProductLoaded(true);
        });
    }
  }, [productLoaded]);

  return (
    <div className="p-4 bg-background min-h-screen relative">
      {/* Floating Add Button */}
      <Link
        to="/admin/products/addProduct"
        className="fixed right-6 bottom-6 text-white bg-primary hover:bg-accent p-4 rounded-full shadow-lg transition"
        title="Add Product"
      >
        <FaPlus size={20} />
      </Link>

      <h2 className="text-3xl font-bold mb-6 text-heading text-center">Admin Products</h2>

      {productLoaded ? (
        // Product Table
        <div className="overflow-x-auto">
          <table className="min-w-full bg-surface border border-gray-300 shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Product ID</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Name</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Price</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Last Price</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Stock</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-text">Description</th>
                <th className="py-3 px-4 border-b text-center text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b text-text">{product.productId}</td>
                  <td className="py-3 px-4 border-b text-text">{product.productName}</td>
                  <td className="py-3 px-4 border-b text-text">Rs. {product.price}</td>
                  <td className="py-3 px-4 border-b text-gray-500 line-through">Rs. {product.lastPrice}</td>
                  <td className="py-3 px-4 border-b text-text">{product.stock}</td>
                  <td className="py-3 px-4 border-b max-w-xs truncate text-text">{product.description}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center gap-4 text-lg text-gray-600">
                      <button
                        className="hover:text-red-600"
                        title="Delete"
                        onClick={() => {
                          const confirmDelete = confirm(`Delete ${product.productName}?`);
                          if (!confirmDelete) return;

                          const token = localStorage.getItem("token");

                          axios
                            .delete(import.meta.env.VITE_BACKEND_URL + `/api/products/${product.productId}`, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                            .then((res) => {
                              toast.success("Product deleted successfully");
                              setProductLoaded(false);
                            })
                            .catch(() => {
                              toast.error("Failed to delete product");
                            });
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="hover:text-blue-600"
                        title="Edit"
                        onClick={() => {
                          navigate("/admin/products/editProduct", {
                            state: { product: product },
                          });
                        }}
                      >
                        <FaPencil />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Loading Spinner
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
        </div>
      )}
    </div>
  );
}
