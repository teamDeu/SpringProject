// IDWithSocialLogin.js
import React from 'react';
import styled from 'styled-components';

const IDWithSocialLogin = ({ label, socialText }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <SocialContainer>
                <KakaoIcon />
                <SocialText>{socialText}</SocialText>
            </SocialContainer>
        </Container>
    );
};

export default IDWithSocialLogin;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #ffffff;
    width: 100%;
    max-width: 1060px;
    height: 35px;
`;

const Label = styled.label`
    width: 60px;
    font-size: 16px;
    color: #333;
`;

const Divider = styled.span`
    margin: 0 10px;
    color: #ddd;
`;

const SocialContainer = styled.div`
    display: flex;
    align-items: center;
`;

const KakaoIcon = styled.div`
    width: 24px;
    height: 24px;
    background-color: #fee500;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;

    &::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background-color: #3c1e1e;
        border-radius: 50%;
    }
`;

const SocialText = styled.span`
    font-size: 16px;
    color: #333;
`;
