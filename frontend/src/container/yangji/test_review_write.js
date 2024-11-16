import React, { useState } from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import ReviewButton from '../../components/yangji/review_button';
import HorizontalLine from '../../components/yangji/Line';
import TestBox from '../../components/yangji/test_box';
import JobTopBar from '../../components/JobTopBar';
import styled from 'styled-components';


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
    top: 150px; /* 첫 번째 Selectbox 아래로 배치 */
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
    width: 100%; /* 선의 너비 조정 */
`;

const TestBoxContainer = styled.div`
    position: absolute;
    top: 220px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%; /* 부모 컨테이너에 맞게 늘림 */
`;

const Write1 = () => {
    const dropdownOptions1 = ["전체", "합격", "대기중", "불합격"];
    const dropdownOptions2 = [
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

    const numberOfBoxes = 8; // 데이터베이스에서 가져온 값
    const dummyData = Array.from({ length: numberOfBoxes }, (_, index) => ({
        companyName: `회사 이름 ${index + 1}`,
        manufacturing: `제조 ${index + 1}`,
        period: "2024년 하반기",
        type: "신입",
        status: index % 3 === 0 ? "합격" : index % 3 === 1 ? "대기중" : "불합격",
        date: `2024.10.${27 - index}`,
        hiddenContent: `숨겨진 내용 ${index + 1}`,
    }));

    const filteredData =
        selectedStatus === "전체"
            ? dummyData
            : dummyData.filter((data) => data.status === selectedStatus);

    return (
        <>
        <JobTopBar />
        <Container>
            <Title>면접 후기 작성</Title>
            <SelectboxContainer>
                <Selectbox
                    options={dropdownOptions1}
                    defaultOption="합격 유무"
                    onChange={(value) => setSelectedStatus(value)}
                />
            </SelectboxContainer>
            <SecondSelectboxContainer>
                <Selectbox options={dropdownOptions2} defaultOption="직무 · 직업" />
            </SecondSelectboxContainer>
            <InputContainer>
                <Input />
            </InputContainer>
            <ButtonContainer>
                <ReviewButton text="면접 후기 등록하기" />
            </ButtonContainer>
            <LineContainer>
                <HorizontalLine />
            </LineContainer>
            <TestBoxContainer>
                {filteredData.map((data, index) => (
                    <TestBox
                        key={index}
                        companyName={data.companyName}
                        manufacturing={data.manufacturing}
                        period={data.period}
                        type={data.type}
                        status={data.status}
                        date={data.date}
                        hiddenContent={data.hiddenContent}
                    />
                ))}
            </TestBoxContainer>
        </Container>
        </>
    );
};

export default Write1;
