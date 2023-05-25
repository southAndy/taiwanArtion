import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

// customer css
import "./Swipers.scss";
import "../../assets/sass/animation.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default ({ isLoading = true, data = [] }) => {
  return (
    <Swiper
      className="swipers"
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      loop={true}
    >
      {data.map((data: { id: string; imageUrl: string }, index: number) => {
        return (
          <SwiperSlide key={index} className="slide">
            <a className={data.imageUrl ? "" : "skeleton"} href="##">
              <div className="slide-image">
                {/* todo:補上假圖 */}
                <img
                  src={data.imageUrl || ""}
                  className={isLoading ? "hide" : "slide-image"}
                />
              </div>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
