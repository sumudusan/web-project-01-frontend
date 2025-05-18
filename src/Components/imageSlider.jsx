/* eslint-disable react/prop-types */
import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="relative w-full aspect-[5/7] object-contain max-w-xl mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-lg">
      <img
        src={images[activeImage] || "/placeholder.jpg"}
        className="w-full h-full object-cover transition-all duration-300"
        alt="Product"
      />

      <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-md py-2 flex justify-center items-center overflow-x-auto gap-3 px-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Preview ${idx}`}
            onClick={() => setActiveImage(idx)}
            className={`w-16 h-16 object-cover border-2 rounded-md cursor-pointer transition-transform duration-200 ${
              activeImage === idx
                ? "border-amber-500 scale-110"
                : "border-gray-300 hover:scale-105"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
