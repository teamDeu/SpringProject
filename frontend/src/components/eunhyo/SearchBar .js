import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000000;
  overflow: hidden;
  width: 350px;
  font-family: 'Nanum Square Neo', sans-serif; 
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none;
  color: #000000;
  font-weight: bold;
  font-family: 'Nanum Square Neo', sans-serif; 

  &::placeholder {
    color: #888;
    font-weight:100;
  }
`;

const SearchButton = styled.button`
  width: 60px;
  padding: 10px 0px;
  background-color: #00257A;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.length > 20) {
      alert('검색어는 20자 이내로 입력해주세요.');
    } else {
      onSearch(searchTerm); // 부모 컴포넌트로 검색어 전달
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색어는 20자 이내로 입력해주세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
