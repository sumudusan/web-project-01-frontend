import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Header from "../../Components/header";
import LoginPage from "./loginPage";
import ProductOverview from "./productOverview";
import ProductPage from "./product";
import Cart from "./cart";
import ShippingPage from "./shipping";
import MyOrdersPage from "./orders";
import Home from "./home";
import AboutUs from "./aboutUs";
import Footer from "../../Components/footer";
import ContactUs from "./contact";

export default function HomePage() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false); // Hide header
      } else {
        setShowHeader(true); // Show header
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="w-full bg-background text-text">
      {/* Header with hide/show effect */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
      </div>

      {/* Push content below the fixed header */}
      <div className="pt-[68px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productinfo/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="contact" element={<ContactUs/>}/>
        </Routes>
      </div>
      <div className="">
        <Footer/>
      </div>
      
    </div>
  );
}
