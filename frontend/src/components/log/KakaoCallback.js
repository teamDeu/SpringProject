import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (!code) {
                console.error('카카오 로그인 실패: URL에 code가 없습니다.');
                alert('카카오 로그인 실패. 다시 시도해주세요.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/kakao-login', { code });
                console.log('카카오 로그인 응답:', response.data);

                if (response.data && response.data.userId) {
                    alert('카카오 로그인 성공!');
                    localStorage.setItem('userId', response.data.userId); // 사용자 ID 저장
                    navigate('/basic2'); // 기본 정보 입력 페이지로 이동
                } else {
                    throw new Error('응답에 userId가 없습니다.');
                }
            } catch (error) {
                console.error('카카오 로그인 처리 중 오류:', error);
                alert('카카오 로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
            }
        };

        handleKakaoLogin();
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
