import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            axios
                .post('http://localhost:8080/api/kakao-login', { code })
                .then((response) => {
                    console.log('카카오 로그인 응답:', response.data);
                    if (response.data && response.data.userId) {
                        alert('카카오 로그인 성공!');
                        localStorage.setItem('userId', response.data.userId);
                        navigate('/basic2');
                    } else {
                        throw new Error('로그인 응답에 userId가 없습니다.');
                    }
                })
                .catch((error) => {
                    console.error('카카오 로그인 실패:', error);
                    alert('카카오 로그인 실패. 다시 시도해주세요.');
                });
        } else {
            console.warn('code가 URL에 없습니다.');
        }
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
