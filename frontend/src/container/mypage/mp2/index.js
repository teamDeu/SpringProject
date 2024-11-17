// index.js
import React from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar2';
import EmailAndCareerInput from '../../../components/log/EmailAndCareerInput';
import PasswordInput from '../../../components/mypage/PasswordInput';
import EditButton from '../../../components/mypage/EditButton2';
import IDInput from '../../../components/mypage/IDinput';
import GenderSelect from '../../../components/log/GenderSelect';
import EducationSelect from '../../../components/log/EducationSelect';


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
                            <EditButton></EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput label="아이디" placeholder="1234" />
                        </Row>
                        <Row>
                            <PasswordInput label="비밀번호" placeholder="*****" />
                        </Row>
                        <Row>
                            <EmailAndCareerInput label="이름" placeholder="박정현" />
                        </Row>
                        <Row>
                            <EmailAndCareerInput label="전화번호" placeholder="010-8013-1233" />
                        </Row>
                        <Row>
                            <EmailAndCareerInput label="생년월일" placeholder="1997.05.08" />
                        </Row>
                    </Section>

                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>기본 정보</SectionTitle>
                            <EditButton></EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <EmailAndCareerInput label="이메일" placeholder="1234@naver.com" />
                        </Row>
                        <Row>
                            <GenderSelect label="성별"  />
                        </Row>
                        <Row>
                            <EmailAndCareerInput label="경력" placeholder="신입" />
                        </Row>
                        <Row>
                            <EducationSelect label="최종 학력" />
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
    border: 1px solid #B5B5B5; /* 테두리 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
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

export default Index;

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