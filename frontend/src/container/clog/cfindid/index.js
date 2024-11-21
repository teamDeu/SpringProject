import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/log/InputField2';
import LoginButton from '../../../components/log/LoginButton';
import SmallButton from '../../../components/log/SmallButton';
import Modal from '../../../components/log/Modal';
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
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
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
    const navigate = useNavigate();
    const [form, setForm] = useState({
        manager_name: '',
        phone: '',
        verificationCode: '',
        verified: false,
    });
    const [foundId, setFoundId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const sendVerificationCode = async () => {
        try {
            await axios.post('http://localhost:8080/api/find-id-company/request-verification', {
                phone: form.phone,
            });
            alert('인증번호가 발송되었습니다.');
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
            alert('인증번호 발송에 실패했습니다.');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/find-id-company/verify-code?phone=${form.phone}&code=${form.verificationCode}`
            );
            if (response.data) {
                alert('인증 성공');
                setForm((prevForm) => ({ ...prevForm, verified: true }));
            } else {
                alert('인증 실패');
            }
        } catch (error) {
            console.error('인증 실패:', error);
            alert('인증에 실패했습니다.');
        }
    };

    const findId = async () => {
        if (!form.verified) {
            alert('먼저 전화번호 인증을 완료해주세요.');
            return;
        }
        try {
            const response = await axios.get(
                `http://localhost:8080/api/find-id-company/search?name=${form.manager_name}&phone=${form.phone}`
            );
            setFoundId(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('아이디 찾기 실패:', error);
            alert('일치하는 회사 정보를 찾을 수 없습니다.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLinkClick = (type) => {
        switch (type) {
            case 'clogin':
                navigate('/clogin'); // 기업 로그인 페이지로 이동
                break;
            case 'cmember':
                navigate('/cmember'); // 기업 회원가입 페이지로 이동
                break;
            case 'cfindpwd':
                navigate('/cfindpwd'); // 기업 아이디 찾기 페이지로 이동
                break;
            default:
                break;
        }
    };

    return (
        <Container>
            <Title>기업 아이디 찾기</Title>
            <FormContainer>
                <InnerForm>
                    <FormRow>
                        <InputField
                            name="manager_name"
                            placeholder="담당자 이름"
                            value={form.manager_name}
                            onChange={handleInputChange}
                        />
                    </FormRow>
                    <FormRow>
                        <InputWithButton>
                            <InputWrapper>
                                <InputField
                                    name="phone"
                                    placeholder="전화번호"
                                    value={form.phone}
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
                                    value={form.verificationCode}
                                    onChange={handleInputChange}
                                />
                            </InputWrapper>
                            <SmallButton onClick={verifyCode}>확인</SmallButton>
                        </InputWithButton>
                    </FormRow>
                    <FormRow>
                        <LoginButton onClick={findId}>아이디 찾기</LoginButton>
                    </FormRow>
                </InnerForm>
                <LinkText>
                    <Link onClick={() => handleLinkClick('clogin')}>로그인</Link> | 
                    <Link onClick={() => handleLinkClick('cmember')}>회원가입</Link> | 
                    <Link onClick={() => handleLinkClick('cfindpwd')}>비밀번호 찾기</Link>
                </LinkText>
            </FormContainer>
            {isModalOpen && (
                <Modal
                    title="아이디 찾기 결과"
                    content={`회원님의 아이디는 "${foundId}" 입니다.`}
                    onClose={closeModal}
                />
            )}
        </Container>
    );
};

export default Index;
