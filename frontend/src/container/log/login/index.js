import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../../components/log/Tabs';
import InputField from '../../../components/log/InputField';
import CheckboxGroup from '../../../components/log/CheckboxGroup';
import LoginButton from '../../../components/log/LoginButton';
import SocialButtons from '../../../components/log/SocialButtons';
import Links from '../../../components/log/Links';
import axios from 'axios';
import styled from 'styled-components';
import { GetSessionId } from '../../../api/api';

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
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: '',
        password: '',
        rememberLogin: false,
        saveId: false, // 아이디 저장 체크박스
        simpleLogin: false, // 관리자 로그인 체크박스
    });

    // 페이지 로드 시 localStorage에서 아이디 불러오기
    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setForm((prevForm) => ({
                ...prevForm,
                id: savedId,
                saveId: true, // 저장된 아이디가 있다면 체크박스도 선택 상태로
            }));
        }
    }, []);

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
            // 관리자 로그인
            if (form.simpleLogin) {
                const response = await axios.post('http://localhost:8080/api/admin-login', {
                    admin_id: form.id,
                    admin_pwd: form.password,
                },{ withCredentials: true });
                if (response.status === 200) {
                    alert('관리자 로그인 성공');
                    localStorage.setItem('adminId', form.id); // adminId 저장
                    navigate('/amember');
                }
                return;
            }

            // 일반 사용자 로그인
            const response = await axios.post('http://localhost:8080/api/login', {
                id: form.id,
                password: form.password,
            },{ withCredentials: true });

            if (response.status === 200) {
                alert('로그인 성공');
                localStorage.setItem('userId', form.id); // userId 저장

                // 아이디 저장 옵션 처리
                if (form.saveId) {
                    localStorage.setItem('savedId', form.id); // 아이디 저장
                } else {
                    localStorage.removeItem('savedId'); // 저장된 아이디 제거
                }

                // 기본 정보 입력 여부 확인
                const checkBasicResponse = await axios.get(
                    `http://localhost:8080/api/check-user-basic?id=${form.id}`
                );

                if (checkBasicResponse.data) {
                    navigate('/dashboard'); // 기본 정보 입력 완료 시
                } else {
                    navigate('/basic'); // 기본 정보 입력 미완료 시
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
                <Tabs activeTab="individual" />
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
                <Links />
                <SocialButtons />
            </Form>
        </Container>
    );
};

export default Index;
