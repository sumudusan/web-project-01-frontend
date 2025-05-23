import React from "react";
import img3 from "../../assets/3.jpg"

const AboutUs = () => {
  return (
    <div className="bg-[#FAF4EB] text-[#4B3F3F] py-12 px-4 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#5C3D2E] mb-6">
          About Us
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Welcome to <span className="font-semibold text-[#C9B037]">CrystalClearBeautyProducts</span> – your
          trusted destination for luxurious, skin-loving beauty products. Our mission is to
          enhance your natural beauty with clean, effective, and empowering products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#FFFDF9] p-6 rounded-xl shadow-md">
          <div>
            <img
              src={img3}
              alt="Beauty products"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#C9B037] mb-4">Our Story</h2>
            <p className="mb-4">
              Established in 2023, CrystalClearBeautyProducts was born from a love for skincare and a
              commitment to purity. We blend modern science with natural ingredients to bring
              you products that nourish and rejuvenate.
            </p>
            <p>
              We offer a handpicked selection of cruelty-free, eco-conscious beauty essentials
              to help you glow confidently, every day.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">
            Why Choose Us?
          </h2>
          <ul className="text-[#4B3F3F] space-y-2">
            <li>💛 Gold-standard quality & natural ingredients</li>
            <li>🌿 Cruelty-free & skin-safe formulas</li>
            <li>🧴 Elegant packaging, luxurious feel</li>
            <li>🚚 Fast delivery & responsive customer care</li>
          </ul>
        </div>

        <div className="mt-12 text-center bg-[#FFFDF9] py-8 px-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#be843d] mb-2">
            Get in Touch
          </h2>
          <p>
            We’re always here to help you on your beauty journey. <br />
            <span className="text-[#C9B037] font-medium">support@CrystalClearBeautyProducts.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
