// amember.js

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar"; 
import Pagination from "../../components/admin/Pagination"; // Pagination 컴포넌트 임포트
import Table from "../../components/admin/Table"; 

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('../../fonts/NanumSquareNeo-aLt.ttf') format('truetype');
    font-style: normal;
  }
`;

const RootContainer = styled.div`
  display: flex;
  height: 100vh; /* 화면 전체 높이 사용 */
`;

const ContentContainer = styled.div`
  padding: 20px;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column; /* 세로 방향으로 Flex 적용 */
`;

const MemberHeader = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const TableContainer = styled.div`
  flex: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 (선택 사항) */
`;

const PaginationBox = styled.div`
  width: 1500px;
  height: 30px;
  margin-left: 20px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

const Amember = () => {
  const [memberData] = useState([
    { id: 1234, type: "개인", password: "*****", name: "김세쁑", dob: "2001.12.11", phone: "010-1234-1234" },
    { id: 4567, type: "기업", password: "*****", name: "칸쵸", dob: "2000.05.15", phone: "010-5678-5678" },
    // 추가 데이터 입력
    // 총 데이터 수를 20개 이상으로 늘려 페이지네이션 테스트
  ]);

  const [filteredData, setFilteredData] = useState(memberData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지 당 항목 수

  useEffect(() => {
    if (selectedFilter === "전체") {
      setFilteredData(memberData);
    }
  }, [selectedFilter, memberData]);

  const handleSearch = () => {
    if (selectedFilter === "전체") {
      setFilteredData(memberData);
      setCurrentPage(1);
      return;
    }
    const filtered = memberData.filter((member) => {
      const targetField = selectedFilter === "회원ID"
        ? member.id.toString()
        : selectedFilter === "회원구분"
        ? member.type
        : selectedFilter === "이름"
        ? member.name
        : selectedFilter === "생년월일"
        ? member.dob
        : member.phone;

      return targetField.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 테이블 열 정의
  const columns = [
    { header: '회원 ID', accessor: 'id' },
    { header: '회원 구분', accessor: 'type' },
    { header: '비밀번호', accessor: 'password' },
    { header: '이름', accessor: 'name' },
    { header: '생년월일', accessor: 'dob' },
    { header: '전화번호', accessor: 'phone' },
  ];

  return (
    <RootContainer>
      <GlobalStyle />
      <Menu />
      <ContentContainer>
        <PageHeader title="회원 관리" />
        <MemberHeader>
          <DropdownSelect
            initialOptions={["전체","회원ID", "회원구분", "이름", "생년월일", "전화번호"]}
            defaultOption="전체"
            onChange={(selectedOption) => setSelectedFilter(selectedOption)}
            showPlusButton={false}
            showDeleteButton={false}
          />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </MemberHeader>
        <TableContainer>
          <Table columns={columns} data={currentData} />
        </TableContainer>
        <PaginationBox>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationBox>
      </ContentContainer>
    </RootContainer>
  );
};

export default Amember;
