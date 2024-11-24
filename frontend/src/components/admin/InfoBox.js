import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetFAQTitle, UpdateFAQTitle } from '../../api/api' // API 호출 함수 임포트

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
  white-space: pre-wrap; /* 줄바꿈을 반영 */
`;

const InfoDetail = styled.p`
  color: black;
  margin-top: 15px;
  line-height: 1.6;
  white-space: pre-wrap; /* 줄바꿈을 반영 */
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
  const [faqData, setFaqData] = useState({
    header: "",
    content: "",
    email: "",
  });

  useEffect(() => {
    // FAQ 데이터를 가져오는 API 호출
    const fetchFAQData = async () => {
      try {
        const data = await GetFAQTitle(); // API 호출로 데이터 가져오기
        setFaqData(data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };


  //저장 버튼 클릭시 DB 업데이트
  const handleSaveClick = async () => {
    try {
      await UpdateFAQTitle(faqData.id, faqData); // DB 업데이트
      alert("저장되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating FAQ data:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  
  return (
    <InfoBoxContainer hideBorder={hideBorder} deletePadding={deletePadding}>
      {isEditing ? (
        <>
          <InputHeaderField
            value={faqData.header}
            onChange={(e) => setFaqData({ ...faqData, header: e.target.value })}
          />
          <InputDetailField
            value={faqData.content}
            onChange={(e) => setFaqData({ ...faqData, content: e.target.value })}
          />
          <InputEmailField
            value={faqData.email}
            onChange={(e) => setFaqData({ ...faqData, email: e.target.value })}
          />
          <ButtonContainer>
            <SaveButton onClick={handleSaveClick}>저장</SaveButton>
            <CancelButton onClick={handleCancelClick}>취소</CancelButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <InfoHeader>{faqData.header}</InfoHeader>
          <InfoDetail>{faqData.content}</InfoDetail>
          <EmailText>{faqData.email}</EmailText>
          <ButtonContainer>
            {!hideEditButton && <EditButton onClick={handleEditClick}>수정</EditButton>}
          </ButtonContainer>
        </>
      )}
    </InfoBoxContainer>
  );
};

export default InfoBox;