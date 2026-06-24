import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import api from "../../api";

const Hero = () => {
  const [ImageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await api.get('/api/products/heroes/');
        setImageList(response.data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };
    fetchHeroes();
  }, []);

  return (
    <div
      className="relative overflow-hidden min-h-[500px] sm:min-h-[600px]
      bg-gray-100 flex justify-center items-center dark:bg-blue-200 dark:text-gray-500
      "
    >
      {/* background section */}
      <div
        className="h-[700px] w-[700px] bg-primary/30 dark:bg-gradient-to-r dark:from-primary dark:to-blue-500 absolute
        -top-1/2 right-0 rounded-3xl rotate-45"
      />

      {/* Hero Section */}
      <div
        className="container pb-8 sm:pb-0"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          speed={500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="hero-swiper"
        >
          {ImageList.length > 0 ? ImageList.map((data) => (
            <SwiperSlide key={data.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
                {/* text content */}
                <div
                  className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center
                  sm:text-left order-2 sm:order-1 relative z-10"
                  data-aos="fade-down"
                  data-aos-delay={500}
                  data-aos-once="true"
                >
                  <h1 className="text-5xl md:text-6xl font-bold">
                    {data.title}
                  </h1>
                  <p className="inline-block px-6 py-4 text-gray-500 dark:text-gray-700 font-semibold">
                    {data.description}
                  </p>
                  <div
                    className="flex gap-5"
                    data-aos="fade-left"
                    data-aos-delay={500}
                    data-aos-once="true"
                  >
                    <button
                      className="bg-gradient-to-r from-primary to-blue-600 transition-all
                      duration-200 text-white py-2 px-4 rounded-full flex items-center gap-3
                      group hover:scale-105 cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* image Section*/}
                <div
                  className="relative z-10"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  <img
                    src={data.image || data.img}
                    alt={data.title}
                    className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]
                    sm:scale-105 lg:scale-110 object-contain mx-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          )) : <div>Loading...</div>}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
