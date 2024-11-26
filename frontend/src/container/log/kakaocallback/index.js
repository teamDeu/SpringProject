import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const navigate = useNavigate();
    const [debugMessage, setDebugMessage] = useState(""); // 디버깅 메시지 상태
    const [authCode, setAuthCode] = useState(""); // 인증 코드 상태

    useEffect(() => {
        const handleKakaoCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (!code) {
                setDebugMessage("카카오 인증 실패: 인증 코드가 없습니다.");
                alert('카카오 인증 실패: 인증 코드가 없습니다.');
                return;
            }

            // 인증 코드 확인 메시지
            console.log('인가 코드:', code);
            setDebugMessage(`인가 코드 수신 성공: ${code}`);
            setAuthCode(code); // 상태에 인증 코드 저장

            try {
                // 백엔드로 인증 코드 전송
                const response = await axios.get(`http://localhost:8080/oauth2/callback/kakao?code=${code}`);
                console.log('카카오 로그인 성공:', response.data);
                setDebugMessage(`카카오 로그인 성공: ${JSON.stringify(response.data)}`);

                // 로그인이 성공하면 홈으로 이동
                navigate('/main');
            } catch (error) {
                console.error('카카오 로그인 에러:', error);

                // 디버깅 메시지 업데이트
                if (error.response) {
                    // 서버에서 반환된 에러
                    setDebugMessage(`서버 에러: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    // 요청은 성공적으로 보내졌으나 응답이 없을 때
                    setDebugMessage("네트워크 에러: 서버로부터 응답이 없습니다.");
                } else {
                    // 요청 설정 중에 발생한 에러
                    setDebugMessage(`요청 설정 에러: ${error.message}`);
                }

                alert('카카오 로그인에 실패했습니다.');
            }
        };

        handleKakaoCallback();
    }, [navigate]);

    return (
        <div>
            <h1>카카오 로그인 처리 중...</h1>
            {/* 인증 코드 출력 */}
            <div>
                <strong>인가 코드:</strong> {authCode || "없음"}
            </div>
            {/* 디버깅 메시지 출력 */}
            <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
                {debugMessage}
            </pre>
        </div>
    );
};

export default Index;
