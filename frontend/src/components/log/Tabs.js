//로그인 폼 상단 "게인회원", "기업회원 " 탭 

// Tabs.js
import React from 'react';

function Tabs({activeTab, onTabClick }) {
    return (
        <Tab>
            <Textbutton 
                className={activeTab === 'individual' ? 'active-tab' : ''}
                onClick={() => onTabClick('individual')}
            >
                개인회원
            </Textbutton>
            <button 
                className={activeTab === 'company' ? 'active-tab' : ''}
                onClick={() => onTabClick('company')}
            >
                기업회원
            </button>
        </Tab>
    );
}

export default Tabs;

const Tab = styled.div`

`