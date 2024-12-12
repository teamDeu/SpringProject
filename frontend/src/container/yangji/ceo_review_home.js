import React, { useState, useEffect, useMemo } from "react";
import Selectbox from "../../components/yangji/selectbox";
import Input from "../../components/yangji/input";
import ReviewButton from "../../components/yangji/review_button";
import HorizontalLine from "../../components/yangji/Line";
import CeoBox from "../../components/yangji/ceo_box";
import JobTopBar from "../../components/JobTopBar";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    position: relative;
    width: 69%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto;
    font-family: "Nanum Square Neo", sans-serif;
`;

const Title = styled.h2`
    position: absolute;
    top: 20px;
    color: #000000;
    text-align: left;
    font-size: 30px;
    font-weight: 400;
    position: relative;
    height: 126px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    -webkit-text-stroke: 0.7px #000000;
`;

const InputContainer = styled.div`
    position: absolute;
    top: 150px;
    left: 150px;
`;

const SelectboxContainer = styled.div`
    position: absolute;
    top: 150px;
    width: 190px;
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 132px;
    right: 19%;
`;

const LineContainer = styled.div`
    position: absolute;
    top: 200px;
    width: 100%;
`;

const CeoBoxContainer = styled.div`
    position: absolute;
    top: 220px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Review = () => {
    const [sessionId, setSessionId] = useState(null);
    const dropdownOptions = ["채용순", "관심순"];
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [favoriteCounts, setFavoriteCounts] = useState([]);
    const [jobPostCounts, setJobPostCounts] = useState([]);
    const [sortOrder, setSortOrder] = useState(""); // 정렬 순서 상태 추가
    const navigate = useNavigate();

    // 클릭 이벤트로 상태 전달 및 페이지 이동
    const handleCompanyClick = (company) => {
        navigate("/company-detail", { state: { company } });
    };

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companiesResponse, favoriteCountsResponse, jobPostCountsResponse] = await Promise.all([
                    axios.get("http://localhost:8080/api/companies"),
                    axios.get("http://localhost:8080/api/users-favorites/counts"),
                    axios.get("http://localhost:8080/api/jobpost/count"),
                ]);

                setData(companiesResponse.data);
                setFavoriteCounts(favoriteCountsResponse.data);
                setJobPostCounts(jobPostCountsResponse.data);
            } catch (error) {
                console.error("데이터 가져오는데 실패:", error);
            }
        };

        fetchData();
    }, []);

    // 데이터 병합 로직
    const mergedData = useMemo(() => {
        return data.map((company) => {
            const favoriteCount = favoriteCounts.find((fav) => fav.companyId === company.id)?.count || 0;
            const jobPostCount = jobPostCounts.find((count) => count.companyId === company.id)?.count || 0;

            return {
                ...company,
                favoriteCount,
                jobPostCount,
            };
        });
    }, [data, favoriteCounts, jobPostCounts]);

    // 필터링 로직
    const filteredData = useMemo(() => {
        return mergedData.filter((item) =>
            searchQuery === "" || item.companyName?.includes(searchQuery)
        );
    }, [mergedData, searchQuery]);

    // 정렬 로직
    const sortedData = useMemo(() => {
        if (sortOrder === "채용순") {
            return [...filteredData].sort((a, b) => b.jobPostCount - a.jobPostCount);
        } else if (sortOrder === "관심순") {
            return [...filteredData].sort((a, b) => b.favoriteCount - a.favoriteCount);
        }
        return filteredData;
    }, [filteredData, sortOrder]);

    return (
        <>
            <JobTopBar />
            <Container>
                <Title>기업리뷰</Title>
                <SelectboxContainer>
                    <Selectbox
                        options={dropdownOptions}
                        defaultOption="정렬"
                        onChange={(option) => setSortOrder(option)} // 정렬 상태 업데이트
                    />
                </SelectboxContainer>
                <InputContainer>
                    <Input onSearch={(value) => setSearchQuery(value)} />
                </InputContainer>
                <ButtonContainer>
                    <ReviewButton text="기업 리뷰 등록하기" />
                </ButtonContainer>
                <LineContainer>
                    <HorizontalLine />
                </LineContainer>
                <CeoBoxContainer>
                    {sortedData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleCompanyClick(item)} // 클릭 시 이동
                            style={{ cursor: "pointer" }}
                        >
                            <CeoBox data={[item]} />
                        </div>
                    ))}
                </CeoBoxContainer>
            </Container>
        </>
    );
};

export default Review;
