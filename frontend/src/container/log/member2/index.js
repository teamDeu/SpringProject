import React, { useState } from 'react';
import axios from 'axios';
import LoginButton from '../../../components/log/LoginButton';
import InputField from '../../../components/log/InputField2';
import SmallButton from '../../../components/log/SmallButton';
import styled from 'styled-components';
import qs from 'qs';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 923px;
    padding: 40px;
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    zoom: 0.6;
`;

const Title = styled.h1`
    position: absolute;
    top: -90px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 55px;
    color: #003366;
    text-align: center;
    margin: 0;
`;

const FormContainer = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
`;

const Index = () => {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        birthDate: '',
        verificationCode: ''
    });
    const [isVerified, setIsVerified] = useState(false); // 인증 여부 상태

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendVerificationCode = () => {
        if (!formData.phone) {
            alert('전화번호를 입력해주세요.');
            return;
        }
        axios
            .post('/api/request-verification', qs.stringify({ phone: formData.phone }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                alert('인증번호가 발송되었습니다.');
            })
            .catch((error) => {
                console.error('인증번호 발송 오류:', error.response || error.message);
                alert('인증번호 발송 실패. 다시 시도해주세요.');
            });
    };

    const verifyCode = () => {
        if (!formData.phone || !formData.verificationCode) {
            alert('전화번호와 인증번호를 입력해주세요.');
            return;
        }
        axios
            .post('/api/verify-code', {
                phone: formData.phone,
                code: formData.verificationCode
            })
            .then(() => {
                alert('인증 성공');
                setIsVerified(true);
            })
            .catch(() => alert('인증 실패'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert('전화번호 인증을 완료해주세요.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        const payload = {
            id: formData.id,
            password: formData.password,
            name: formData.name,
            phone: formData.phone,
            birthDate: formData.birthDate
        };

        axios
            .post('/api/register', payload)
            .then(() => alert('회원가입 성공'))
            .catch(() => alert('회원가입 실패'));
    };

    return (
        <Container>
            <Title>구인구직</Title>
            <FormContainer onSubmit={handleSubmit}>
                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField
                                name="id"
                                placeholder="아이디"
                                value={formData.id}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <SmallButton>중복확인</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputField
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        name="name"
                        placeholder="이름"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField
                                name="phone"
                                placeholder="전화번호"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <SmallButton onClick={sendVerificationCode}>인증번호</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField
                                name="verificationCode"
                                placeholder="인증번호"
                                value={formData.verificationCode}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <SmallButton onClick={verifyCode}>재전송</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputField
                        name="birthDate"
                        placeholder="생년월일"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <LoginButton onClick={handleSubmit}>회원가입</LoginButton>
                </FormRow>
            </FormContainer>
        </Container>
    );
};

export default Index;
