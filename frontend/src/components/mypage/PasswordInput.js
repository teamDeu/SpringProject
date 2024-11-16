// PasswordInput.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';

const PasswordInput = ({ label, placeholder }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={placeholder}
            />
            <IconContainer onClick={togglePasswordVisibility}>
                <FaEye />
            </IconContainer>
            <ChangeButton>변경</ChangeButton>
        </Container>
    );
};



const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 15px;
    width: 100%;
    max-width: 1060px; /* 원하는 최대 너비 */
`;

const Label = styled.label`
    width: 80px;
    font-size: 16px;
    color: #333;
`;

const Divider = styled.span`
    margin: 0 10px;
    color: #ddd;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px;
    border: none;
    color: #888;
    &::placeholder {
        color: #ccc;
    }
`;

const IconContainer = styled.div`
    cursor: pointer;
    margin-right: 10px;
    color: #888;
    display: flex;
    align-items: center;
    font-size: 18px;
`;

const ChangeButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    margin-left: 10px;
    &:hover {
        background-color: #f1f1f1;
    }
`;


export default PasswordInput;