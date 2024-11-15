import React, { useState } from 'react';
import Tabs from '../../../components/log/Tabs';
import InputField from '../../../components/log/InputField';
import CheckboxGroup from '../../../components/log/CheckboxGroup';
import LoginButton from '../../../components/log/LoginButton';
import Links from '../../../components/log/Links';
import SocialButtons from '../../../components/log/SocialButtons';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed; /* 화면 중앙에 고정 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -70px;
    zoom:0.6;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 55px;
    color: #003366;
`;

const Form = styled.div`
    box-sizing: border-box;
    width: 779px;
    height: 680px;
    background: #FFFFFF;
    border: 1px solid #B5B5B5;
    border-radius: 50px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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
                        { name: 'simpleLogin', label: '간편로그인', checked: form.simpleLogin },
                    ]} 
                    onChange={handleChange} 
                />
                <LoginButton>로그인</LoginButton>
                <Links />
                <SocialButtons />
            </Form>
        </Container>
    );
};

export default Index;
