import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../components/log/InputField2';
import LoginButton from '../../../components/log/LoginButton';
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
    width: 100%;
    max-width: 535px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
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
    const navigate = useNavigate();
    const location = useLocation();
    const { id, phone } = location.state || {}; // 전달받은 ID와 전화번호
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handlePasswordReset = async () => {
        if (!form.newPassword || !form.confirmPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/reset-password-company', {
                id,
                phone,
                newPassword: form.newPassword,
            });
            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/clogin'); // 비밀번호 변경 후 기업 로그인 페이지로 이동
        } catch (error) {
            console.error('비밀번호 변경 실패:', error);
            alert('비밀번호 변경에 실패했습니다.');
        }
    };

    return (
        <Container>
            <Title>기업 비밀번호 재설정</Title>
            <FormContainer>
                <InnerForm>
                    <FormRow>
                        <InputField
                            name="newPassword"
                            placeholder="새 비밀번호"
                            type="password"
                            value={form.newPassword}
                            onChange={handleInputChange}
                        />
                    </FormRow>
                    <FormRow>
                        <InputField
                            name="confirmPassword"
                            placeholder="비밀번호 확인"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </FormRow>
                    <FormRow>
                        <LoginButton onClick={handlePasswordReset}>비밀번호 재설정</LoginButton>
                    </FormRow>
                    <LinkText>
                        <Link onClick={() => navigate('/clogin')}>로그인</Link> | 
                        <Link onClick={() => navigate('/cmember')}>회원가입</Link> | 
                        <Link onClick={() => navigate('/cfindid')}>아이디 찾기</Link>
                    </LinkText>
                </InnerForm>
            </FormContainer>
        </Container>
    );
};

export default Index;
