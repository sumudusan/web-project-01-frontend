import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    {
      productId: "BEA1001",
      productName: "Glow & Shine Face Serum",
      altNames: ["Brightening Serum", "Vitamin C Serum", "Skin Glow Booster"],
      images: [
        "https://example.com/images/serum1.jpg",
        "https://example.com/images/serum2.jpg",
      ],
      price: 1299,
      lastPrice: 999,
      stock: 150,
      description:
        "A lightweight, fast-absorbing serum infused with Vitamin C and Hyaluronic Acid that helps brighten skin tone, reduce dark spots, and deeply hydrate for a radiant glow.",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <Link to = "/admin/products/addProduct" className="absolute right-[25px] bottom-[25px]
    text-[25px] bg-blue-500 hover:bg-blue-300 p-5 rounded-xl" ><FaPlus/></Link>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Products</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Product ID</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Last Price</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 border-b">{product.productId}</td>
                <td className="py-3 px-4 border-b">{product.productName}</td>
                <td className="py-3 px-4 border-b">Rs. {product.price}</td>
                <td className="py-3 px-4 border-b line-through text-gray-500">Rs. {product.lastPrice}</td>
                <td className="py-3 px-4 border-b">{product.stock}</td>
                <td className="py-3 px-4 border-b max-w-xs truncate">{product.description}</td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="flex justify-center gap-3 text-lg text-gray-600">
                    <button className="hover:text-red-600">
                      <FaTrash />
                    </button>
                    <button className="hover:text-blue-600">
                      <FaPencil />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
