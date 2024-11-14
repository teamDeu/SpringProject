// index.js
import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/common/Header/Header';
import EmailAndCareerInput from '../../../components/log/EmailAndCareerInput';
import GenderSelect from '../../../components/log/GenderSelect';
import EducationSelect from '../../../components/log/EducationSelect';

const Index = () => {
    return (
        <Container>
            <HeaderContainer>
                <Header />
            </HeaderContainer>
            <PageContainer>
                <IntroContainer>
                    <IntroText>서비스 이용을 위해 기본 정보를 등록해 주세요.</IntroText>
                </IntroContainer>
                <Content>
                    <FormContainer>
                        <Title>기본 정보</Title>
                        <EmailAndCareerInput label="이메일" placeholder="예) 1234@naver.com" />
                        <GenderSelect label="성별" />
                        <EmailAndCareerInput label="경력" placeholder="예) 신입" />
                        <EducationSelect label="최종 학력" />
                        <ButtonContainer>
                            <SubmitButton>등록</SubmitButton>
                        </ButtonContainer>
                    </FormContainer>
                </Content>
            </PageContainer>
        </Container>
    );
};

export default Index;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderContainer = styled.div`
    width: 100%;
`;

const PageContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    position:relative;
`;

const IntroContainer = styled.div`
    width: 70%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
`;

const IntroText = styled.p`
    font-size: 35px;
    font-weight: bold;
    color: #333;
`;

const Content = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 입력 칸들을 중앙에 배치 */
`;

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* 입력 칸들을 중앙에 배치 */
    padding: 100px 0; /* 패딩을 조정하여 전체 중앙 배치 */
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Title = styled.h3`
    position: absolute;
    top: 130px;     /* 위쪽에서 10px */
    left: 440px;    /* 왼쪽에서 20px */
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    width: 115.22px;
    height: 61px;
    padding: 10px;
    background-color: #00257A;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: none;
    border-radius: 8.47222px;
    cursor: pointer;
    text-align: center;
`;
