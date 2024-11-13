import React from 'react';
import styled from 'styled-components';

const TextButton = ({ children, onclick, fontsize = "25px" }) => {
    return (
        <Button onClick={onclick} fontsize={fontsize}>
            {children}
        </Button>
    );
};

export default TextButton;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    font-size: ${props => props.fontsize};
`;