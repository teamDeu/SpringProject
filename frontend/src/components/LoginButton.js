import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 531px;
    height: 78px;
    margin: 1t0px 0;
    background-color: #00257A;
    color: white;
    border: none;
    border-radius: 8.37719px;
    font-size: 25px;
    cursor: pointer;
`;

const LoginButton = ({ children, onClick }) => (
    <Button onClick={onClick}>{children}</Button>
);


export default LoginButton;
