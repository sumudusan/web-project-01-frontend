import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router";
import banner from "../../assets/banner.jpg";
import Productcard from "../../Components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/products/42.jpg"
import Testimonial from "../../Components/testimonial";

export default function Home(){

    const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

      const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
        console.log(err);
      });
  };

    return(
        <div>
            <div className="relative grid ">
        {/* Raw 1 */}
                {/* Banner image */}
                <img
                  src={banner}
                  alt="Banner"
                  style={{ height: 'calc(100vh - 68px)' }}
                  className="w-full object-cover rounded-lg"
                />
                
                {/* Centered button */}
                <div className="hidden lg:flex absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center">
                  <Link to="/products">
                    <button className="primary-btn flex items-center gap-2">
                      <span><IoBagHandleOutline/></span>
                      Shop Now
                    </button>
                  </Link>
                </div>

        {/* Raw 2 */}
                {/* show Products */}
                <div className="py-14 flex flex-col items-center text-center">
                  <h1 className="text-heading text-3xl font-bold mb-7">Trending Products</h1>
                  <div className="flex flex-wrap justify-center gap-4 px-4">
                    {products.map((product) => (
                      <Productcard key={product.productId} product={product} />
                    ))}
                  </div>
                  
                </div>

        {/* Raw 3 */}
                <div className="grid grid-cols-2 py-6">
                {/* Image 1 */}
                  <img
                   src={img1}
                   alt="Image1"
                   className="w-full h-full"
                  />

                {/* Text */}
                  <div className="flex flex-col items-center bg-amber-100 justify-center">
                  <h1 className="text-heading text-3xl font-semibold">Who We Are</h1>
                  <p className="px-12 py-4">
                    At Crystal Clear, we believe beauty begins with purity
                     and confidence. We are a passionate team dedicated to
                      offering premium beauty and skincare products that are 
                      carefully curated to nourish, enhance, and empower.
                  </p>
                  <p className="px-12">
                    Founded with a vision to bring luxury and effectiveness
                    together, our collection features high-quality ingredients,
                    modern formulations, and timeless elegance. Whether you're
                    seeking a radiant glow, soothing care, or bold beauty – we’re
                    here to support your journey to looking and feeling your best.
                  </p>
                  </div>  
                </div>

        {/* Raw 4 */}  
                   <div className="flex flex-col items-center py-10">
                    <h1 className="text-heading text-3xl font-bold">New Arrivals</h1>
                    <Testimonial/>
                   </div>    
              </div>
        </div>
    )
}