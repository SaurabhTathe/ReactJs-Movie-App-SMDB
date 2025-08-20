import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Banner = ({ data }) => {
  const [idx, setIdx] = useState(0);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [data.length]);

  const handlePrev = () => {
    setIdx((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIdx((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden group">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {data.map((movie) => (
          <div key={movie.id} className="min-w-full h-[90vh] sm:h-screen relative">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title || "Banner"}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Text content */}
            <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 z-10 max-w-xs sm:max-w-xl lg:max-w-2xl text-white space-y-3 sm:space-y-4 bg-gradient-to-r from-black/70 to-transparent p-3 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-md shadow-lg">
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-extrabold leading-snug drop-shadow-md">
                {movie.title}
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                {movie.overview?.slice(0, 120)}...
              </p>

              <div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow-md transition">
                  ▶ Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (visible on hover for larger screens) */}
      <div className="absolute top-0 left-0 w-full h-full px-2 sm:px-4 flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="bg-white/80 hover:bg-white text-black p-2 sm:p-3 rounded-full text-lg sm:text-xl"
          onClick={handlePrev}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="bg-white/80 hover:bg-white text-black p-2 sm:p-3 rounded-full text-lg sm:text-xl"
          onClick={handleNext}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default Banner;
