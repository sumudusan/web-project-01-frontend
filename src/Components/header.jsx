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
          <Link to="/">
          <h1 className="text-heading font-extrabold text-xl font-serif">crystal clear</h1>
          <span className="font-extrabold font-serif">beauty products</span>
          </Link>
        </div>

        <div className="hidden lg:flex gap-6 justify-center px-30 font-bold">
          <NavLink to="/" className="hover:border-b-2 border-b-primary">Home</NavLink>
          <NavLink to="/products" className="hover:border-b-2 border-b-primary">Products</NavLink>
          <NavLink to="/about" className="hover:border-b-2 border-b-primary">About Us</NavLink>
          <NavLink to="/contact" className="hover:border-b-2 border-b-primary">Contact Us</NavLink>
          <NavLink to="/cart" className="hover:border-b-2 border-b-primary">Cart</NavLink>
        </div>

        <div className="hidden lg:block pl-38">
          <Link to="/login">
            <button className="px-6 py-2 font-semibold bg-primary text-white rounded-lg shadow hover:bg-accent transition">
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
