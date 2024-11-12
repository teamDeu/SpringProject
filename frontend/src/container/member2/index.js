import React from 'react';
import LoginButton from '../../components/log/LoginButton';
import InputField from '../../components/log/InputField2';
import SmallButton from '../../components/log/SmallButton';
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
    zoom:0.6;
`;

const Title = styled.h1`
    position: absolute;
    top: -90px; /* Title을 Container 영역 위에 고정 */
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
    gap:10px;
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
    return (
        <Container>
            <Title>구인구직</Title> {/* Title을 Container의 상단에 고정 */}
            <FormContainer>
                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField placeholder="아이디" />
                        </InputWrapper>
                        <SmallButton>중복확인</SmallButton>
                    </InputWithButton>
                </FormRow>
                
                <FormRow>
                    <InputField placeholder="비밀번호" type="password" />
                </FormRow>

                <FormRow>
                    <InputField placeholder="비밀번호 확인" type="password" />
                </FormRow>

                <FormRow>
                    <InputField placeholder="이름" />
                </FormRow>

                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField placeholder="전화번호" />
                        </InputWrapper>
                        <SmallButton>인증번호</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputWithButton>
                        <InputWrapper>
                            <InputField placeholder="인증번호" />
                        </InputWrapper>
                        <SmallButton>재전송</SmallButton>
                    </InputWithButton>
                </FormRow>

                <FormRow>
                    <InputField placeholder="생년월일" type="date" />
                </FormRow>

                <FormRow>
                    <LoginButton>회원가입</LoginButton>
                </FormRow>
            </FormContainer>
        </Container>
    );
};

export default Index;
