import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ jobId, company, title, experience, education, location, deadline, onSelect }) => {
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        onSelect(jobId, e.target.checked); // 체크박스 상태 전달
    };

    const handleApplyClick = () => {
        navigate(`/jobdetail/${jobId}`); // 해당 jobId를 사용해 JobDetail 페이지로 이동
    };

    return (
        <Wrapper>
            <CardContainer>
                <CheckboxContainer>
                    <input type="checkbox" onChange={handleCheckboxChange} />
                </CheckboxContainer>
                <ContentContainer>
                    <Company>{company}</Company>
                    <Title>{title}</Title>
                    <Details>
                        경력 | {experience || "무관"} &nbsp; 학력 | {education || "무관"} &nbsp; 근무지역 | {location || "미정"}
                    </Details>
                </ContentContainer>
                <ActionContainer>
                    <Deadline>마감일 {deadline || "미정"}</Deadline>
                    <ApplyButton onClick={handleApplyClick}>지원하기</ApplyButton>
                </ActionContainer>
            </CardContainer>
        </Wrapper>
    );
};

export default JobCard;

// Styled Components
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
`;

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const CheckboxContainer = styled.div`
    margin-right: 16px;
`;

const ContentContainer = styled.div`
    flex: 1;
`;

const Company = styled.div`
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-bottom: 8px;
`;

const Details = styled.div`
    font-size: 14px;
    color: #666;
`;

const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Deadline = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
`;

const ApplyButton = styled.button`
    width: 168px;
    padding: 8px;
    font-size: 18px;
    color: #fff;
    background-color: #00257A;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #001A5B;
    }
`;
