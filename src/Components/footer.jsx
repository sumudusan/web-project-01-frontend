import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FooterLogo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-surface text-text px-6 sm:px-12 lg:px-20 pt-10 pb-6">
      <div className="grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={FooterLogo} alt="Logo" className="h-14 w-14 rounded-full object-cover" />
            <h2 className="text-1xl font-bold text-heading">Crystal Clear Beauty Products</h2>
          </div>
          <p className="text-sm">
            Trusted destination for luxurious, skin-loving beauty products. We’re always here to help you on your beauty journey.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-heading">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary transition">Products</Link></li>
            <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-heading">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-lg text-accent mt-1" />
              <span>Noida, Uttar Pradesh</span>
            </div>
            <div className="flex items-start gap-2">
              <FaPhoneAlt className="text-lg text-accent mt-1" />
              <span>+91 123456789</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-heading">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="bg-primary p-2 rounded-full hover:bg-accent transition">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="bg-primary p-2 rounded-full hover:bg-accent transition">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="bg-primary p-2 rounded-full hover:bg-accent transition">
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-background pt-4 text-center text-sm text-text">
        © 2025 CrystalClearBeautyProducts. All rights reserved. Made with ❤️ by SS.
      </div>
    </footer>
  );
};

export default Footer;
