import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom'; // Link를 RouterLink로 설정

const LinkContainer = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    text-align: center;
    font-size: 16px;
    color: #888;
    margin: 15px 0;
`;

const Link = styled(RouterLink)` // RouterLink 사용
    cursor: pointer;
    margin: 0 5px;
    color: #888;
    text-decoration: none; // 밑줄 제거
    &:hover {
        color: #003366; /* 호버 시 색상 변경 */
    }
`;

const Links2 = () => {
    return (
        <LinkContainer>
            <Link to="/cfindid">아이디 찾기</Link>|
            <Link to="/cfindpwd">비밀번호 찾기</Link>|
            <Link to="/cmember">회원가입</Link>
        </LinkContainer>
    );
};

export default Links2;
