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
    width: 100%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto; /* 가로 중앙 정렬 */
    font-family: 'Nanum Square Neo', sans-serif;
`;

const InputContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 1042px;
`;

const SelectboxContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 652px;
    width: 190px;
`;

const SecondSelectboxContainer = styled.div`
    position: absolute;
    top: 30px; /* 첫 번째 Selectbox 아래로 배치 */
    left: 802px;
    width: 320px;
`;

const LineContainer = styled.div`
    position: absolute;
    top: 80px;
    width: 100%; /* 선의 너비 조정 */
`;

const TestBoxContainer = styled.div`
    position: absolute;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%; /* 부모 컨테이너에 맞게 늘림 */
`;

const Review2 = () => {
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
    const statusOptions = ['등록대기중', '등록완료', '등록취소'];
    const [dummyData, setDummyData] = useState(
        Array.from({ length: 8 }, (_, index) => ({
            id: index + 1, // 고유 ID 추가
            companyName: `회사 이름 ${index + 1}`,
            manufacturing: `제조 ${index + 1}`,
            period: "2024년 하반기",
            type: "신입",
            status: index % 3 === 0 ? "합격" : index % 3 === 1 ? "대기중" : "불합격",
            date: `2024.10.${27 - index}`,
            hiddenContent: `숨겨진 내용 ${index + 1}`,
            registrationStatus:statusOptions[Math.floor(Math.random() * statusOptions.length)]
        }))
    );

    const handleDelete = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setDummyData((prevData) => prevData.filter((item) => item.id !== id));
        }
    };

    const filteredData =
        selectedStatus === "전체"
            ? dummyData
            : dummyData.filter((data) => data.status === selectedStatus);

    return (
        <Container>
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
            <LineContainer>
                <HorizontalLine />
            </LineContainer>
            <TestBoxContainer>
                {filteredData.map((data) => (
                    <TestBox
                        key={data.id}
                        companyName={data.companyName}
                        manufacturing={data.manufacturing}
                        period={data.period}
                        type={data.type}
                        status={data.status}
                        date={data.date}
                        hiddenContent={data.hiddenContent}
                        onDelete={() => handleDelete(data.id)} // 삭제 기능 연결
                        registrationStatus={data.registrationStatus}
                    />
                ))}
            </TestBoxContainer>
        </Container>
    );
};

export default Review2;
