import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import EmailAndCareerInput from '../../../components/log/EmailAndCareerInput2';
import PasswordInput from '../../../components/mypage/PasswordInput';
import EditButton from '../../../components/mypage/EditButton2';
import IDInput from '../../../components/mypage/IDinput';
import GenderSelect from '../../../components/log/GenderSelect';
import EducationSelect from '../../../components/log/EducationSelect';
import { getUserInfo, updateUserInfo } from '../../../api/api'; // 수정 API 추가

const Index = () => {
    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
        name: '',
        phone: '',
        birthDate: '',
        email: '',
        gender: '',
        experienceLevel: '',
        educationLevel: '',
        educationStatus: '',
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleChange = (key, value) => {
        setUserInfo((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        console.log('Saving user info:', userInfo); // 로그 확인
        try {
            await updateUserInfo(userInfo);
            alert('정보가 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('Failed to update user info:', error);
            alert('정보 저장에 실패했습니다.');
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
                            <EditButton onClick={handleSave}>저장</EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput
                                label="아이디"
                                placeholder="아이디를 입력하세요"
                                value={userInfo.id}
                                readOnly
                            />
                        </Row>
                        <Row>
                            <PasswordInput
                                label="비밀번호"
                                placeholder="비밀번호를 입력하세요"
                                value={userInfo.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </Row>
                        <Row>
                            <EmailAndCareerInput
                                label="이름"
                                placeholder="이름을 입력하세요"
                                value={userInfo.name} // 상위 상태 전달
                                onChange={(value) => handleChange('name', value)} // 상위 상태 업데이트 함수 전달
                            />
                        </Row>
                        <Row>
                            <EmailAndCareerInput
                                label="전화번호"
                                placeholder="전화번호를 입력하세요"
                                value={userInfo.phone}
                                onChange={(value) => handleChange('phone', value)}
                            />
                        </Row>
                        <Row>
                            <EmailAndCareerInput
                                label="생년월일"
                                placeholder="YYYY-MM-DD"
                                value={userInfo.birthDate}
                                onChange={(value) => handleChange('birthDate', value)}
                            />
                        </Row>


                    </Section>

                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>기본 정보</SectionTitle>
                            <EditButton onClick={handleSave}>저장</EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <EmailAndCareerInput
                                label="이메일"
                                placeholder="이메일을 입력하세요"
                                value={userInfo.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Row>
                        <Row>
                            <GenderSelect
                                label="성별"
                                value={userInfo.gender}
                                onChange={handleChange}
                            />
                        </Row>
                        <Row>
                            <EmailAndCareerInput
                                label="경력"
                                placeholder="경력을 입력하세요"
                                value={userInfo.experienceLevel}
                                onChange={(e) => handleChange('experienceLevel', e.target.value)}
                            />
                        </Row>
                        <Row>
                            <EducationSelect
                                label="최종 학력"
                                value={{
                                    educationLevel: userInfo.educationLevel,
                                    educationStatus: userInfo.educationStatus,
                                }}
                                onChange={handleChange}
                            />
                        </Row>
                    </Section>
                </FormContainer>
            </PageContent>
        </Container>
    );
};

export default Index;

// CSS 스타일 유지
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
