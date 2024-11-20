import React, { useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import ChangeButton from '../../components/admin/ChangeButton';
import FaqForm from "../../components/admin/FqaForm";

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
  max-height : 100vh;
  padding: 20px;
  box-sizing:border-box;
  overflow-y:scroll;
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

const InfoBox = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 16px;
  position: relative;
  margin-bottom: 40px;
`;

const InfoHeader = styled.p`
  font-size: 18px;
  font-weight: bold;
  white-space: pre-wrap; /* 줄바꿈을 반영하기 위해 추가 */
`;

const InfoDetail = styled.p`
  color: black;
  margin-top: 15px;
  line-height: 1.6;
  white-space: pre-wrap; 
`;

const EmailText = styled.p`
  margin-top: 15px;
  font-size: 15px;
  width: 1000px;
  color: blue;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-top: -10px;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #8A8A8A;
  background-color: #E8E8E8;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 15px; 
  font-family: 'Nanum Square Neo', sans-serif;
  height: 30px;
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #8A8A8A;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 15px;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const InputHeaderField = styled.textarea`
  width: 1330px; /* 고정된 넓이로 설정 */
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Nanum Square Neo', sans-serif;
  font-weight: bold;
  resize: none;
`;

const InputDetailField = styled.textarea`
  width: 1330px; /* 고정된 넓이로 설정 */
  height: 200px;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 5px;
  font-family: 'Nanum Square Neo', sans-serif;
  line-height: 1.6;
  resize: none;
`;

const InputEmailField = styled.input`
  width: 1330px; /* 고정된 넓이로 설정 */
  padding: 8px;
  margin-top: 10px;
  font-size: 15px;
  border: 1px solid #888;
  border-radius: 5px;
  font-family: 'Nanum Square Neo', sans-serif;
  color: blue;
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
  padding-top:0px;
  box-sizing: border-box;
`;

const Faq = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [infoHeader, setInfoHeader] = useState("추가 정보가 필요하시거나 문의할 내용이 있으면 아래의 이메일로 문의 부탁드립니다.");
  const [infoDetail, setInfoDetail] = useState("평일 09시 에서 17시 까지 문의하신 내용은 당일 답변해드립니다. \n 17시 이후에 문의하신 내용은 다음날에 답변, 주말에 문의하신 내용은 그 다음주 월요일에 답변해 드립니다.");
  const [email, setEmail] = useState("✉️ AAA@naver.com");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
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
            <InfoBox>
              {isEditing ? (
                <>
                  <InputHeaderField value={infoHeader} onChange={(e) => setInfoHeader(e.target.value)} />
                  <InputDetailField value={infoDetail} onChange={(e) => setInfoDetail(e.target.value)} />
                  <InputEmailField value={email} onChange={(e) => setEmail(e.target.value)} />
                  <ButtonContainer>
                    <SaveButton onClick={handleSaveClick}>저장</SaveButton>
                    <CancelButton onClick={handleCancelClick}>취소</CancelButton>
                  </ButtonContainer>
                </>
              ) : (
                <>
                  <InfoHeader>{infoHeader}</InfoHeader>
                  <InfoDetail>{infoDetail}</InfoDetail>
                  <EmailText>{email}</EmailText>
                  <ButtonContainer>
                    <EditButton onClick={handleEditClick}>수정</EditButton>
                  </ButtonContainer>
                </>
              )}
            </InfoBox>
            <ButtonCh>
              <ChangeButton onButtonClick={(buttonLabel) => console.log(`${buttonLabel} 버튼 클릭됨`)} />
            </ButtonCh>            
            <FormBox>
              <FaqForm/>
            </FormBox>
          </Content>
        </MainContent>
      </Container>
    </>
  );
};

export default Faq;
