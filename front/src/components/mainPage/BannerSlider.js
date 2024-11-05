import React, { useState, useEffect } from 'react';
import './BannerSlider.css'; // 스타일을 따로 정의합니다

const BannerSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동으로 슬라이드 전환
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [interval, images.length]);

  // 이전 슬라이드
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // 다음 슬라이드
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="banner-slider">
        <div className="slides">
        {images.map((image, index) => (
            <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            />
        ))}
        </div>

      {/* 이전/다음 버튼 */}
      <button className="prev" onClick={goToPrevious}>❮</button>
      <button className="next" onClick={goToNext}>❯</button>

      {/* 페이지 인디케이터 */}
      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
