import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EditButton = ({link = "/mp2"}) => {
    return (
        <StyledLink to={link}>수정</StyledLink>
    );
};

export default EditButton;

const StyledLink = styled(Link)`
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
    text-decoration: none; /* 밑줄 제거 */
    &:hover {
        background-color: #f1f1f1;
    }
`;
