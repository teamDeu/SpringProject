import React, { useState } from 'react';
import Tabs from '../../components/log/Tabs';
import InputField from '../../components/log/InputField2';
import LoginButton from '../../components/log/LoginButton';
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
    width: 100%; /* 전체 너비로 설정 */
    max-width: 535px; /* 최대 너비를 설정하여 중앙 정렬 효과 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
    gap: 10px;
    margin-top: 20px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center; /* 중앙 정렬 */
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
    const [activeTab, setActiveTab] = useState('individual');

    const handleLinkClick = (type) => {
        switch(type) {
            case 'login':
                alert('로그인 클릭됨');
                break;
            case 'signup':
                alert('회원가입 클릭됨');
                break;
            case 'findPassword':
                alert('아이디 찾기 클릭됨');
                break;
            default:
                break;
        }
    };

    return (
        <Container>
            <Title>구인구직</Title>
            <FormContainer>
                <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
                <InnerForm>
                    <FormRow>
                        <InputWithButton>
                            <InputWrapper>
                                <InputField placeholder="새 비밀번호" />
                            </InputWrapper>
                        </InputWithButton>
                    </FormRow>
                    <FormRow>
                        <InputWithButton>
                            <InputWrapper>
                                <InputField placeholder="비밀번호 확인" />
                            </InputWrapper>
                        </InputWithButton>
                    </FormRow>
                    <FormRow>
                        <LoginButton>비밀번호 재설정</LoginButton>
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
