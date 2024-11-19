import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import Tabs from '../../../components/log/Tabs';
import InputField from '../../../components/log/InputField2';
import LoginButton from '../../../components/log/LoginButton';
import SmallButton from '../../../components/log/SmallButton';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Title = styled.h1`
    font-size: 45px;
    color: #003366;
    margin-bottom: 20px;
    text-align: center;
`;

const FormContainer = styled.div`
    width: 923px;
    padding: 40px;
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    zoom: 0.6;
`;

const InnerForm = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const InputWithButton = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const InputWrapper = styled.div`
    flex: 1;
    margin-right: 2px;
`;

const LinkText = styled.div`
    text-align: center;
    font-size: 14px;
    color: #888;
    margin-top: 20px;
`;

const Link = styled.span`
    font-weight: bold;
    cursor: pointer;
    margin: 0 5px;
    text-decoration: underline;
    &:hover {
        color: #003366;
    }
`;

const Index = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLinkClick = (type) => {
        switch (type) {
            case 'login':
                navigate('/login'); // 로그인 페이지로 이동
                break;
            case 'signup':
                navigate('/member'); // 회원가입 페이지로 이동
                break;
            case 'findPassword':
                navigate('/findid'); // 아이디 찾기 페이지로 이동
                break;
            default:
                break;
        }
    };

    return (
        <Container>
            <Title>구인구직</Title>
            <FormContainer>
                <Tabs activeTab="individual" />
                <InnerForm>
                    <FormRow>
                        <InputField placeholder="아이디" />
                    </FormRow>
                    <FormRow>
                        <InputWithButton>
                            <InputWrapper>
                                <InputField placeholder="전화번호" />
                            </InputWrapper>
                            <SmallButton>인증번호</SmallButton>
                        </InputWithButton>
                    </FormRow>
                    <FormRow>
                        <InputWithButton>
                            <InputWrapper>
                                <InputField placeholder="인증번호" />
                            </InputWrapper>
                            <SmallButton>재전송</SmallButton>
                        </InputWithButton>
                    </FormRow>
                    <FormRow>
                        <LoginButton>비밀번호 찾기</LoginButton>
                    </FormRow>
                    <LinkText>
                        <Link onClick={() => handleLinkClick('login')}>로그인</Link> | 
                        <Link onClick={() => handleLinkClick('signup')}>회원가입</Link> | 
                        <Link onClick={() => handleLinkClick('findPassword')}>아이디 찾기</Link>
                    </LinkText>
                </InnerForm>
            </FormContainer>
        </Container>
    );
};

export default Index;
