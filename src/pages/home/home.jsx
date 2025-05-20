import banner from "../../assets/banner.jpg";

export default function Home(){

    return(
        <div>
            <div className="relative">
                {/* Banner image */}
                <img
                  src={banner}
                  alt="Banner"
                  style={{ height: 'calc(100vh - 68px)' }}
                  className="w-full object-cover rounded-lg"
                />
                
                {/* Centered button */}
                <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="bg-accent text-white px-6 py-2 rounded-md shadow-lg text-lg font-semibold hover:bg-[#e98e8e] transition">
                    Shop Now
                  </button>
                </div>
                
              </div>
        </div>
    )
}