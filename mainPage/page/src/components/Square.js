import React from 'react';
import './Square.css'; // 스타일을 추가할 수 있는 CSS 파일

const Square = ({ width, height, color }) => {
  return (
    <div className="square" style={{ width: width, height: height, backgroundColor: color }}>
      {/* 필요에 따라 추가 콘텐츠를 넣을 수 있습니다. */}
    </div>
  );
};

export default Square;