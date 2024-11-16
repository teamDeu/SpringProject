import React from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import ReviewButton from '../../components/yangji/review_button';
import HorizontalLine from '../../components/yangji/Line';
import CeoBox from '../../components/yangji/ceo_box';
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
    width: 100%; /* 선의 너비 조정 */
`;

const CeoBoxContainer = styled.div`
    position: absolute;
    top: 220px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%; /* 부모 컨테이너에 맞게 늘림 */
`;

const Review = () => {
    const dropdownOptions = ["조회순", "관심순"];

    const numberOfBoxes = 8; // 데이터베이스에서 가져온 값
    const dummyData = Array.from({ length: numberOfBoxes }, (_, index) => ({
        companyImage: `/img/company-logo${index + 1}.png`,
        companyName: `회사 이름 ${index + 1}`,
        hiringCount: Math.floor(Math.random() * 10) + 1,
        viewCount: Math.floor(Math.random() * 10000),
        heartCount: Math.floor(Math.random() * 10000),
    }));

    return (
        <>
        <JobTopBar />
        <Container>
            <Title>기업리뷰</Title>
            <SelectboxContainer>
                <Selectbox options={dropdownOptions} defaultOption="정렬" />
            </SelectboxContainer>
            <InputContainer>
                <Input />
            </InputContainer>
            <ButtonContainer>
                <ReviewButton text="기업 리뷰 등록하기" />
            </ButtonContainer>
            <LineContainer>
                <HorizontalLine />
            </LineContainer>
            <CeoBoxContainer>
                {dummyData.map((data, index) => (
                    <CeoBox
                        key={index}
                        companyImage={data.companyImage}
                        companyName={data.companyName}
                        hiringCount={data.hiringCount}
                        viewCount={data.viewCount}
                        heartCount={data.heartCount}
                    />
                ))}
            </CeoBoxContainer>
        </Container>
        </>
    );
};

export default Review;
