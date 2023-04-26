import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// customer css
import "./Swipers.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default ({ dataArr = [] }) => {
  console.log(dataArr);
  return (
    <Swiper
      className="swipers"
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={6}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {dataArr.map((data) => {
        return (
          <SwiperSlide key={data.id} className="slide">
            <a href="https://www.google.com/">
              <div className="slide-image">
                <img src={data.imageUrl || "#"} alt={data || "展覽圖片"} />
              </div>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};