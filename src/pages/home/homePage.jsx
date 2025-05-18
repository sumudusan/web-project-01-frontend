import React from "react";
import { Route, Routes } from "react-router";
import Header from "../../Components/header";
import LoginPage from "./loginPage";
import ProductOverview from "./productOverview";
import ProductPage from "./product";
import Cart from "./cart";
import ShippingPage from "./shipping";
import MyOrdersPage from "./orders";

export default function HomePage(){
    return(
        <div className="h-screen w-full bg-background text-text">
            <Header/>
         <div className="w-full h-full pt-16 px-4">
             <Routes path="/*">
            <Route path="/" element={ <h1
                className="text-5xl font-bold text-center mb-8 text-heading">
                Welcome to Our Natural Skin Store
              </h1>}/>
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/productinfo/:id" element={<ProductOverview/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/shipping" element={<ShippingPage/>}/>
            <Route path="/orders" element={<MyOrdersPage/>}/>
            </Routes>
         </div>
            
        </div>
    )
}