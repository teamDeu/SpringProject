// IDinput2.js
import React from 'react';
import styled from 'styled-components';

const IDInput2 = ({ label, placeholder }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Input placeholder={placeholder} />
        </Container>
    );
};



const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #ffffff;
    margin-bottom: 15px;
    width: 100%; /* 전체 너비 설정 */
    max-width: 1060px; /* 원하는 최대 너비 */
    
`;

const Label = styled.label`
    width: 150px; /* 레이블 너비 */
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
    color: #333;
    font-size: 16px;
    &::placeholder {
        color: #bbb;
    }
`;

export default IDInput2;
