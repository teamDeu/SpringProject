import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 531px;
    height: 70px;
    margin: 5px 0;
    padding: 10px;
    background: #FFFFFF;
    border: 0.837719px solid #B5B5B5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8.37719px;
    font-size: 18px;
    box-sizing :border-box ;
`;

const InputField2 = ({ type, placeholder, value, onChange, name }) => (
    <Input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />
);

export default InputField2;
