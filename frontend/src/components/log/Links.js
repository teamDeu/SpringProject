import React from 'react';
import styled from 'styled-components';

const LinkContainer = styled.div`
    text-align: center;
    font-size: 16px;
    color: #888;
    margin: 15px 0;
`;

const Link = styled.span`
    cursor: pointer;
    margin: 0 5px;
    &:hover {
        color: #003366; /* 호버 시 색상 변경 */
    }
`;

const Links = () => {
    const handleClick = (type) => {
        switch (type) {
            case 'findId':
                alert('아이디 찾기 클릭됨');
                break;
            case 'findPassword':
                alert('비밀번호 찾기 클릭됨');
                break;
            case 'signUp':
                alert('회원가입 클릭됨');
                break;
            default:
                break;
        }
    };

    return (
        <LinkContainer>
            <Link onClick={() => handleClick('findId')}>아이디 찾기</Link>|
            <Link onClick={() => handleClick('findPassword')}>비밀번호 찾기</Link>|
            <Link onClick={() => handleClick('signUp')}>회원가입</Link>
        </LinkContainer>
    );
};

export default Links;
