import {useState} from 'react'
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import uploadMediaToSupabase from '../../utils/mediaUpload';


export default function AddProductsForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()

   async function handleSubmit (){

    //imageUrls and alternativeNames display as a string.althouth we should stop 
    //it from this. 
    const altNames = alternativeNames.split(",")
    
    const promisesArray= []

    for(let i=0; i<imageFiles.length; i++){
      promisesArray[i] = uploadMediaToSupabase
      (imageFiles[i])
    }

  const imgUrls = await Promise.all(promisesArray);
      console.log(imgUrls)
   
     
  
     const product = {
      productId : productId,
      productName : productName,
      altNames : altNames,
      images : imgUrls,
      price : price,
      lastPrice : lastPrice,
      stock : stock,
      description : description,
     }

     const token = localStorage.getItem("token")

     try{
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products", product,{
      headers : {
        Authorization : "Bearer " + token
      }
     })
     navigate("/admin/products")
     toast.success("Product created successfully")
     }catch(err){
      toast.error("Failed to add product")
     }
  }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Product Form</h1>
          <div className="space-y-4">
            {/* Product ID */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Product ID</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e)=>{setProductId(e.target.value)}}
             />
            </div>
  
            {/* Product Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Product Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e)=>{setProductName(e.target.value)}}
              />
            </div>
  
            {/* Alternative Names */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Alternative Names</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Alternative Names"
                value={alternativeNames}
                onChange={(e)=>{setAlternativeNames(e.target.value)}}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Image URLs</label>
              <input
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="image URLs (comma-separated)"
                
                onChange={(e)=>{setImageFiles(e.target.files)}}
                multiple
              />
            </div>
  
            {/* Price */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Price</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Price"
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}
              />
            </div>
  
            {/* Last Price */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Last Price</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Last Price"
                value={lastPrice}
                onChange={(e)=>{setLastPrice(e.target.value)}}
              />
            </div>
  
            {/* Stock */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Stock Quantity"
                value={stock}
                onChange={(e)=>{setStock(e.target.value)}}
              />
            </div>
  
            {/* Description */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter Product Description"
                rows="4"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
              ></textarea>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  }
