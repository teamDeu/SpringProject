import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import JobTopBar from '../../../components/JobTopBar';
import IDInput2 from '../../../components/mypage/IDinput2';
import ConfirmButton from '../../../components/mypage/ConfirmButton';
import CancelButton from '../../../components/mypage/CancelButton';
import { changePassword } from '../../../api/api'; // 비밀번호 변경 API 함수

const Index = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가

    // 비밀번호 변경 처리
    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        try {
            await changePassword(currentPassword, newPassword); // 비밀번호 변경 API 호출
            alert('비밀번호가 성공적으로 변경되었습니다.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            navigate('/mp1'); // 비밀번호 변경 후 mp1 페이지로 이동
        } catch (error) {
            console.error('Failed to change password:', error);
            if (error.response?.status === 400) {
                alert('현재 비밀번호가 일치하지 않습니다.');
            } else {
                alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    // 입력값 초기화
    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('비밀번호 변경이 취소되었습니다.');
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
                            <SectionTitle>비밀번호 변경</SectionTitle>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput2
                                label="현재 비밀번호"
                                placeholder="현재 비밀번호를 입력하세요"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <IDInput2
                                label="새 비밀번호"
                                placeholder="새 비밀번호를 입력하세요"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <IDInput2
                                label="새 비밀번호 확인"
                                placeholder="새 비밀번호를 다시 입력하세요"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Row>
                        <ButtonWrapper>
                            <ConfirmButton onClick={handlePasswordChange}>확인</ConfirmButton>
                            <CancelButton onClick={handleCancel}>취소</CancelButton>
                        </ButtonWrapper>
                    </Section>
                </FormContainer>
            </PageContent>
        </Container>
    );
};

export default Index;

// 스타일 정의는 변경하지 않고 기존 코드를 유지
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
