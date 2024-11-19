import React, { useState } from 'react';
import HiddenBox from '../hiddenbox';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 1px;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const OuterBox = styled.div`
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 153px;
    position: relative;
    border-bottom: none;
    display: flex; /* Flexbox 레이아웃 */
    align-items: center; /* 세로 중앙 정렬 */
    padding: 0 20px; /* 양쪽 패딩 */
    box-sizing: border-box;
`;

const CompanyName = styled.div`
    color: #000000;
    font-size: 24px;
    font-weight: 700;
    margin-right: 30px;
    margin-left: 50px;
    margin-top: -30px;
`;

const JobDetails = styled.div`
    color: #000000;
    font-size: 18px;
    position: absolute;
    left: 70px;
    top: 100px;
`;

const StatusBox = styled.div`
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
`;

const StatusText = styled.div`
    color: ${({ status }) => (status === '합격' ? '#1a28f4' : status === '대기중' ? '#ffaa00' : '#ff0000')};
    font-size: 16px;
    font-weight: 400;
`;

const DateText = styled.div`
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    position: absolute;
    left: 1050px;
    top: 88px;
`;

const RegistrationStatus = styled.div`
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: ${({ status }) =>
        status === '등록대기중'
            ? '#1a28f4'
            : status === '등록완료'
            ? '#28a745'
            : '#dc3545'}; /* 파랑, 초록, 빨강 */
    position: absolute;
    left: 1050px; /* 좌표 설정 */
    top: 58px; /* 좌표 설정 */
`;

const StatusImage = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 1180px; /* 좌표 설정 */
    top: 68px; /* 좌표 설정 */
    cursor: pointer; /* 클릭 가능 표시 */
`;

const TestBox = ({
    companyName,
    manufacturing,
    period,
    type,
    status,
    date,
    onDelete,
    registrationStatus
}) => {

    return (
        <Container>
            <OuterBox>
                <CompanyName>{companyName}</CompanyName>
                <JobDetails>
                    {manufacturing} | {period} | {type}
                </JobDetails>
                <StatusBox>
                    <StatusText status={status}>{status}</StatusText>
                </StatusBox>
                <DateText>{date}</DateText>
            </OuterBox>
            <StatusImage
                src="/img/trashcan.png" /* 쓰레기통 이미지 */
                alt="Delete Icon"
                onClick={onDelete} /* 삭제 함수 호출 */
            />
            <RegistrationStatus status={registrationStatus}>
                {registrationStatus}
            </RegistrationStatus>
            <HiddenBox
                isVisible={true} /* 항상 보이도록 설정 */
                interviewType="직무 및 인성 면접"
                interviewPeople="지원자 1명, 면접관 다수"
                interviewQuestions={[
                    "지원 동기와 본인의 장단점은 무엇인가요?",
                    "이전에 겪었던 갈등 상황과 해결 방법은?",
                    "회사를 선택한 이유는 무엇인가요?"
                ]}
                tips="준비한 답변을 자연스럽게 말하고, 회사에 대한 정보를 충분히 숙지하세요."
            />
        </Container>
    );
};

export default TestBox;
