import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    flex: 1;
    padding: 10px;
    font-size: 24px;
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
    color: ${props => (props.active ? '#003366' : '#888')};
    border: none;
    border-bottom: ${props => (props.active ? '2px solid #003366' : '1px solid #ddd')};
    background: none;
    cursor: pointer;
`;

const Tabs = ({ activeTab, onTabClick }) => {
    return (
        <TabContainer>
            <Tab active={activeTab === 'individual'} onClick={() => onTabClick('individual')}>
                개인회원
            </Tab>
            <Tab active={activeTab === 'business'} onClick={() => onTabClick('business')}>
                기업회원
            </Tab>
        </TabContainer>
    );
};

export default Tabs;
