import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../api";

const product = () => {
  const [ProductsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products/?top_selling=true");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-10 mb-12">
      <div>
        {/*Header Section*/}
        <div className="bg-gray-100 dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 text-center mb-10 mx-0">
          <p
            data-aos="fade-up"
            className="text-sm text-primary dark:text-white"
          >
            Top Selling product for you
          </p>
          <h1
            data-aos="fade-up"
            className="text-black dark:text-white inline-block text-3xl font-bold"
          >
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-black dark:text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam,
            quod.
          </p>
        </div>
        {/*Body Section*/}
        <div
          className="container bg-gray-100 dark:bg-gradient-to-r dark:from-primary dark:to-blue-500 mt-10 pb-10 
        rounded-2xl margin-left-3.5rem margin-right-3.5rem"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="mySwiper"
          >
            {/*CardSection*/}
            {ProductsData.length > 0 ? (
              ProductsData.map((data) => (
                <SwiperSlide key={data.id}>
                  <div
                    className="space-y-3 flex flex-col items-center"
                    data-aos="fade-up"
                    data-aos-delay={data.aosDelay}
                    key={data.id}
                  >
                    <img
                      src={data.image || data.img}
                      alt="image"
                      className="mt-12 mb-12 w-[100px] h-[100px] object-cover rounded-md transition-transform duration-300 hover:scale-105 bg-white border-spacing-3"
                    />
                    <div>
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold">
                        {data.name || data.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.color}
                      </p>
                      {/*Star Rating*/}
                      <div className="flex items-center justify-between gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-gray-800 dark:text-gray-200">
                          {data.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Swiper>
          {/*View All Button*/}
          <div className="flex items-center justify-center mt-10">
            <button className="bg-primary text-white px-4 py-1 rounded-full gap-3 group">
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default product;
