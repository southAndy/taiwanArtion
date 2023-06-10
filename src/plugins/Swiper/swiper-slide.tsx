import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// customer css
import "./Swipers.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default ({ isLoading = true, data = [] }) => {
  // todo 將 navigation 樣式調整
  return (
    <Swiper
      className="swipers"
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation={!isLoading}
      loop={true}
    >
      {data.map((data: { id: string; imageUrl: string }, index: number) => {
        return (
          <SwiperSlide key={index} className="slide">
            <Link
              className={isLoading ? "skeleton" : "slide-image"}
              to={"/detail"}
            >
              {/* todo:補上假圖 */}
              <img
                src={data.imageUrl || ""}
                className={isLoading ? "hide" : "slide-image"}
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
