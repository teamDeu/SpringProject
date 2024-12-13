import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
    font-family: 'Nanum Square Neo', sans-serif;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-right: 20px;
`;

const Checkbox = styled.input`
    margin-right: 20px;
`;

const CheckboxGroup = ({ options, onChange }) => (
    <CheckboxContainer>
        {options.map(option => (
            <CheckboxLabel key={option.name}>
                <Checkbox
                    type="checkbox"
                    name={option.name}
                    checked={option.checked}
                    onChange={onChange}
                />
                {option.label}
            </CheckboxLabel>
        ))}
    </CheckboxContainer>
);

export default CheckboxGroup;
