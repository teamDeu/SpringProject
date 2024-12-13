import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  background: white;
  padding: 20px;
  width: 1400px;
  border: none;
  font-family: "Nanum Square Neo", sans-serif;
  margin-top:-20px;
  margin-left:-20px;
  
`;

const TitleBox = styled.div`
  background: white;
  padding-top: 20px;
  padding-left:5px;
  width: 1360px;
  border-top: 1px solid black;
  font-family: "Nanum Square Neo", sans-serif;
  margin-top : 0px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight : bold;
`;

const DateBox = styled.div`
  background: white;
  padding-top: 0px;
  padding-left:5px;
  width: 1360px;
  border-bottom: 1px solid #ccc;
  font-family: "Nanum Square Neo", sans-serif;
  margin-top : 0px;
  margin-bottom: 0px;
`;

const Date = styled.div`
  font-size: 16px;
  color: gray;
  margin-bottom: 20px;
`;

const ContentBox = styled.div`
  background: white;
  padding-top: 0px;
  padding-left:5px;
  width: 1360px;
  height:500px;
  border-bottom: 1px solid #ccc;
  font-family: "Nanum Square Neo", sans-serif;
  margin-top : 20px;
  margin-bottom: 0px;
`;

const Content = styled.div`
  font-size: 20px;
  line-height: 1.5;
  color: #333;
`;
const CloseButtonWrapper = styled.div`
  text-align: right; /* 버튼을 오른쪽으로 정렬 */
  margin-top: 0px; /* 위쪽 간격 추가 */
  margin-right: 30px;
`;
const CloseButton = styled.button`
  background: none;
  color: black;
  padding: 10px 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-family: "Nanum Square Neo", sans-serif;
  margin-top: 20px;
  margin-left:0px;
`;

const NoticeDetails = ({ title, content, date, onClose }) => {
    return (
      <Modal>
        <TitleBox>
            <Title>{title}</Title>
        </TitleBox>
        <DateBox><Date>등록일: {date}</Date></DateBox>
        <ContentBox><Content>{content}</Content></ContentBox>
        <CloseButtonWrapper>
        <CloseButton onClick={onClose}>목록</CloseButton>
      </CloseButtonWrapper>
      </Modal>
    );
  };

export default NoticeDetails;
