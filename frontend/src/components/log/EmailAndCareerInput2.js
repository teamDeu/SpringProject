import React from 'react';
import styled from 'styled-components';

const EmailAndCareerInput2 = ({ label, placeholder, value = '', onChange }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Input
                placeholder={placeholder}
                value={value} // 기본값을 ''로 설정해 에러 방지
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value); // `onChange`가 존재할 경우에만 호출
                    }
                }}
            />
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
    background-color: #fff;
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
    border-radius: 4px;
    background-color: #F1F1F1;
    color: #888;
    &::placeholder {
        color: #ccc;
    }
`;

export default EmailAndCareerInput2;
