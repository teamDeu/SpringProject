import React, { useState, useEffect,useMemo  } from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import ReviewButton from '../../components/yangji/review_button';
import HorizontalLine from '../../components/yangji/Line';
import TestBox from '../../components/yangji/test_box';
import JobTopBar from '../../components/JobTopBar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 스타일링
const Container = styled.div`
    position: relative;
    width: 69%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto; /* 가로 중앙 정렬 */
    font-family: 'Nanum Square Neo', sans-serif;
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
  -webkit-text-stroke: 0.699999988079071px #000000;
`;

const InputContainer = styled.div`
    position: absolute;
    top: 150px;
    left: 390px;
`;

const SelectboxContainer = styled.div`
    position: absolute;
    top: 150px;
    width: 190px;
`;

const SecondSelectboxContainer = styled.div`
    position: absolute;
    top: 150px;
    left: 150px;
    width: 320px;
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

const TestBoxContainer = styled.div`
    position: absolute;
    top: 220px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Review2 = () => {
    const dropdownOptions1 = ["전체", "합격", "대기중", "불합격"];
    const dropdownOptions2 = [
        "전체", // "전체" 옵션 추가
        "서버/백엔드 개발자",
        "프론트엔드 개발자",
        "웹 풀스택 개발자",
        "게임 클라이언트 개발자",
        "DBA",
        "개발 PM",
        "안드로이드 개발자",
        "iOS 개발자",
        "크로스플랫폼 앱개발자",
        "빅데이터 엔지니어",
        "인공지능/머신러닝",
    ];

    const [selectedStatus, setSelectedStatus] = useState("전체");
    const [selectedJob, setSelectedJob] = useState("전체");
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 검색값 상태 추가

    // 데이터 로드
    useEffect(() => {
        axios.get('http://localhost:8080/api/interview-reviews/with-all-details')
            .then((response) => {
                const transformedData = response.data.map(([interviewReview, company, jobCategory]) => ({
                    ...interviewReview,
                    companyName: company.companyName,
                    jobCategoryName: jobCategory.name,
                }));
                setData(transformedData); // 상태에 저장
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // 필터링 로직
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const statusMatch =
                selectedStatus === "전체" || item.interviewPassed === selectedStatus;
            const jobMatch =
                selectedJob === "전체" || item.jobCategoryName === selectedJob;
            const searchMatch =
                searchQuery === "" || // 검색어가 비어있거나
                item.companyName === searchQuery || // 정확히 일치하거나
                item.companyName.includes(searchQuery); // 포함되는 경우
            return statusMatch && jobMatch && searchMatch;
        });
    }, [data, selectedStatus, selectedJob, searchQuery]); // 검색값 포함

    return (
        <>
            <JobTopBar />
            <Container>
                <Title>면접 후기</Title>
                <SelectboxContainer>
                    <Selectbox
                        options={dropdownOptions1}
                        defaultOption="합격 유무"
                        onChange={(value) => setSelectedStatus(value)}
                    />
                </SelectboxContainer>
                <SecondSelectboxContainer>
                    <Selectbox
                        options={dropdownOptions2}
                        defaultOption="직무 · 직업"
                        onChange={(value) => setSelectedJob(value)}
                    />
                </SecondSelectboxContainer>
                <InputContainer>
                    <Input onSearch={(value) => setSearchQuery(value)} />
                </InputContainer>
                <ButtonContainer>
                    <Link to="/test_review_home3">
                        <ReviewButton text="면접 후기 등록하기" />
                    </Link>
                </ButtonContainer>
                <LineContainer>
                    <HorizontalLine />
                </LineContainer>
                <TestBoxContainer>
                    {/* TestBox는 필터링된 데이터를 전달받아 자체적으로 렌더링 */}
                    <TestBox data={filteredData} />
                </TestBoxContainer>
            </Container>
        </>
    );
};

export default Review2;
