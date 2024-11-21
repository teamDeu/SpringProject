import React, { useState, useEffect } from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import ReviewButton from '../../components/yangji/review_button';
import HorizontalLine from '../../components/yangji/Line';
import TestBox from '../../components/yangji/test_box';
import JobTopBar from '../../components/JobTopBar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GetAllInterviewReviews } from '../../api/api'; // API 분리

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
    position: relative;
    top: 20px;
    font-size: 30px;
    font-weight: 400;
    color: #000000;
    text-align: left;
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

    // 데이터 로드
    useEffect(() => {
        GetAllInterviewReviews()
            .then((fetchedData) => {
                console.log("Fetched data:", fetchedData); // 디버깅용
                setData(fetchedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // 필터링 로직
    const filteredData = data.filter((item) => {
        const statusMatch =
            selectedStatus === "전체" || item.interviewPassFail === selectedStatus;
        const jobMatch =
            selectedJob === "전체" || item.jobCategoryId === selectedJob;
        return statusMatch && jobMatch;
    });

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
                    <Input />
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
                    {filteredData.map((item) => (
                        <TestBox
                            key={item.id} // 고유 ID
                            companyName={item.companyId} // 회사 이름
                            manufacturing={item.jobCategoryId} // 직무
                            period={item.interviewDate} // 면접 날짜
                            type={item.experience} // 신입/경력
                            status={item.interviewPassFail} // 합격/대기중/불합격
                            date={item.interviewRegisterDate} // 등록 날짜
                        />
                    ))}
                </TestBoxContainer>
            </Container>
        </>
    );
};

export default Review2;
