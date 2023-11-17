import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/effect-coverflow/effect-coverflow.scss";
import { Card } from "@fluentui/react-components";

export const Carousel = () => {
  return (
    <div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        keyboard={{ enabled: true }}
        mousewheel={{
          thresholdDelta: 70,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        slidesPerView={2}
        modules={[EffectCoverflow]}
        centeredSlides
        spaceBetween={30}
        loop={false}
      >
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-1.jpg)",
            }}
          >
            Slide 1
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-3.jpg)",
            }}
          >
            Slide 3
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-4.jpg)",
            }}
          >
            Slide 4
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-5.jpg)",
            }}
          >
            Slide 5
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-6.jpg)",
            }}
          >
            Slide 6
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              backgroundImage:
                "url(https://swiperjs.com/demos/images/nature-7.jpg)",
            }}
          >
            Slide 7
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
