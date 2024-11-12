import React, { useState } from 'react';
import Tabs from '../components/log/Tabs';
import InputField from '../components/log/InputField';
import CheckboxGroup from '../components/log/CheckboxGroup';
import SocialLoginButtons from '../components/log/SocialButtons';
import Links from '../components/log/Links';
import styled from 'styled-components';

const Index = () => {
    const [form, setForm] = useState({
        id: '',
        password: '',
        rememberLogin: false,
        saveId: false,
        simpleLogin: false,
    });
    const [activeTab, setActiveTab] = useState('individual');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <Container>
            <Title>구인구직</Title>
            <Form>
                <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
                <InputField 
                    type="text" 
                    placeholder="아이디" 
                    value={form.id} 
                    onChange={handleChange} 
                    name="id" 
                />
                <InputField 
                    type="password" 
                    placeholder="비밀번호" 
                    value={form.password} 
                    onChange={handleChange} 
                    name="password" 
                />
                <CheckboxGroup 
                    options={[
                        { name: 'rememberLogin', label: '로그인 유지', checked: form.rememberLogin },
                        { name: 'saveId', label: '아이디 저장', checked: form.saveId },
                        { name: 'simpleLogin', label: '관리자 로그인', checked: form.simpleLogin },
                    ]} 
                    onChange={handleChange} 
                />
                <LoginButton>로그인</LoginButton>
                <Links />
                <SocialLoginButtons />
            </Form>
        </Container>
    );
};

export default Index;

// 스타일 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const Form = styled.div`
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
