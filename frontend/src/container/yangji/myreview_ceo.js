import React, { useState } from 'react';
import CeoBox from '../../components/yangji/myreview/ceo_box';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto; /* 가로 중앙 정렬 */
    font-family: 'Nanum Square Neo', sans-serif;
`;

const TestBoxContainer = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center; /* 가운데 정렬 */
`;

const Review2 = () => {
    const numberOfBoxes = 8; // 데이터베이스에서 가져온 값
    const statusOptions = ['등록대기중', '등록완료', '등록취소'];
    const textTypeOptions = ['현직원', '전직원'];
    const [dummyData, setDummyData] = useState(
        Array.from({ length: numberOfBoxes }, (_, index) => ({
            id: index + 1, // 고유 id 추가
            companyImage: `/img/company-logo${index + 1}.png`,
            companyName: `회사 이름 ${index + 1}`,
            hiringCount: Math.floor(Math.random() * 10) + 1,
            date: `2024.10.${27 - index}`,
            registrationStatus: statusOptions[Math.floor(Math.random() * statusOptions.length)],
            textType: textTypeOptions[Math.floor(Math.random() * textTypeOptions.length)], // 현직원 또는 전직원 랜덤 설정
            textType1:"밥이 존맛탱",
        }))
    );

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setDummyData((prevData) => prevData.filter((item) => item.id !== id));
        }
    };

    return (
        <Container>
            <TestBoxContainer>
                {dummyData.map((data) => (
                    <CeoBox
                        key={data.id} // React에서 key를 추가해야 성능 최적화
                        companyImage={data.companyImage}
                        companyName={data.companyName}
                        hiringCount={data.hiringCount}
                        date={data.date}
                        onDelete={() => handleDelete(data.id)} // 삭제 기능 연결
                        registrationStatus={data.registrationStatus}
                        textType={data.textType} // textType 전달
                        textType1={data.textType1}
                    />
                ))}
            </TestBoxContainer>
        </Container>
    );
};

export default Review2;
