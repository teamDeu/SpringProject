import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import EmailAndCareerInput from '../../../components/log/EmailAndCareerInput';
import GenderSelect from '../../../components/log/GenderSelect';
import EducationSelect from '../../../components/log/EducationSelect';
import axios from 'axios';
import { waitForSessionId } from '../../../context/SessionProvider';
import { GetSessionId } from '../../../api/api';

const Index = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        experienceLevel: '',
        educationLevel: '',
        educationStatus: '',
    });

    const [sessionId, setSessionId] = useState(null);

    // 세션 ID 가져오기
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await GetSessionId();
                console.log('세션 확인 응답:', response);
                setSessionId(response); // 세션 ID 설정
            } catch (error) {
                console.error('세션 확인 실패:', error);
                const userIdFromLocalStorage = localStorage.getItem('userId');
                if (userIdFromLocalStorage) {
                    setSessionId(userIdFromLocalStorage);
                } else {
                    alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
                    navigate('/login'); // 로그인 페이지로 이동
                }
            }
        };

        fetchSession();
    }, [navigate]);

    // 입력값 핸들러
    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // 폼 제출 처리
    const handleSubmit = async () => {
        try {
            const userId = sessionId; // 세션 ID 또는 로컬 스토리지에서 가져온 사용자 ID
            if (!userId) {
                alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
                return;
            }
            console.log('저장할 사용자 ID:', userId);

            const response = await axios.post('http://localhost:8080/api/update-or-create-user', {
                id: userId,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                gender: formData.gender,
                experienceLevel: formData.experienceLevel,
                educationLevel: formData.educationLevel,
                educationStatus: formData.educationStatus,
            });

            if (response.status === 200) {
                alert('사용자 정보가 성공적으로 저장되었습니다.');
                navigate('/dashboard'); // 대시보드 페이지로 이동
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
                            label="이름"
                            placeholder="예) 홍길동"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <EmailAndCareerInput
                            label="전화번호"
                            placeholder="예) 01012341234"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                        <EmailAndCareerInput
                            label="이메일"
                            placeholder="예) 1234@naver.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <GenderSelect
                            label="성별"
                            value={formData.gender}
                            onChange={(key, value) => handleInputChange(key, value)}
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
