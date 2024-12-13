import React from 'react';
import styled from 'styled-components';

const GenderSelect = ({ label, value, onChange }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Select
                value={value} // 선택된 값 반영
                onChange={(e) => onChange('gender', e.target.value)} // `onChange` 호출 시 key와 value 전달
            >
                <option value="">성별</option>
                <option value="남">남</option>
                <option value="여">여</option>
            </Select>
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
    font-family: 'Nanum Square Neo', sans-serif;
    width: 80px;
    font-size: 16px;
    color: #333;
`;

const Divider = styled.span`
    margin: 0 10px;
    color: #ddd;
`;

const Select = styled.select`
    width: 80px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 10px 6px;
`;

export default GenderSelect;
