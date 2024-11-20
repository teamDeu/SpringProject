import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "../../components/admin/Menu";
import PageHeader from "../../components/admin/PageHeader";
import DropdownSelect, {
  DropdownContainer,
  SelectBox,
  OptionList,
  Option,
  ArrowIcon
} from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import Table from '../../components/admin/Table';

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

const ReviewHeader = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
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

// StyledDropdownSelect 정의
const StyledDropdownSelect = styled(DropdownSelect)`
  ${DropdownContainer} {
    width: 150px;
  }

  ${SelectBox} {
    height: 30px;
    width: 170px;
    border-color: #ccc;
    font-size: 14px; 
    margin-left: 20px;
    color: ${({ status }) => {
      if (status === '등록완료') return '#009E22'; // 녹색
      if (status === '등록대기') return '#00257A'; // 주황색
      if (status === '등록취소') return '#EA2D2E'; // 빨간색
      return 'black'; // 기본 색상
    }};
  }

  ${OptionList} {
    background-color: #fff;
    border-color: #ccc;
    width: 170px;
    margin-top: -20px;
    margin-left: 20px;
  }

  ${Option} {
    font-size: 14px;
    color: #333;
    &:hover {
      background-color: #eee;
    }
  }

  ${ArrowIcon} {
    width: 16px;
    height: 16px;
  }
`;

const Areview = () => {
  // 상태 변수들
  const [reviewData, setReviewData] = useState([
    { reviewId: 1, id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file1.pdf", status: "등록완료" },
    { reviewId: 2, id: 1234, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file2.pdf", status: "등록대기" },
    { reviewId: 3, id: 1234, date: "2023-11-12", result: "합격", areview: "카카오", file: "file3.pdf", status: "등록취소" },
    { reviewId: 4, id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file1.pdf", status: "등록완료" },
    { reviewId: 5, id: 1234, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file2.pdf", status: "등록대기" },
    { reviewId: 6, id: 1234, date: "2023-11-12", result: "합격", areview: "카카오", file: "file3.pdf", status: "등록취소" },
    { reviewId: 7, id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file1.pdf", status: "등록완료" },
    { reviewId: 8, id: 1234, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file2.pdf", status: "등록대기" },
    { reviewId: 9, id: 1234, date: "2023-11-12", result: "합격", areview: "카카오", file: "file3.pdf", status: "등록취소" },
    { reviewId: 10, id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file1.pdf", status: "등록완료" },
    { reviewId: 11, id: 1234, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file2.pdf", status: "등록대기" },
    { reviewId: 12, id: 1234, date: "2023-11-12", result: "합격", areview: "카카오", file: "file3.pdf", status: "등록취소" },
    // 필요한 만큼 데이터 추가
  ]);

  const [filteredData, setFilteredData] = useState(reviewData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    handleSearch();
  }, [selectedFilter, reviewData]);

  const handleSearch = () => {
    const filtered = reviewData.filter((review) => {
      if (selectedFilter === "전체") return true;

      const targetField =
        selectedFilter === "회원ID"
          ? review.id.toString()
          : selectedFilter === "작성일"
          ? review.date
          : selectedFilter === "합격유무"
          ? review.result
          : selectedFilter === "리뷰(기업명)"
          ? review.areview
          : selectedFilter === "첨부파일"
          ? review.file
          : review.status;

      return targetField.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleStateChange = (reviewId, newStatus) => {
    setReviewData((prevData) =>
      prevData.map((item) =>
        item.reviewId === reviewId ? { ...item, status: newStatus } : item
      )
    );
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
    { header: '작성일', accessor: 'date' },
    { header: '합격유무', accessor: 'result' },
    { header: '리뷰(기업명)', accessor: 'areview' },
    { header: '첨부파일', accessor: 'file' },
    {
      header: '등록현황',
      accessor: 'status',
      Cell: (row) => (
        <StyledDropdownSelect
          initialOptions={['등록대기', '등록완료', '등록취소']}
          defaultOption={row.status}
          onChange={(selectedOption) => handleStateChange(row.reviewId, selectedOption)}
          showPlusButton={false}
          showDeleteButton={false}
          width="100px"
          margin="0"
          status={row.status} // status prop 전달
        />
      ),
    },
  ];

  return (
    <RootContainer>
      <GlobalStyle />
      <Menu />
      <ContentContainer>
        <PageHeader title="리뷰" />
        <ReviewHeader>
          <DropdownSelect
            initialOptions={["전체", "회원ID", "작성일", "합격유무", "리뷰(기업명)", "첨부파일", "등록현황"]}
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
        </ReviewHeader>
        <TableContainer>
          <Table columns={columns} data={currentData} cellPadding="17px" />
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

export default Areview;
