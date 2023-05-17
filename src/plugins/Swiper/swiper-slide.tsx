import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

// customer css
import "./Swipers.scss";
import "../../assets/sass/animation.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default ({ dataArr = [] }) => {
  return (
    <Swiper
      className="swipers"
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      loop={true}
    >
      {dataArr.map((data: { id: string; imageUrl: string }) => {
        return (
          <SwiperSlide key={data.id} className="slide">
            <a
              className={data.imageUrl ? "" : "lds-ring"}
              href="https://www.google.com/"
            >
              <div>
                <img src={data.imageUrl || ""} />
              </div>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
