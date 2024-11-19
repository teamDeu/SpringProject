import React, { useState } from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5; // 한 번에 표시할 최대 페이지 수
  const [startPage, setStartPage] = useState(1); // 현재 표시된 페이지 범위의 시작

  // 현재 페이지 범위의 끝 페이지 계산
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  // 현재 페이지 범위의 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // "다음" 버튼을 눌렀을 때
  const handleNextRange = () => {
    const newStartPage = Math.min(startPage + visiblePages, totalPages);
    setStartPage(newStartPage);
  };

  // "이전" 버튼을 눌렀을 때
  const handlePrevRange = () => {
    const newStartPage = Math.max(startPage - visiblePages, 1);
    setStartPage(newStartPage);
  };


  return (
    <div className="pagination">
      {/* 이전 버튼 */}
      <button
        className="page-button prev-button"
        onClick={handlePrevRange}
        disabled={startPage === 1} // 비활성화 조건
      >
        〈 이전
      </button>

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`page-button ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        className="page-button next-button"
        onClick={handleNextRange}
        disabled={endPage === totalPages} // 비활성화 조건
      >
        다음 〉
      </button>
    </div>
  );
};

export default Pagination;
