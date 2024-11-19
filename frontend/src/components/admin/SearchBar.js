import React from 'react';
import './searchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // 검색어 상태 업데이트
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 키를 누르면 검색 동작 실행
    }
  };

  const handleSearch = () => {
    onSearch(); // 검색 버튼 클릭 시 검색 동작 실행
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSearch}>
        <img src="/icons/magnifier.png" alt="검색" />
      </button>
    </div>
  );
};

export default SearchBar;
