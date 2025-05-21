import React, {  useState } from "react";
import logo from "../assets/logo.jpg"
import { NavLink, Link } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return (
    <>
      {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}

      <header className="bg-surface border-b border-primary w-full h-[70px] flex items-center px-4 shadow-md">
        <img
          src={logo}
          alt="Logo"
          className="h-[90%] rounded-full cursor-pointer"
        />

        <div className="pl-2">
          <h1 className="text-heading font-extrabold text-xl font-serif">crystal clear</h1>
          <span className="font-extrabold font-serif">beauty products</span>
        </div>

        <div className="hidden lg:flex gap-6 justify-center px-17">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </div>

        <div className="hidden lg:block pl-39">
          <Link to="/login">
            <button className="px-6 py-2 font-semibold bg-accent text-white rounded-lg shadow hover:bg-[#d88c8c] transition">
              Login
            </button>
          </Link>
        </div>

        <RxHamburgerMenu
          onClick={() => setIsSliderOpen(true)}
          className="text-3xl text-primary cursor-pointer lg:hidden"
        />
      </header>
    </>
  );
}
