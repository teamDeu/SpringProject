import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../../components/log/Tabs';
import InputField from '../../../components/log/InputField';
import CheckboxGroup from '../../../components/log/CheckboxGroup';
import LoginButton from '../../../components/log/LoginButton';
import SocialButtons from '../../../components/log/SocialButtons';
import Links from '../../../components/log/Links';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -70px;
    zoom: 0.6;
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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

const handleLogin = async () => {
    if (!form.id || !form.password) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            id: form.id,
            password: form.password,
        });

        if (response.status === 200) {
            alert('로그인 성공');
            localStorage.setItem('userId', form.id); // userId 저장

            // 기본 정보 입력 여부 확인
            const checkBasicResponse = await axios.get(
                `http://localhost:8080/api/check-user-basic?id=${form.id}`
            );

            if (checkBasicResponse.data) {
                // 기본 정보가 입력되어 있다면 대시보드로 이동
                navigate('/dashboard');
            } else {
                // 기본 정보가 입력되어 있지 않다면 basic 페이지로 이동
                navigate('/basic');
            }
        }
    } catch (error) {
        console.error('로그인 실패: ', error);
        alert('로그인 실패. 아이디와 비밀번호를 확인해주세요.');
    }
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
                <LoginButton type="button" onClick={handleLogin}>
                    로그인
                </LoginButton>
                <Links/>
                <SocialButtons />
            </Form>
        </Container>
    );
};

export default Index;
