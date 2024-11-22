import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NaverCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleNaverLogin = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');

            if (!code || !state) {
                alert('네이버 로그인 실패: 인증 코드나 상태가 없습니다.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/naver-login', { code, state }, { withCredentials: true });
                const userId = response.data.userId;

                // 사용자 ID 저장 및 basic2로 리다이렉트
                localStorage.setItem('userId', userId);
                navigate('/basic2');
            } catch (error) {
                console.error('네이버 로그인 처리 실패:', error);
                alert('로그인 처리 중 문제가 발생했습니다.');
                navigate('/login');
            }
        };

        handleNaverLogin();
    }, [navigate]);

    return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;
