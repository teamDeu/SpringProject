import React from 'react';
import styled from 'styled-components';

const JobApplicationStatus = ({ company, title, location, deadline, status, statusColor, onViewResume }) => {
    return (
        <Wrapper>
            <Card>
                <Info>
                    <Company>{company}</Company>
                    <Title>{title}</Title>
                    <Details>
                        <Detail>근무지역 {location}</Detail>
                        <Detail>접수일 {deadline}</Detail>
                    </Details>
                </Info>
                <StatusWrapper>
                    <Status style={{ color: statusColor }}>{status}</Status>
                    <ViewResume onClick={onViewResume}>[이력서 보기]</ViewResume>
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
    width: 1480px; /* 카드 너비 */
    height: 100px; /* 카드 높이 */
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Company = styled.div`
    font-size: 14px;
    color: #666;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const Details = styled.div`
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
    font-size: 16px;
    font-weight: bold;
`;

const ViewResume = styled.div`
    font-size: 14px;
    color: #888;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
