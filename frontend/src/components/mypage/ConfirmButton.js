import React from 'react';
import styled from 'styled-components';

const ConfirmButton = ({ children, onClick }) => {
    return <Button onClick={onClick}>{children}</Button>; // onClick 속성 추가
};

export default ConfirmButton;

const Button = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    box-sizing: border-box;
    width: 94.91px;
    height: 53px;
    background: #00257A;
    border: 1.23256px solid #8A8A8A;
    border-radius: 12.3256px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: #001A5A;
    }
`;
