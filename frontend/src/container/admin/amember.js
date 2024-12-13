import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "../../components/admin/Menu";
import PageHeader from "../../components/admin/PageHeader";
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import Table from "../../components/admin/Table";
import { GetAllMembers } from "../../api/api";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('../../fonts/NanumSquareNeo-aLt.ttf') format('truetype');
    font-style: normal;
  }
`;

const RootContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  padding: 20px;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  overflow-y: auto;
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
  const [memberData, setMemberData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMembers = async () => {
        try {
            const allMembers = await GetAllMembers();
            console.log("Fetched Members:", allMembers); // 받아온 데이터 로그
            setMemberData(allMembers);
            setFilteredData(allMembers);
        } catch (error) {
            console.error("Failed to fetch members:", error);
        }
    };
    fetchMembers();
}, []);


  useEffect(() => {
    if (selectedFilter === "전체") {
      setFilteredData(memberData);
    }
  }, [selectedFilter, memberData]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // 검색어가 없을 경우 전체 데이터를 반환
      setFilteredData(memberData);
      setCurrentPage(1);
      return;
    }
  
    const filtered = memberData.filter((member) => {
      let targetField = "";
  
      switch (selectedFilter) {
        case "회원ID":
          targetField = member.id?.toString() || "";
          break;
        case "회원구분":
          targetField = member.type || "";
          break;
        case "이름":
          targetField = member.name || "";
          break;
        case "생년월일":
          targetField = member.dob || "";
          break;
        case "전화번호":
          targetField = member.phone || "";
          break;
        default:
          // '전체' 필터일 경우 모든 필드 검색
          targetField = `${member.id || ""} ${member.type || ""} ${member.name || ""} ${member.dob || ""} ${member.phone || ""}`;
      }
  
      // 대소문자 변환 후 검색어 포함 여부 확인
      return targetField.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    { header: "회원 ID", accessor: "id" },
    { header: "회원 구분", accessor: "type" },
    { header: "비밀번호", accessor: "password" },
    { header: "이름", accessor: "name" },
    { header: "생년월일", accessor: "dob" },
    { header: "전화번호", accessor: "phone" },
];

  return (
    <RootContainer>
      <GlobalStyle />
      <Menu />
      <ContentContainer>
        <PageHeader title="회원 관리" />
        <MemberHeader>
          <DropdownSelect
            initialOptions={["전체", "회원ID", "회원구분", "이름", "생년월일", "전화번호"]}
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
