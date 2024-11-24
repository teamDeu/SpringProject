import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('KakaoCallback 렌더링');
        const handleKakaoLogin = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (!code) {
                alert('카카오 로그인 실패: 인증 코드가 없습니다.');
                navigate('/login'); // 로그인 페이지로 이동
                return;
            }

            try {
                // 인증 코드로 백엔드와 통신
                const response = await axios.post('http://localhost:8080/api/kakao-login', { code : code }, { withCredentials: true });
                const userId = response.data.userId;

                if (!userId) {
                    throw new Error('유효한 사용자 ID를 받지 못했습니다.');
                }

                // 사용자 ID 저장 후 basic2로 이동
                localStorage.setItem('userId', userId);
                navigate('/basic2');
            } catch (error) {
                console.error('카카오 로그인 처리 실패:', error);
                alert('로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
                navigate('/login');
            }
        };

        handleKakaoLogin();
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;