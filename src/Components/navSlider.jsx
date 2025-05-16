/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";


export default function NavSlider(props) {
    const closeSlider = props.closeSlider;
  return (
    <div className="fixed w-full h-screen bg-[#00000080] z-[10] border-[3px] border-red-900 lg:hidden">
      <div className="bg-white flex flex-col  w-[300px] h-screen">
        <div className="bg-white w-full h-[100px] relative flex justify-center items-center">
          <img
            src="/logo.png"
            className="cursor-pointer h-full rounded-full absolute left-[10px]"
          />
          <IoMdClose
            onClick={closeSlider}
            className="text-3xl absolute cursor-pointer text-amber-400 right-[10px] lg:hidden"
          />
        </div>
        <Link
          to="/"
          className="text-xl font-bold text-amber-400 hover:border-b border-b-amber-400"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-xl font-bold text-amber-400 hover:border-b border-b-amber-400"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-xl font-bold text-amber-400 hover:border-b border-b-amber-400"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-xl font-bold text-amber-400 hover:border-b border-b-amber-400"
        >
          Contact Us
        </Link>

        <Link
          to="/cart"
          className="text-xl font-bold text-amber-400 hover:border-b border-b-amber-400"
        >
          Cart
        </Link>
      </div>
    </div>
  );
}