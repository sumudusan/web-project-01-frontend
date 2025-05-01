import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState(""); 
    const [imageFiles, setImageFiles] = useState([]); 
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()

   async function handleSubmit(){

        const altNames = alternativeNames.split(",")

        const promisesArray = []

        for(let i=0; i<imageFiles.length; i++){
            promisesArray[i] = uploadMediaToSupabase
            (imageFiles[i])
        }

        const imgUrls = await Promise.all(promisesArray)

        const product = {
            productId : productId,
            productName : productName,
            altNames : altNames,
            Images : imgUrls,
            price : price,
            lastPrice : lastPrice,
            stock : stock,
            description : description
    }

    const token = localStorage.getItem("token")

   try{
    const response = await axios.post("http://localhost:5000/api/products" ,product ,{
        headers : {
          Authorization: `Bearer ${token}`
        }
    })
    navigate("/admin/products")
    console.log(response.data);
    toast.success("product added successfuly")
   }catch(err){
    console.log(err)
    toast.error("Failed to add product")
   }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 py-8">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px] max-h-[90vh] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">Add Product</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Product ID</label>
                        <input 
                            type="text" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Product Name</label>
                        <input 
                            type="text" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Alternative Names</label>
                        <input 
                            type="text" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={alternativeNames}
                            onChange={(e) => setAlternativeNames(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Image URLs</label>
                        <input 
                            type="file" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            
                            onChange={(e) => {
                                setImageFiles(e.target.files)
                            }}
                            multiple //'multiple' uses for select multiple files.
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Price</label>
                        <input 
                            type="number" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Last Price</label>
                        <input 
                            type="number" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Stock</label>
                        <input 
                            type="number" 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Description</label>
                        <textarea 
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
                    onClick={handleSubmit}
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}
