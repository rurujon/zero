import React from 'react';
import './pagination.css';

const Pagination = ({ pageResponse, onPageChange }) => {
    const {
        pageNumList, // 페이지 번호 리스트 (1 ~ 10)
        prev, // 이전 버튼 활성화 여부
        next, // 다음 버튼 활성화 여부
        prevPage, // 이전 버튼 클릭 시 이동할 페이지 번호
        nextPage, // 다음 버튼 클릭 시 이동할 페이지 번호
        current, // 현재 페이지 번호
        totalPage, // 총 페이지 수
      } = pageResponse;
    

  return (
    <div className="sdmpagination" style={{color:'red'}}>
      {/* Prev 버튼 */}
      {prev && (
        <button
        className="sdmpage-btn"
        onClick={() => onPageChange(prevPage >= 1 ? prevPage : current)} 
        >
          ◀
        </button>
      )}

      {/* 페이지 번호 버튼들 */}
      {pageNumList.map((pageNum) => (
        <button
          key={pageNum}
          className={`sdmpage-btn ${pageNum === current ? 'active' : ''}`}
          onClick={() => onPageChange(pageNum)}
        style={{color:'red'}}>
          {pageNum}
        </button>
      ))}

      {/* Next 버튼 */}
      {next && (
        <button
          className="sdmpage-btn"
          onClick={() => onPageChange(nextPage <= totalPage ? nextPage : current)}  
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Pagination;
