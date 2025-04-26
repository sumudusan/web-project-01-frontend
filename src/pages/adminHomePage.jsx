import { Link, Route, Routes } from "react-router"
import { BsBoxSeam, BsCart4, BsGraphUp, BsPerson } from "react-icons/bs"
import AdminProductsPage from "./admin/adminProductsPage"
import AddProductForm from "./admin/addProductForm"

export default function AdminHomePage(){

    return(
        <div className="bg-blue-200 w-full h-screen flex">
            <div className="bg-blue-500 w-[20%] h-screen flex flex-col items-center py-4">
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/dashboard"><BsGraphUp className="mr-2"/> Dashboard</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/products"><BsBoxSeam className="mr-2"/> Products</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/orders"><BsCart4 className="mr-2"/> Orders</Link>
                <Link className="flex flex-row mb-4 text-white items-center" to ="/admin/customers"><BsPerson className="mr-2"/> Customers</Link>
            </div>
            
            <div className="bg-red-600 w-[80%] h-screen">
              <Routes path="/*">
               <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
               <Route path="/products" element={<AdminProductsPage/>}/>
               <Route path="/products/addProduct" element={<AddProductForm/>}/>
               <Route path="/orders" element={<h1>Orders</h1>}/>
               <Route path="/customers" element={<h1>Customers</h1>}/>
               <Route path="/*" element={<h1>404 not found the admin page</h1>}/>
              </Routes>    
            </div>
        </div>
    )
}