// EducationSelect.js
import React from 'react';
import styled from 'styled-components';

const EducationSelect = ({ label }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Divider>|</Divider>
            <Select>
                <option>고등학교</option>
                <option>대학교</option>
                <option>대학원</option>
            </Select>
            <Select>
                <option>졸업</option>
                <option>중퇴</option>
                <option>재학중</option>
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
    width: 80px;
    font-size: 16px;
    color: #333;
`;

const Divider = styled.span`
    margin: 0 10px;
    color: #ddd;
`;

const Select = styled.select`
    width: 100px; /* 작은 칸으로 표시 */
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    appearance: none; /* 기본 화살표 스타일을 없애고 */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E"); /* 커스텀 화살표 */
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 10px 6px;
    margin-left: 10px;
`;

export default EducationSelect;
