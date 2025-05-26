import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  {
    id: 1,
    name: "Hydrating Facial Serum",
    description: "A lightweight hydrating facial serum enriched with hyaluronic acid and vitamin C to brighten and moisturize skin for a youthful glow.",
    image: "/src/assets/products/41.jpg",
  },
  {
    id: 2,
    name: "Aqua Dew Hydrating Face Cream",
    description: "A lightweight gel-cream that delivers intense hydration without greasiness. Formulated with hyaluronic acid, aloe vera, and marine minerals to soothe and plump the skin. Ideal for all skin types, especially dry and sensitive skin.",
    image: "/src/assets/products/31.jpg",
  },
  {
    id: 3,
    name: "Cucumber Cooling Eye Gel",
    description: "A refreshing under-eye gel with cucumber extract and caffeine to reduce puffiness and dark circles. Perfect for tired eyes and morning use.",
    image: "/src/assets/products/81.jpg",
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
  };

  return (
    <div className="w-full bg-[#FAF4EB] py-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/*<h2 className="text-3xl font-bold text-[#5C3D2E] mb-6">
          What Our Users Say
        </h2>*/}
        <Slider {...settings}>
          {testimonialData.map((review) => (
            <div key={review.id}>
              <div className="bg-[#FFFDF9] border border-[#C9B037] rounded-xl p-6 h-[400px] flex flex-col justify-center items-center text-center shadow-md">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-60 h-60 object-cover rounded-full border-4 border-[#be843d] mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-[#C9B037]">
                  {review.name}
                </h3>
                <span className="text-sm text-[#4B3F3F] px-40">{review.description}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
