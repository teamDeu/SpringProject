import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../../components/admin/Menu";
import PageHeader from "../../components/admin/PageHeader";
import ChangeButton2 from "../../components/admin/ChangeButton2";
import AForm from "../../components/admin/AForm";
import Pagination from "../../components/admin/Pagination";

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

const Announcements = () => {
  const [selectedType, setSelectedType] = useState("all"); // 기본값: 전체
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const itemsPerPage = 8; // 페이지당 항목 수
  const [resetSelections, setResetSelections] = useState(false); // 체크박스 초기화 상태

  const handleButtonClick = (type) => {
    if (type === "전체") setSelectedType("all");
    else if (type === "개인회원") setSelectedType("individual");
    else if (type === "기업회원") setSelectedType("corporate");
    setCurrentPage(1); // 페이지를 항상 1로 초기화
    setResetSelections(true); // 체크박스 상태 초기화
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // `AForm`에서 totalPages 값을 계산 후 전달
  const updateTotalPages = (totalItems) => {
    const calculatedPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(calculatedPages);
  };
  return (
    <Container>
      <Menu />
      <MainContent>
        <PageHeader title="공지사항" />
        <Content>
          <ButtonCh>
            <ChangeButton2
              onButtonClick={(buttonLabel) => handleButtonClick(buttonLabel)}
            />
          </ButtonCh>
          <FormBox>
            <AForm
              selectedType={selectedType}
              selectedCategory="전체" // 기본값으로 전체 카테고리를 설정
              searchTerm="" // 검색어 기본값 설정
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onTotalItemsChange={updateTotalPages} // totalPages 업데이트 콜백
              resetSelections={resetSelections} // 초기화 상태 전달
              setResetSelections={setResetSelections} // 초기화 상태 관리 콜백 전달
              hideActions={false} // 액션 버튼 보이기
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
    </Container>
  );
};

export default Announcements;
