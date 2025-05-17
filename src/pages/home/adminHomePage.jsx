import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { BsBoxSeam, BsCart4, BsGraphUp, BsPerson } from "react-icons/bs"
import AddProductForm from "../admin/addProductForm"
import AdminProductsPage from "../admin/adminProductsPage"
import EditProductsForm from "../admin/editProductForm"
import AdminOrdersPage from "../admin/adminOrderPage"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function AdminHomePage(){

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
            return;          
        }
        axios.get("http://localhost:5000/api/users",{
            headers:{
                Authorization : `Bearer ${token}`,
            },
        }).then((res)=>{
            console.log(res.data)
            if(res.data.type!="admin"){
                toast.error("Unauthorized access")
                navigate("/login")
            }else{
                setUser(res.data)
            }
        }).catch((err)=>{
            console.error(err)
            toast.error("Faild to fetch user data")
            navigate("/login")
        })
    },[])

    return(
        <div className="bg-blue-200 w-full h-screen flex">
            <div className="bg-blue-500 w-[20%] h-screen flex flex-col items-center py-4">
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/dashboard"><BsGraphUp className="mr-2"/> Dashboard</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/products"><BsBoxSeam className="mr-2"/> Products</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/orders"><BsCart4 className="mr-2"/> Orders</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/customers"><BsPerson className="mr-2"/> Customers</Link>
            </div>
            
            <div className="bg-white w-[80%] h-screen">
              {user!=null && <Routes>
               <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
               <Route path="/products" element={<AdminProductsPage/>}/>
               <Route path="/products/addProduct" element={<AddProductForm/>}/>
               <Route path="/products/editProduct" element={<EditProductsForm/>}/>
               <Route path="/customers" element={<h1>Customers</h1>}/>
               <Route path="/orders" element={<AdminOrdersPage/>}/>
               <Route path="/*" element={<h1>404 not found the admin page</h1>}/>
              </Routes>}
              {
                user==null && 
                <div className="w-full h-full flex justify-center items-center">
                    {/* animating loading page*/ }
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400">

                    </div>
                </div>
              }    
            </div>
        </div>
    )
}