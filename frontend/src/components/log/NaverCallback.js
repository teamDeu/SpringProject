import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NaverCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code) {
            axios
                .post('http://localhost:8080/api/naver-login', { code, state })
                .then((response) => {
                    console.log('네이버 로그인 응답:', response.data); // 서버 응답 디버깅
                    if (response.data && response.data.userId) {
                        alert('네이버 로그인 성공!');
                        localStorage.setItem('userId', response.data.userId);
                        navigate('/basic2'); // 성공적으로 기본 정보 페이지로 이동
                    } else {
                        throw new Error('로그인 응답에 userId가 없습니다.');
                    }
                })
                .catch((error) => {
                    console.error('네이버 로그인 실패:', error);
                    alert('네이버 로그인 실패. 다시 시도해주세요.');
                });
        } else {
            console.warn('code 또는 state가 URL에 없습니다.');
        }
    }, [navigate]);

    return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;
