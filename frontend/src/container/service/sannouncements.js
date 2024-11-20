import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import JobTopBar from '../../components/JobTopBar';
import ChangeButton2 from "../../components/admin/ChangeButton2";
import SearchBar from '../../components/eunhyo/SearchBar ';
import AForm from "../../components/admin/AForm";
import Pagination from "../../components/admin/Pagination";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('../../fonts/NanumSquareNeo-aLt.ttf') format('truetype');
    font-style: normal;
  }

  #root {
    font-family: 'Nanum Square Neo', sans-serif;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  padding: 20px;

`;

const Content = styled.div`
  padding: 0px;
  position: relative;
  border: none;
  margin-left: 20px;
  width: 1320px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const ButtonCh = styled.div`
  width: 1360px;
  margin-left:-20px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  width: 100%; /* 부모 요소의 전체 너비를 차지 */
  margin-top: 30px; /* SearchBar와 위의 요소 간 간격 */
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px; /* 선의 위치 */
    left: 0;
    width: 100%;
    height: 1.5px;
    background-color: black; /* 선 색상 */
  }
`;

const FormBox = styled.div`
  width: 1305;
  height: 640px;
  border: none;
  margin-top: -20px;
  margin-left: 0px;
  padding: 20px;
  box-sizing: border-box;
`;

const PaginationBox = styled.div`
  width: 1400px;
  height: 40px;
  margin-left:-20px;
  margin-bottom:10px;
  border: none;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  position: absolute; /* FormBox 하단에 고정 */
  bottom: 0; /* 하단 고정 */
`;

const SAnnouncements = () => {
    const [selectedType, setSelectedType] = useState("all"); // 기본값: 전체
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const itemsPerPage = 8; // 페이지당 항목 수
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    const handleButtonClick = (type) => {
        if (type === "전체") setSelectedType("all");
        else if (type === "개인회원") setSelectedType("individual");
        else if (type === "기업회원") setSelectedType("corporate");
        setCurrentPage(1); // 페이지를 항상 1로 초기화
      };
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    // `AForm`에서 totalPages 값을 계산 후 전달
   const updateTotalPages = (totalItems) => {
        const calculatedPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(calculatedPages);
    };
    const handleSearch = (term) => {
        setSearchTerm(term); // 검색어 업데이트
      };

  return (
    <>
       <GlobalStyle />
      <JobTopBar />
      <MainContent>
        <Content>
          <Title>공지사항</Title>
          <ButtonCh>
            <ChangeButton2
              onButtonClick={(buttonLabel) => handleButtonClick(buttonLabel)}
            />
          </ButtonCh>
          <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
          </SearchBarWrapper>
          <FormBox>
            <AForm
                selectedType={selectedType}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onTotalItemsChange={updateTotalPages} // totalPages 업데이트 콜백
                />
                            <PaginationBox>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages} // AForm 내부 데이터를 기반으로 계산할 수 있음
                    onPageChange={handlePageChange}
    
                />
                </PaginationBox>
          </FormBox>
        </Content>
      </MainContent>
    </>
  );
};

export default SAnnouncements;
