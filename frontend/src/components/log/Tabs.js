import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    font-family: 'NanumSquare Neo';
    flex: 1;
    padding: 10px;
    font-size: 33px;
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
    color: ${props => (props.active ? '#003366' : '#888')};
    border: none;
    border-bottom: ${props => (props.active ? '2px solid #003366' : '1px solid #ddd')};
    background: none;
    cursor: pointer;
    margin: 0 70px;
`;

const Tabs = ({ activeTab, onTabClick }) => {
    const navigate = useNavigate(); // useNavigate를 사용하여 경로 이동

    const handleTabClick = (tab) => {
        if (onTabClick) {
            onTabClick(tab); // 부모 상태 업데이트
        }
        // 개인회원 또는 기업회원에 따라 경로 이동
        if (tab === 'individual') {
            navigate('/login'); // 개인회원 로그인 페이지로 이동
        } else if (tab === 'business') {
            navigate('/clogin'); // 기업회원 로그인 페이지로 이동
        }
    };

    return (
        <TabContainer>
            <Tab active={activeTab === 'individual'} onClick={() => handleTabClick('individual')}>
                개인회원
            </Tab>
            <Tab active={activeTab === 'business'} onClick={() => handleTabClick('business')}>
                기업회원
            </Tab>
        </TabContainer>
    );
};

export default Tabs;
