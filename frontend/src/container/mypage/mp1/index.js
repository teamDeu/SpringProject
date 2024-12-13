// index.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import JobTopBar from '../../../components/JobTopBar';
import IDInput from '../../../components/mypage/IDinput3';
import PasswordInput from '../../../components/mypage/PasswordInput';
import EditButton from '../../../components/mypage/EditButton';
import { getUserInfo, deleteUserAccount } from '../../../api/api';

const Index = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo(); // API 호출
                setUserInfo(response);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                if (error.response?.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login');
                }
            }
        };
        fetchUserInfo();
    }, [navigate]);

    const handleEdit = () => {
        navigate('/mp2', { state: userInfo }); // MP2로 데이터 전달
    };
    
    const handleDeleteAccount = async () => {
        if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
            try {
                await deleteUserAccount(); // API 호출
                alert('회원탈퇴가 완료되었습니다.');
                navigate('/login');
            } catch (error) {
                console.error('Failed to delete account:', error);
                alert('회원탈퇴에 실패했습니다.');
            }
        }
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
                            <EditButton onClick={handleEdit}>수정</EditButton> {/* 수정 버튼 */}
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput
                                label="아이디"
                                value={userInfo?.id || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <PasswordInput
                                label="비밀번호"
                                value={userInfo?.password || '*****'}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="이름"
                                value={userInfo?.name || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="전화번호"
                                value={userInfo?.phone || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="생년월일"
                                value={userInfo?.birthDate || ''}
                                readOnly
                            />
                        </Row>
                    </Section>

                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>기본 정보</SectionTitle>
                            <EditButton>수정</EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput
                                label="이메일"
                                value={userInfo?.email || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="성별"
                                value={userInfo?.gender || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="경력"
                                value={userInfo?.experienceLevel || ''}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <IDInput
                                label="최종 학력"
                                value={userInfo?.educationLevel || ''}
                                readOnly
                            />
                        </Row>

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

