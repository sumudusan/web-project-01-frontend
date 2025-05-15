import { Route, Routes } from "react-router";
import Header from "../../Components/header";
import LoginPage from "./loginPage";
import ProductOverview from "./productOverview";
import ProductPage from "./product";
import Cart from "./cart";

export default function HomePage(){
    return(
        <div className="h-screen w-full bg-orange-50">
            <Header/>
         <div className="w-full h-[calc(100vh-100px)] bg-red-500">
             <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>}/>
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/productinfo/:id" element={<ProductOverview/>}/>
            <Route path="/cart" element={<Cart/>}/>
            </Routes>
         </div>
            
        </div>
    )
}