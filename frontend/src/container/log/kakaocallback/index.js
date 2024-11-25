import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKakaoCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (!code) {
                alert('카카오 인증 실패: 인증 코드가 없습니다.');
                return;
            }

            try {
                // 백엔드로 인증 코드 전송
                const response = await axios.get(`http://localhost:8080/oauth2/callback/kakao?code=${code}`);
                console.log('카카오 로그인 성공:', response.data);

                // 로그인이 성공하면 홈으로 이동
                navigate('/main');
            } catch (error) {
                console.error('카카오 로그인 에러:', error);
                alert('카카오 로그인에 실패했습니다.');
            }
        };

        handleKakaoCallback();
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default Index;
