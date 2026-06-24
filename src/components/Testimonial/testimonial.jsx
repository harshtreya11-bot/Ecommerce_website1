import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../api";

const Testimonial = () => {
  const [Testimonial_data, setTestimonialData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/api/products/testimonials/');
        setTestimonialData(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="mt-10 mb-12">
      {/*Header Section*/}
      <div className="bg-gray-100 dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 text-center mb-10 mx-0 py-4">
        <p
          data-aos="fade-up"
          className="text-xs text-gray-600 dark:text-white mt-1"
        >
          Real reviews from our happy customers
        </p>
        <h1
          data-aos="fade-up"
          className="text-black dark:text-white inline-block text-3xl font-bold"
        >
          Testimonials
        </h1>
        <p data-aos="fade-up" className="text-xs text-black dark:text-white">
          Reviews of Customers
        </p>
      </div>
      {/*Testimonials Card*/}
      {/*Testimonials Card Slider*/}
      <div className="container pb-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper pb-10"
        >
          {Testimonial_data.length > 0 ? Testimonial_data.map((data) => (
            <SwiperSlide key={data.id}>
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="
                  relative flex flex-col gap-4 p-6 mx-2 mt-6 mb-8
                  bg-white dark:bg-gray-800
                  rounded-2xl shadow-lg hover:shadow-2xl
                  border border-gray-100 dark:border-gray-700
                  transition-all duration-300 hover:-translate-y-1
                "
              >
                {/*Quote Icon*/}
                <FaQuoteLeft className="text-primary/20 dark:text-blue-300/30 text-5xl absolute top-4 right-4" />
                {/*Star Rating*/}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < data.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                {/*Review Text*/}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                  "{data.text}"
                </p>
                {/*Divider*/}
                <hr className="border-gray-200 dark:border-gray-700" />
                {/*Profile*/}
                <div className="flex items-center gap-3">
                  <img
                    src={data.image || data.img}
                    alt={data.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {data.name}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-400">
                      {data.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )) : <div>Loading...</div>}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
