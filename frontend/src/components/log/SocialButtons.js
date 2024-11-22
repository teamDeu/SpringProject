import React from 'react';
import styled from 'styled-components';

const SocialContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const SocialButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-color: ${props => props.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 10px;
    font-size: 24px;
    color: white;
`;

const SocialButtons = () => {
    const handleNaverLogin = () => {
        const clientId = 'h9QsqcHJaS5lXynuuh5t';
        const redirectUri = encodeURIComponent('http://localhost:3000/basic2');
        const state = Math.random().toString(36).substr(2, 12); // CSRF 방지용
        const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
        window.location.href = naverLoginUrl;
    };

    const handleKakaoLogin = () => {
        const clientId = 'ac8b78b524d0506d1a5aa3720f4ceff8';
        const redirectUri = encodeURIComponent('http://localhost:3000/basic2');
        const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        window.location.href = kakaoLoginUrl;
    };

    return (
        <SocialContainer>
            <SocialButton bgColor="#03C75A" onClick={handleNaverLogin}>N</SocialButton>
            <SocialButton bgColor="#FEE500" onClick={handleKakaoLogin}>K</SocialButton>
        </SocialContainer>
    );
};

export default SocialButtons;
