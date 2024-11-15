// EmailAndCareerInput.js
import React from 'react';
import styled from 'styled-components';

const EmailAndCareerInput = ({ label, placeholder }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Input placeholder={placeholder} />
        </Container>
    );
};

const Container = styled.div`
    width: 1060px;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #fff; /* Container 배경색을 흰색으로 설정 */
    margin-bottom: 15px;
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
    border-radius: 4px; /* Input에만 라운드 효과 */
    background-color: #F1F1F1; /* Input 배경색을 회색으로 설정 */
    color: #888;
    &::placeholder {
        color: #ccc;
    }
`;

export default EmailAndCareerInput;
