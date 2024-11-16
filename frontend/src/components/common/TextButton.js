import React from 'react';
import styled from 'styled-components';

const TextButton = ({ color,children, onclick, fontsize = "25px" }) => {
    return (
        <Button color ={color} onClick={onclick} fontsize={fontsize}>
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
    };
    color : ${props => props.color};
    font-size: ${props => props.fontsize};
`;