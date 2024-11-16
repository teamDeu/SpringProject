import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
    display: flex;
    align-items: center;
    width: 160px;
    height: 40px;
    position: relative;
    box-sizing: border-box;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const Label = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #000000;
`;

const Value = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: ${({ value }) => (value === '합격' ? '#1a28f4' : value === '불합격' ? '#ff0000' : '#000000')};
`;

const HiddenIcon = ({ label, value, iconSrc }) => {
    return (
        <Frame>
            <Icon src={iconSrc} alt="icon" />
            <TextContainer>
                <Label>{label}</Label>
                <Value value={value}>{value}</Value>
            </TextContainer>
        </Frame>
    );
};

export default HiddenIcon;
