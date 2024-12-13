import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    width: 83px;
    height: 55px;
    background-color: #00257A;
    color: white;
    font-size: 14px;
    padding: 8px 1px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-left: 10px;
`;

const SmallButton = ({ children, onClick }) => (
    <Button onClick={onClick}>{children}</Button>
);

export default SmallButton;
