import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import Tabs from '../../../components/log/Tabs';
import SocialButtons from '../../../components/log/SocialButtons';
import LoginButton from '../../../components/log/LoginButton'; // 기존 버튼 컴포넌트 사용
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -70px;
    zoom: 0.6;
`;

const Title = styled.h1`
    font-size: 55px;
    color: #003366;
    margin-bottom: 20px;
`;

const Form = styled.div`
    width: 600px;
    padding: 40px;
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Separator = styled.hr`
    width: 100%;
    margin: 20px 0;
    border: 0.5px solid #ddd;
`;

const LinkTextContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #888;
`;

const Text = styled.span`
    margin-right: 8px;
`;

const LoginLinkButton = styled(Link)` 
    background: none;
    border: none;
    color: #003366;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline; /* 밑줄 유지 */
`;

const StyledLink = styled(Link)`
    width: 100%; 
    display: flex; 
    justify-content: center; /* 버튼이 가운데 정렬되도록 설정 */
    text-decoration: none; 
`;

const Index = () => {
    const [activeTab, setActiveTab] = useState('individual');

    return (
        <Container>
            <Title>구인구직</Title>
            <Form>
                <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
                <Separator />
                <div>소셜 계정으로 간편 로그인</div>
                <SocialButtons />
                <StyledLink to="/member2">
                    <LoginButton>회원가입</LoginButton>
                </StyledLink>
                <LinkTextContainer>
                    <Text>이미 계정이 있나요?</Text>
                    <LoginLinkButton to="/login">로그인</LoginLinkButton> {/* 링크 추가 */}
                </LinkTextContainer>
            </Form>
        </Container>
    );
};

export default Index;
