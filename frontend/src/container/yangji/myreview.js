import React, { useState } from "react";
import ChangeButton from '../../components/yangji/myreview/changebutton';
import MyReviewTest from "./myreview_test"; // 면접후기 컨테이너 컴포넌트
import MyReviewCEO from "./myreview_ceo"; // 기업리뷰 컨테이너 컴포넌트
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

function Main() {
  const [selectedComponent, setSelectedComponent] = useState("면접후기"); // 현재 선택된 컴포넌트 상태
  const handleButtonClick = (buttonType) => {
    setSelectedComponent(buttonType);
  };

  return (
    <>
        <JobTopBar />
        <Container>
            <Title>My 리뷰</Title>
            <div style={{ textAlign: "center"}}>
            <ChangeButton onButtonClick={handleButtonClick} />

            {/* 아래에 선택된 컴포넌트를 렌더링 */}
            <div style={{ marginTop: "20px" }}>
                {selectedComponent === "면접후기" && <MyReviewTest />}
                {selectedComponent === "기업리뷰" && <MyReviewCEO />}
            </div>
            </div>
        </Container>
        </>
  );
}

export default Main;
