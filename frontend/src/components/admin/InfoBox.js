import React, { useState } from "react";
import styled from "styled-components";

const InfoBoxContainer = styled.div`
  border: ${(props) => (props.hideBorder ? "none" : "1px solid #ccc")}; 
  padding: ${(props) => (props.deletePadding ? "0px" : "20px")}; 
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
  font-family: "Nanum Square Neo", sans-serif;
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
  font-family: "Nanum Square Neo", sans-serif;
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
  font-family: "Nanum Square Neo", sans-serif;
`;

const InputHeaderField = styled.textarea`
  width: 1330px;
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "Nanum Square Neo", sans-serif;
  font-weight: bold;
  resize: none;
`;

const InputDetailField = styled.textarea`
  width: 1330px;
  height: 200px;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 5px;
  font-family: "Nanum Square Neo", sans-serif;
  line-height: 1.6;
  resize: none;
`;

const InputEmailField = styled.input`
  width: 1330px;
  padding: 8px;
  margin-top: 10px;
  font-size: 15px;
  border: 1px solid #888;
  border-radius: 5px;
  font-family: "Nanum Square Neo", sans-serif;
  color: blue;
`;

const InfoBox = ({ hideBorder = false, deletePadding = false, hideEditButton = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [infoHeader, setInfoHeader] = useState(
    "추가 정보가 필요하시거나 문의할 내용이 있으면 아래의 이메일로 문의 부탁드립니다."
  );
  const [infoDetail, setInfoDetail] = useState(
    "평일 09시 에서 17시 까지 문의하신 내용은 당일 답변해드립니다. \n 17시 이후에 문의하신 내용은 다음날에 답변, 주말에 문의하신 내용은 그 다음주 월요일에 답변해 드립니다."
  );
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
    <InfoBoxContainer hideBorder={hideBorder} deletePadding={deletePadding}>
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
          {!hideEditButton && <EditButton onClick={handleEditClick}>수정</EditButton>}
          </ButtonContainer>
        </>
      )}
    </InfoBoxContainer>
  );
};

export default InfoBox;
