import React from "react";
import { Route, Routes } from "react-router";
import Header from "../../Components/header";
import LoginPage from "./loginPage";
import ProductOverview from "./productOverview";
import ProductPage from "./product";
import Cart from "./cart";
import ShippingPage from "./shipping";
import MyOrdersPage from "./orders";
import banner from "../../assets/banner.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background text-text">
      <Header />

      <div className="w-full pt-16 px-4">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <img
                  src={banner}
                  alt="Banner"
                  className="w-full max-h-[500px] object-cover rounded-lg mb-8"
                />
                
              </div>
            }
          />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productinfo/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
        </Routes>
      </div>
    </div>
  );
}
