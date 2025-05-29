import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddProductsForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const altNames = alternativeNames.split(",");
    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    const product = {
      productId,
      productName,
      altNames,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/admin/products");
      toast.success("Product created successfully");
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-2xl bg-surface shadow-xl rounded-2xl p-8 border border-primary">
        <h1 className="text-3xl font-bold text-heading mb-6 text-center">
          Add Product
        </h1>

        <div className="space-y-5">
          {/* Product ID */}
          <div>
            <label className="block text-text font-medium mb-1">
              Product ID
            </label>
            <input
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-text font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Alternative Names */}
          <div>
            <label className="block text-text font-medium mb-1">
              Alternative Names
            </label>
            <input
              type="text"
              placeholder="Enter Alternative Names (comma-separated)"
              value={alternativeNames}
              onChange={(e) => setAlternativeNames(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Image Files */}
          <div>
            <label className="block text-text font-medium mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none bg-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-text font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Last Price */}
          <div>
            <label className="block text-text font-medium mb-1">
              Last Price
            </label>
            <input
              type="number"
              placeholder="Enter Last Price"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-text font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Enter Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-text font-medium mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-accent focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-accent transition duration-300"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
