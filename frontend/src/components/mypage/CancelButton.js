import React from 'react';
import styled from 'styled-components';

const CancelButton = ({ children }) => {
    return <Button>{children}</Button>;
};

export default CancelButton;

const Button = styled.button`
    box-sizing: border-box;
    width: 94.91px;
    height: 53px;
    background: white;
    border: 1.23256px solid #8A8A8A;
    border-radius: 12.3256px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;