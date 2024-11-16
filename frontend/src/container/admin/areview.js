import React, { useState, useEffect } from "react";
import Menu from "../../components/admin/Menu";
import PageHeader from "../../components/admin/PageHeader";
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination"; // 페이지네이션 컴포넌트
import "./areview.css";

const Areview = () => {
  const [reviewData] = useState([
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
    { id: 2345, date: "2023-11-11", result: "불합격", areview: "네이버", file: "file.pdf", state: "등록 대기중" },
    { id: 3456, date: "2023-11-12", result: "합격", areview: "카카오", file: "file.pdf", state: "등록완료" },
    { id: 1234, date: "2023-11-10", result: "합격", areview: "쿠팡", file: "file.pdf", state: "등록완료" },
  ]);

  const [filteredData, setFilteredData] = useState(reviewData); // 필터링된 데이터를 관리
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [selectedFilter, setSelectedFilter] = useState("전체"); // 선택된 필터 옵션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 표시할 행 수

  // '전체' 선택 시 모든 데이터 표시
  useEffect(() => {
    if (selectedFilter === "전체") {
      setFilteredData(reviewData);
    }
  }, [selectedFilter, reviewData]);

  // 검색어와 필터 조건으로 데이터 필터링
  const handleSearch = () => {
    if (selectedFilter === "전체") {
      setFilteredData(reviewData);
      setCurrentPage(1); // 검색 시 첫 페이지로 초기화
      return;
    }

    const filtered = reviewData.filter((review) => {
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
          : review.state;

      return targetField.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredData(filtered);
    setCurrentPage(1); // 검색 결과는 항상 첫 페이지부터 보여줌
  };

  // 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ display: "flex" }}>
      <Menu />
      <div style={{ padding: "20px", flex: 1, position: "relative" }}>
        <PageHeader title="리뷰" />
        <div
          className="member-header"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
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
        </div>
        <div className="review-table-container">
          <table className="review-table">
            <thead>
              <tr>
                <th>회원 ID</th>
                <th>작성일</th>
                <th>합격유무</th>
                <th>리뷰(기업명)</th>
                <th>첨부파일</th>
                <th>등록현황</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((review, index) => (
                <tr key={index}>
                  <td>{review.id}</td>
                  <td>{review.date}</td>
                  <td>{review.result}</td>
                  <td>{review.areview}</td>
                  <td>{review.file}</td>
                  <td>{review.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-box">
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
        </div>
      </div>
    </div>
  );
};

export default Areview;
