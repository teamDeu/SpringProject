import React from 'react';
import styled from 'styled-components';

const JobApplicationStatus = ({ company, title, location, deadline, status, statusColor, onViewResume }) => {
    console.log("JobApplicationStatus Props:", { company, title, location, deadline, status, statusColor }); // 전달받은 props 확인
    return (
        <Wrapper>
            <Card>
                <Info>
                    <Company>{company}</Company>
                    <Title>{title}</Title>
                    <Details>
                        <Detail>근무지역 {location}</Detail>
                        <Detail>마감일 {deadline}</Detail>
                    </Details>
                </Info>
                <StatusWrapper>
                    <Status style={{ color: statusColor }}>{status}</Status>
                </StatusWrapper>
            </Card>
        </Wrapper>
    );
};

export default JobApplicationStatus;

// Styled Components
const Wrapper = styled.div`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    width: 100%; /* 부모 컨테이너 너비를 채움 */
    padding: 5px 0;
`;

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    width: 100%; /* 카드 너비 */
    max-width: 1480px;
    height: 100px; /* 카드 높이 */
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Company = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    font-size: 14px;
    color: #666;
`;

const Title = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const Details = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    display: flex;
    gap: 15px;
    font-size: 14px;
    color: #888;
`;

const Detail = styled.span``;

const StatusWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Status = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    font-size: 16px;
    font-weight: bold;
`;
