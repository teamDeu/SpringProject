import React, { useState } from 'react';
import Tabs from '../../components/log/Tabs';
import InputField from '../../components/log/InputField';
import CheckboxGroup from '../../components/log/CheckboxGroup';
import LoginButton from '../../components/log/LoginButton';
import Links from '../../components/log/Links';
import SocialButtons from '../../components/log/SocialButtons';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 360px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #003366;
`;

const Form = styled.div`
    width: 100%;
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilledButton from '../../components/FilledButton';
import MainText from '../../components/MainText';

function Index() {
    const [data, setData] = useState([]);
    const [company, setCompany] = useState({
        id :'dfaasdf',
        name: 'Example Company',
        logoUrl: 'https://example.com/logo.png'
    });

    useEffect(() => {
        // GET 요청으로 데이터를 가져옵니다.
        axios.get('http://localhost:8080/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));    
    }, []);
    // 테스트를 위한 주석
    const handlePostRequest = () => {
        // POST 요청으로 새로운 데이터를 서버에 저장합니다.
        axios.post('http://localhost:8080/api/company', company)
            .then(response => {
                // 저장 후 데이터를 다시 가져와 화면을 업데이트합니다.
                setData(prevData => [...prevData, response.data]);
            })
            .catch(error => console.error('Error posting data:', error));
    };

    return (
        <Container>
            <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
            <Form>
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
                <SocialButtons />
            </Form>
        </Container>
    );
};

export default Index;
