import React from 'react';
import styled from 'styled-components';

const IDInput3 = ({ label, value, placeholder }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Input
                value={value || ''} // value를 바인딩
                placeholder={placeholder}
                readOnly
            />
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
    width: 100%;
    max-width: 1060px;
`;

const Label = styled.label`
    width: 60px;
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
    background-color: #f9f9f9;
    cursor: not-allowed;
    &::placeholder {
        color: #bbb;
    }
`;

export default IDInput3;
