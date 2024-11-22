import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import JobTopBar from '../../components/JobTopBar';
import InfoBox from '../../components/admin/InfoBox';
import ChangeButton from '../../components/admin/ChangeButton';
import SearchBar from '../../components/eunhyo/SearchBar ';
import FaqForm from "../../components/admin/FqaForm";

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
  width: 1305px;
  height: auto;
  border: none;
  padding: 30px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-left:-45px;
  margin-top:-20px; 
`;
const SFAQ = () => {
    const [selectedType, setSelectedType] = useState("individual"); // 기본값: 개인회원
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가


    const handleButtonClick = (type) => {
      setSelectedType(type); // 개인회원 또는 기업회원 설정
      setSearchTerm(""); //검색 상태 초기화
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
          <Title>FAQ</Title>
          <InfoBox hideBorder={true} hideEditButton={true} deletePadding={true} />
          <ButtonCh>
            <ChangeButton
              onButtonClick={(buttonLabel) => {
                handleButtonClick(buttonLabel === "개인회원" ? "individual" : "corporate");
              }}
            />
          </ButtonCh>
          <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
          </SearchBarWrapper>
          <FormBox>
          <FaqForm
              selectedType={selectedType}
              hideControls={true}
              customStyles={{ marginLeft: "-25px" }}
              searchTerm={searchTerm} // 검색어 전달
              resetToggleState={!!searchTerm} // 토글 초기화 전달
            />
          </FormBox>
        </Content>
      </MainContent>
    </>
  );
};

export default SFAQ;
