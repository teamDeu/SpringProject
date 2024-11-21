import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar"; 
import Pagination from "../../components/admin/Pagination"; // Pagination 컴포넌트 임포트
import Table from '../../components/admin/Table'; // 테이블 컴포넌트 임포트
import { GetAllJobPosts } from '../../api/api'; // 이미 구현된 API 함수 사용

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

const JobHeader = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
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

const DeleteButton = styled.button`
  color: #ff2828;
  background-color: white;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const Job = () => {
  const [jobData, setJobData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지 당 항목 수

  // DB에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllJobPosts();
        const formattedData = (data || []).map(job => ({
          id: job.id || '',
          name: job.companyName || '', // 기업명
          title: job.title || '', // 공고 제목
          country: job.location || '', // 지역
          registerDate: job.postDate || '', // 등록일
          deadline: job.endDate || '', // 마감일
        }));
        setJobData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };
    fetchData();
  }, []);
  

  // 선택 필터가 "전체"인 경우 모든 데이터 표시
  useEffect(() => {
    if (selectedFilter === "전체") {
      setFilteredData(jobData);
    }
  }, [selectedFilter, jobData]);

  const handleSearch = () => {
    if (selectedFilter === "전체") {
      setFilteredData(jobData);
      setCurrentPage(1);
      return;
    }

    const filtered = jobData.filter((job) => {
      const targetField = selectedFilter === "회원 ID"
        ? job.id.toString()
        : selectedFilter === "기업명"
        ? job.name
        : selectedFilter === "공고 제목"
        ? job.title
        : selectedFilter === "지역"
        ? job.country
        : selectedFilter === "등록일"
        ? job.registerDate
        : job.deadline;
  
      return targetField.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("해당 공고를 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedData = jobData.filter((_, i) => i !== index);
      setJobData(updatedData);
      setFilteredData(updatedData);
    }
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
    { header: '기업명', accessor: 'name' },
    { header: '공고 제목', accessor: 'title' },
    { header: '지역', accessor: 'country' },
    { header: '등록일', accessor: 'registerDate' },
    { header: '마감일', accessor: 'deadline' },
  ];

  return (
    <RootContainer>
      <GlobalStyle />
      <Menu />
      <ContentContainer>
        <PageHeader title="채용정보 관리" />
        <JobHeader>
          <DropdownSelect
            initialOptions={["전체", "회원 ID", "기업명", "공고 제목", "지역", "등록일", "마감일"]}
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
        </JobHeader>
        <TableContainer>
          <Table
            columns={columns}
            data={currentData}
            renderRowActions={(row, index) => (
              <DeleteButton onClick={() => handleDelete(index)}>
                삭제
              </DeleteButton>
            )}
            idColumnWidth="7%"
            titleColumnWidth="25%"
            deadlineColumnWidth="7%"
            manageColumnWidth="5%"
          />
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

export default Job;
