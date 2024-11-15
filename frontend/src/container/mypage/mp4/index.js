// index.js
import React from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import IDInput2 from '../../../components/mypage/IDinput2';
import ConfirmButton from '../../../components/mypage/ConfirmButton';
import CancelButton from '../../../components/mypage/CancelButton';

const Index = () => {
    return (
        <Container>
            <HeaderContainer>
                <JobTopBar />
            </HeaderContainer>
            <PageContent>
                <FormContainer>
                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>비밀번호 변경</SectionTitle>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput2 label="현재 비밀번호" placeholder="12345" />
                        </Row>
                        <Row>
                            <IDInput2 label="새 비밀번호" placeholder="*****" />
                        </Row>
                        <Row>
                            <IDInput2 label="새 비밀번호 확인" placeholder="*****" />
                        </Row>
                        <ButtonWrapper>
                            <ConfirmButton>확인</ConfirmButton>
                            <CancelButton>취소</CancelButton>
                        </ButtonWrapper>
                    </Section>
                </FormContainer>
            </PageContent>
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

const PageContent = styled.div`
    width: 70%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

const FormContainer = styled.div`
    width: 100%;
    padding: 60px 300px;
    border: 1px solid #B5B5B5;
    border-radius: 8px;
    background-color: #fff;
`;

const Section = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const SectionTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;
