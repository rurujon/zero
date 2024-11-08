import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import './BannerSlider.css'; // 추가적인 스타일이 필요한 경우 사용

const BannerSlider = () => {
  const images = [
    'https://promotion.daum-kg.net/seoulgamtan/images/visual.jpg?v=1',
    '/images/zerowastebanner.png',
    '/images/koicachallenge.jpg'
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="banner-slider"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="slide">
            <img src={image} alt={`Slide ${index}`} className="slide-image" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;