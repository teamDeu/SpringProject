// TabComponent.js
import React, { useState } from 'react';
import styled from 'styled-components';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState('스크랩');

    return (
        <TabContainer>
            <Tab
                isActive={activeTab === '스크랩'}
                onClick={() => setActiveTab('스크랩')}
            >
                스크랩
            </Tab>
            <Tab
                isActive={activeTab === '관심기업'}
                onClick={() => setActiveTab('관심기업')}
            >
                관심기업
            </Tab>
        </TabContainer>
    );
};

export default TabComponent;

const TabContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Tab = styled.div`
    font-size: 16px;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    color: ${({ isActive }) => (isActive ? '#000' : '#888')};
    cursor: pointer;
    position: relative;

    &:after {
        content: '';
        display: ${({ isActive }) => (isActive ? 'block' : 'none')};
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #00257A; /* 밑줄 색상 */
    }
`;
