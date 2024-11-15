// index.js
import React from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import IDInput from '../../../components/mypage/IDinput';
import PasswordInput from '../../../components/mypage/PasswordInput';
import EditButton from '../../../components/mypage/EditButton';
import IDWithSocialLogin from '../../../components/mypage/IDWithSocialLogin';

const Index = () => {
    const handleDeleteAccount = () => {
        alert("회원탈퇴 버튼이 클릭되었습니다.");
        // 회원탈퇴 로직을 여기에 추가
    };

    return (
        <Container>
            <HeaderContainer>
                <JobTopBar />
            </HeaderContainer>
            <PageContent>
                <FormContainer>
                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>로그인 정보</SectionTitle>
                        </SectionTitleWrapper>
                        <Row>
                            <IDWithSocialLogin label="아이디" socialText="카카오톡 로그인" />
                        </Row>
                    </Section>

                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>기본 정보</SectionTitle>
                            <EditButton>수정</EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput label="이름" placeholder="박정현" />
                        </Row>
                        <Row>
                            <IDInput label="전화번호" placeholder="010-8013-1233" />
                        </Row>
                        <Row>
                            <IDInput label="생년월일" placeholder="1997.05.08" />
                        </Row>
                        <Row>
                            <IDInput label="이메일" placeholder="1234@naver.com" />
                        </Row>
                        <Row>
                            <IDInput label="성별" placeholder="남" />
                        </Row>
                        <Row>
                            <IDInput label="경력" placeholder="신입" />
                        </Row>
                        <Row>
                            <IDInput label="최종 학력" placeholder="대학교(4년) 졸업 예정" />
                        </Row>
                        <DeleteAccountWrapper>
                            <DeleteAccountButton onClick={handleDeleteAccount}>회원탈퇴</DeleteAccountButton>
                        </DeleteAccountWrapper>
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

const DeleteAccountWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const DeleteAccountButton = styled.button`
    background: none;
    border: none;
    color: #888;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #333;
    }
`;
