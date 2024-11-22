import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import EmailAndCareerInput from '../../../components/log/EmailAndCareerInput';
import GenderSelect from '../../../components/log/GenderSelect';
import EducationSelect from '../../../components/log/EducationSelect';
import axios from 'axios';

import {waitForSessionId } from '../../../context/SessionProvider';

const BasicPage = () => {
    const navigate = useNavigate();

    ///////////////// 로그인된 아이디 불러오는 코드
    const [sessionId, setSessionId] = useState(null);
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await waitForSessionId();
                setSessionId(sessionId);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };

        fetchSession();
    }, []);
    ////////////////////////////////////////////////////
    
    const [formData, setFormData] = useState({
        email: '',
        gender: '',
        experienceLevel: '',
        educationLevel: '',
        educationStatus: '',
    });

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log('Form Data:', formData); // 디버깅용 로그
    
        if (
            !formData.email.trim() ||
            !formData.gender ||
            !formData.experienceLevel ||
            !formData.educationLevel ||
            !formData.educationStatus
        ) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
    
        try {
            const userId = sessionId;
            const response = await axios.post('http://localhost:8080/api/update-user-info', {
                id: userId,
                email: formData.email,
                gender: formData.gender,
                experienceLevel: formData.experienceLevel,
                educationLevel: formData.educationLevel,
                educationStatus: formData.educationStatus,
            });
    
            if (response.status === 200) {
                alert('사용자 정보가 성공적으로 저장되었습니다.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('사용자 정보 저장 실패:', error);
            alert('정보 저장 중 문제가 발생했습니다.');
        }
    };
    


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
                        <EmailAndCareerInput
                            label="이메일"
                            placeholder="예) 1234@naver.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <GenderSelect
                            label="성별"
                            value={formData.gender}
                            onChange={(key, value) => handleInputChange(key, value)} // key와 value를 handleInputChange로 전달
                        />
                        <EmailAndCareerInput
                            label="경력"
                            placeholder="예) 신입"
                            value={formData.experienceLevel}
                            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                        />
                        <EducationSelect
                            label="최종 학력"
                            value={{
                                educationLevel: formData.educationLevel,
                                educationStatus: formData.educationStatus,
                            }}
                            onChange={(name, value) => handleInputChange(name, value)}
                        />
                        <ButtonContainer>
                            <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
                        </ButtonContainer>
                    </FormContainer>
                </Content>
            </PageContainer>
        </Container>
    );
};

export default BasicPage;

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
    position: relative;
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
    align-items: center;
`;

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Title = styled.h3`
    position: absolute;
    top: 130px;
    left: 440px;
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
