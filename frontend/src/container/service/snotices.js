import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import JobTopBar from '../../components/JobTopBar';
import ChangeButton2 from "../../components/admin/ChangeButton2";
import SearchBar from '../../components/eunhyo/SearchBar ';
import AForm from "../../components/admin/AForm";
import Pagination from "../../components/admin/Pagination";
import SelectBox from '../../components/eunhyo/SelectBox';
import NoticeDetails from "../../components/admin/NoticeDetails";
import { GetGNoticesByTarget } from '../../api/api';

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
  font-family: "Nanum Square Neo", sans-serif;
`;

const ButtonCh = styled.div`
  width: 1360px;
  margin-left: -20px;
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
  width: 1340px;
  height: 550px;
  border: none;
  margin-top: 0px;
  margin-left: -20px;
  padding: 20px;
  box-sizing: border-box;
`;
const NoticeBox = styled.div`
  width: 1340px;
  height: 550px;
  border: none;
  margin-top: 20px;
  margin-left: -20px;
  padding: 20px;
  box-sizing: border-box;
`;
const PaginationBox = styled.div`
  width: 1400px;
  height: 40px;
  margin-left: -20px;
  margin-bottom: 10px;
  border: none;
  display: flex;
  justify-content: center;
  margin-top: 0px;
  position: absolute; /* FormBox 하단에 고정 */
  bottom: 0; /* 하단 고정 */
`;

const SelectBoxWrapper = styled.div`
  margin-right: 10px; /* SearchBar와의 간격 */
`;

const SAnnouncements = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resetSelections, setResetSelections] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [titles,setTitles] = useState([]);
  const [options,setOptions] = useState([]);
  const handleButtonClick = (type) => {
    if (type === "전체") setSelectedType("all");
    else if (type === "개인회원") setSelectedType("individual");
    else if (type === "기업회원") setSelectedType("corporate");
    setCurrentPage(1);
  };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetGNoticesByTarget(selectedType);
          console.log('GNotices Data:', data); // API 응답 데이터 확인
    
          // 데이터를 id 기준으로 내림차순 정렬
          let type = "all";
          if (selectedType === "all") type = "전체"
          else if (selectedType === "individual") type = "개인회원"
          else if (selectedType === "corporate") type = "기업회원";
          const filteredData = data.filter((item) => item.target === type)
          const titleData = filteredData.map((item) => item.title);
          console.log("titleData",titleData,selectedType);
          setTitles(titleData)
        } catch (error) {
          console.error("Error fetching GNotices:", error);
          alert("공지사항을 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      };
    
      fetchData();
    }, [selectedType]);

    
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() =>{
    const optionData = ["전체", ...titles.filter((item, index) => { 
      return titles.findIndex((e) => e === item) === index;
    })];
        setOptions(optionData)
  },[titles])

  const updateTotalPages = (totalItems) => {
    const calculatedPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(calculatedPages);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleShowDetails = (data) => {
    setDetailsData(data);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setDetailsData(null);
  };

  return (
    <>
      <GlobalStyle />
      <JobTopBar />
      <MainContent>
        <Content>
          <Title>공지사항</Title>
          {!showDetails ? (
            <>
              <ButtonCh>
              <ChangeButton2
                activeButton={selectedType} // 부모 상태 전달
                onButtonClick={(buttonLabel) => handleButtonClick(buttonLabel)}
              />
              </ButtonCh>
              <SearchBarWrapper>
                <SelectBoxWrapper>
                  <SelectBox
                    options={options}
                    onChange={handleSelectCategory}
                    defaultValue="전체"
                  />
                </SelectBoxWrapper>
                <SearchBar onSearch={handleSearch} />
              </SearchBarWrapper>
              <FormBox>
                <AForm
                  selectedType={selectedType}
                  selectedCategory={selectedCategory}
                  searchTerm={searchTerm}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onTotalItemsChange={updateTotalPages}
                  resetSelections={resetSelections}
                  setResetSelections={setResetSelections}
                  hideActions={true}
                  onShowDetails={handleShowDetails}
                />
                <PaginationBox>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </PaginationBox>
              </FormBox>
            </>
          ) : (
            <NoticeBox>
            <NoticeDetails
              title={detailsData.title}
              content={detailsData.content}
              date={detailsData.date}
              onClose={handleCloseDetails}
            />
            </NoticeBox>
          )}
        </Content>
      </MainContent>
    </>
  );
};

export default SAnnouncements;