import React, { useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import ChangeButton from '../../components/admin/ChangeButton';
import FaqForm from "../../components/admin/FqaForm";
import InfoBox from "../../components/admin/InfoBox"; // InfoBox 컴포넌트 import

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('../../fonts/NanumSquareNeo-aLt.ttf') format('truetype');
    font-style: normal;
  }

  #root {
    font-family: 'Nanum Square Neo', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  
`;

const Content = styled.div`
  padding: 40px;
  position: relative;
  border: 1px solid #B5B5B5;
  margin-left: 20px;
  width: 1400px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const ButtonCh = styled.div`
  width: 1440px;
  margin-left: -20px;
`;

const FormBox = styled.div`
  width: 1400px;
  height: auto;
  border: 1px solid white;
  margin-top: -30px;
  margin-left: -15px;
  padding: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  box-sizing: border-box;
`;

const AFaq = () => {
  const [selectedType, setSelectedType] = useState("individual"); // 기본값: 개인회원

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Menu />
        <MainContent>
          <PageHeader title="FAQ" />
          <Content>
            <Title>FAQ</Title>
            <InfoBox /> {/* 분리된 InfoBox 컴포넌트를 간단히 호출 */}
            <ButtonCh>
              <ChangeButton
                onButtonClick={(buttonLabel) => {
                  handleButtonClick(buttonLabel === "개인회원" ? "individual" : "corporate");
                }}
              />
            </ButtonCh>
            <FormBox>
              <FaqForm selectedType={selectedType} />
            </FormBox>
          </Content>
        </MainContent>
      </Container>
    </>
  );
};

export default AFaq;
