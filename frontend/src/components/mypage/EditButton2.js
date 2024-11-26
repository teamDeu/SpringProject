import React from 'react';
import styled from 'styled-components';

const EditButton2 = ({ onClick }) => {
    return <Button onClick={onClick}>저장</Button>; // onClick 전달
};

export default EditButton2;

const Button = styled.button`
    width: 77px;
    height: 43px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #fff;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #f1f1f1;
    }
`;
