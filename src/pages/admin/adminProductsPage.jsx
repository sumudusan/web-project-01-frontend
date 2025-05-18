import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [productLoaded , setproductLoaded] = useState (false)

  useEffect(() => {

    if(!productLoaded){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res) => {
          setProducts(res.data.products);
          console.log(res.data);
          setproductLoaded(true)
        });
    } 
  }, [productLoaded]);

  const navigate = useNavigate()
  

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <Link to = "/admin/products/addProduct" className="absolute right-[25px] bottom-[25px]
    text-[25px] bg-blue-500 hover:bg-blue-300 p-5 rounded-xl" ><FaPlus/></Link>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Products</h2>
      {//this is make for show the page is loading or not. 
      //we use the 'productLoaded' useState for it.
      //if 'div 1' has loaded show it.else show 'div 2 '.
        productLoaded?
        //div 1 👇 
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
                    
                    <button className="hover:text-red-600"
                    title="Delete"
                    onClick={()=>{alert(product.productId)
                      const token = localStorage.getItem
                      ("token");

                      axios.delete(import.meta.env.VITE_BACKEND_URL+`/api/products/${product.productId}`,{
                        headers : {
                          Authorization : `Bearer ${token}`,
                        },
                      }).then((res)=>{
                        console.log(res.data);
                        toast.success("Product deleted successfully");
                        setproductLoaded(false)
                      });
                    }}
                    >
                      <FaTrash />
                    </button>
                    <button className="hover:text-blue-600"
                    title="Edit"
                    onClick={()=>{
                      navigate("/admin/products/editProduct", {state: {product : product}});
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
        </div>:
        //div 2 👇
        <div className="w-full h-full flex justify-center items-center">
           <div className="w-[60px] h-[60px] border-[2px] border-gray-200 border-b-blue-400 animate-spin rounded-full"></div>
        </div>
        
    }
    </div>
  );
}
