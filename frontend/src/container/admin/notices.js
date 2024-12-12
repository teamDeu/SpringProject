import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../../components/admin/Menu";
import PageHeader from "../../components/admin/PageHeader";
import ChangeButton2 from "../../components/admin/ChangeButton2";
import AForm from "../../components/admin/AForm";
import Pagination from "../../components/admin/Pagination";
import NoticeDetails from "../../components/admin/NoticeDetails"; // NoticeDetails 컴포넌트 임포트

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Content = styled.div`
  padding: 40px;
  position: relative;
  border: 1px solid #b5b5b5;
  margin-left: 20px;
  width: 1400px;
  height:770px;
`;

const ButtonCh = styled.div`
  width: 1440px;
  margin-left: -20px;
`;

const FormBox = styled.div`
  width: 1400px;
  height: 640px;
  border: none;
  margin-top: -20px;
  margin-left: 0px;
  padding: 20px;
  box-sizing: border-box;
`;

const NoticeForm = styled.div`
  width: 1450px;
  height: 800px;
  border: 1px solid #b5b5b5;
  margin-top: -20px;
  margin-left: -25px;
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

const Notices = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDetails, setShowDetails] = useState(false); // 상세보기 상태
  const [detailsData, setDetailsData] = useState(null); // 상세보기 데이터
  const itemsPerPage = 8;
  const [resetSelections, setResetSelections] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = (type) => {
    if (type === "전체") setSelectedType("all");
    else if (type === "개인회원") setSelectedType("individual");
    else if (type === "기업회원") setSelectedType("corporate");
    setSelectedType(
      type === "전체" ? "all" : type === "개인회원" ? "individual" : "corporate"
    );
    setCurrentPage(1);
    setResetSelections(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateTotalPages = (totalItems) => {
    const calculatedPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(calculatedPages);
  };

  const handleShowDetails = (data) => {
    setDetailsData(data); // 데이터를 저장
    setShowDetails(true); // 상세보기 상태 활성화
  };

  const handleCloseDetails = () => {
    setShowDetails(false); // 상세보기 상태 비활성화
    setDetailsData(null); // 데이터 초기화
  };

  return (
    <Container>
      <Menu />
      <MainContent>
        <PageHeader title="공지사항" />
        <Content>
          {!showDetails ? (
            <>
              <ButtonCh>
              <ChangeButton2
                selectedType={selectedType} // Pass the state
                onButtonClick={(buttonLabel) => handleButtonClick(buttonLabel)}
              />
              </ButtonCh>

              <FormBox>
                <AForm
                  selectedType={selectedType}
                  selectedCategory="전체"
                  searchTerm={searchTerm}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onTotalItemsChange={updateTotalPages}
                  resetSelections={resetSelections}
                  setResetSelections={setResetSelections}
                  hideActions={false}
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
            <NoticeDetails
              title={detailsData.title}
              date={detailsData.date}
              imageSrc={detailsData.imageSrc}
              content={detailsData.content}
              onClose={handleCloseDetails}
            />
          )}
        </Content>
      </MainContent>
    </Container>
  );
  
  
};

export default Notices;