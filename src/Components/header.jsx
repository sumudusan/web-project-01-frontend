import { Link } from "react-router";

export default function Header(){
    return(
        <header className=" w-full h-[100px] bg-white relative flex justify-center items-center">
            <img src="/logo.png" className="h-full rounded-full cursor-pointer absolute left-[10px]"/>
            <div className="h-full flex items-center w-[600px] justify-between">
            <Link to="/" className="font-bold text-xl hover:border-b-2 border-b-amber-400 ">Home</Link>
            <Link to="/products" className="font-bold text-xl hover:border-b-2 border-b-amber-400 ">Products</Link>
            <Link to="/cart" className="font-bold text-xl hover:border-b-2 border-b-amber-400 ">Cart</Link>
            <Link to="/about" className="font-bold text-xl hover:border-b-2 border-b-amber-400 ">About Us</Link>
            <Link to="/contact" className="font-bold text-xl hover:border-b-2 border-b-amber-400 ">Contact Us</Link>
            </div>
        </header>
    )
}