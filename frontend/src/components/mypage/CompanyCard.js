import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const CompanyCard = ({ logo, companyName, jobCount, onDelete, onClick }) => {
    return (
        <Card onClick={onClick}>
            <LogoWrapper>
                <Logo src={logo} alt={`${companyName} 로고`} />
            </LogoWrapper>
            <Content>
                <CompanyName>{companyName}</CompanyName>
                <JobCount>채용중 {jobCount}건</JobCount>
            </Content>
            <DeleteButton
                onClick={(e) => {
                    e.stopPropagation(); // 삭제 버튼 클릭 시 부모 클릭 이벤트 방지
                    onDelete();
                }}
            >
                <FaTrashAlt />
            </DeleteButton>
        </Card>
    );
};

export default CompanyCard;

// Styled Components
const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 435px; /* 카드 너비 */
    height: 100px; /* 카드 높이 */
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    cursor: pointer; /* 클릭 가능 표시 */

    &:hover {
        background-color: #f9f9f9;
    }
`;

const LogoWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
`;

const Logo = styled.img`
    width: 80%;
    height: 80%;
    object-fit: cover;
`;

const Content = styled.div`
    flex: 1;
    margin-left: 10px;
`;

const CompanyName = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

const JobCount = styled.span`
    font-size: 14px;
    color: #888;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #ff4d4d;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        color: #ff1a1a;
    }
`;
