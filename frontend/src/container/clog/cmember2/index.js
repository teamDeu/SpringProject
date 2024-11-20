import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../../../components/log/LoginButton';
import InputField from '../../../components/log/InputField2';
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

const FormContainer = styled.form`
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

const Cmember2 = () => {
    const [formData, setFormData] = useState({
        id: '',
        pwd: '',
        confirmPassword: '',
        manager_name: '',
        manager_phone: '',
        verificationCode: ''
    });
    const [isVerified, setIsVerified] = useState(false);
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const checkDuplicate = () => {
        if (!formData.id) {
            alert('아이디를 입력해주세요.');
            return;
        }

        axios.get(`http://localhost:8080/check-duplicate_company?id=${formData.id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('아이디 사용 가능');
                    setIsDuplicateChecked(true);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert('아이디가 이미 존재합니다.');
                } else {
                    alert('서버와 통신 중 오류가 발생했습니다.');
                }
                setIsDuplicateChecked(false);
            });
    };

    const sendVerificationCode = () => {
        if (!formData.manager_phone) {
            alert('전화번호를 입력해주세요.');
            return;
        }

        axios.post('http://localhost:8080/api/request_company', { phone: formData.manager_phone })
            .then(() => {
                alert('인증번호가 발송되었습니다.');
            })
            .catch(() => {
                alert('인증번호 발송 실패. 다시 시도해주세요.');
            });
    };

    const verifyCode = () => {
        if (!formData.manager_phone || !formData.verificationCode) {
            alert('전화번호와 인증번호를 입력해주세요.');
            return;
        }

        axios.post('http://localhost:8080/api/verify-code_company', {
            phone: formData.manager_phone,
            code: formData.verificationCode
        })
        .then(() => {
            alert('인증 성공');
            setIsVerified(true);
        })
        .catch(() => {
            alert('인증 실패');
            setIsVerified(false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isDuplicateChecked) {
            alert('아이디 중복확인을 해주세요.');
            return;
        }

        if (!isVerified) {
            alert('전화번호 인증을 완료해주세요.');
            return;
        }

        if (formData.pwd !== formData.confirmPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        axios.post('http://localhost:8080/api/register_company', {
            id: formData.id,
            pwd: formData.pwd,
            managerName: formData.manager_name,
            managerPhone: formData.manager_phone
        })
        .then(() => {
            alert('회원가입 성공');
            navigate('/login'); // 로그인 페이지로 이동
        })
        .catch((error) => {
            console.error("회원가입 오류: ", error);
            alert('회원가입 실패');
        });
    };

    return (
        <Container>
            <Title>기업 회원가입</Title>
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
                        <SmallButton type="button" onClick={checkDuplicate}>중복확인</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputField
                        name="pwd"
                        placeholder="비밀번호"
                        type="password"
                        value={formData.pwd}
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
                        name="manager_name"
                        placeholder="담당자 이름"
                        value={formData.manager_name}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField
                                name="manager_phone"
                                placeholder="담당자 전화번호"
                                value={formData.manager_phone}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <SmallButton type="button" onClick={sendVerificationCode}>인증번호</SmallButton>
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
                        <SmallButton type="button" onClick={verifyCode}>확인</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <LoginButton type="submit">회원가입</LoginButton>
                </FormRow>
            </FormContainer>
        </Container>
    );
};

export default Cmember2;
