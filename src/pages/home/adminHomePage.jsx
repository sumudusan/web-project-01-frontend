import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { BsBoxSeam, BsCart4, BsGraphUp, BsPerson } from "react-icons/bs"
import AddProductForm from "../admin/addProductForm"
import AdminProductsPage from "../admin/adminProductsPage"
import EditProductsForm from "../admin/editProductForm"
import AdminOrdersPage from "../admin/adminOrderPage"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { AdminCustomerPage } from "../admin/admincustomerpage"

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


  return (
    <div className="bg-background w-full h-screen flex">
      {/* Sidebar */}
      <div className="bg-primary w-[20%] h-screen flex flex-col items-center py-6 shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-8">Admin Panel</h2>
        <Link
          className="flex flex-row items-center text-white mb-5 hover:text-accent transition"
          to="/admin/dashboard"
        >
          <BsGraphUp className="mr-2" />
          Dashboard
        </Link>
        <Link
          className="flex flex-row items-center text-white mb-5 hover:text-accent transition"
          to="/admin/products"
        >
          <BsBoxSeam className="mr-2" />
          Products
        </Link>
        <Link
          className="flex flex-row items-center text-white mb-5 hover:text-accent transition"
          to="/admin/orders"
        >
          <BsCart4 className="mr-2" />
          Orders
        </Link>
        <Link
          className="flex flex-row items-center text-white mb-5 hover:text-accent transition"
          to="/admin/customers"
        >
          <BsPerson className="mr-2" />
          Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-surface w-[80%] h-screen p-6 overflow-y-auto">
        {user != null ? (
          <Routes>
            <Route path="/dashboard" element={<h1 className="text-heading text-2xl font-semibold">Dashboard</h1>} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/products/addProduct" element={<AddProductForm />} />
            <Route path="/products/editProduct" element={<EditProductsForm />} />
            <Route path="/customers" element={<AdminCustomerPage/>} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/*" element={<h1 className="text-red-600 text-xl font-semibold">404 — Page Not Found</h1>} />
          </Routes>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

