/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function NavSlider({ closeSlider }) {
  return (
    <div className="fixed w-full h-screen bg-[#00000080] z-[10] lg:hidden">
      <div className="bg-surface flex flex-col w-[300px] h-screen shadow-lg">
        <div className="bg-surface w-full h-[100px] relative flex justify-center items-center border-b border-primary">
          <img
            src="/logo.png"
            className="cursor-pointer h-full rounded-full absolute left-[10px]"
          />
          <IoMdClose
            onClick={closeSlider}
            className="text-3xl absolute cursor-pointer text-primary right-[10px] lg:hidden"
          />
        </div>

        {["/", "/products", "/about", "/contact", "/cart"].map((path, i) => (
          <Link
            key={path}
            to={path}
            className="text-xl font-bold text-primary hover:border-b border-b-primary px-4 py-3 transition"
          >
            {["Home", "Products", "About Us", "Contact Us", "Cart"][i]}
          </Link>
        ))}
      </div>
    </div>
  );
}
