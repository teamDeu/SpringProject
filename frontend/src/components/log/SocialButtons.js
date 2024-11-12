import React from 'react';
import styled from 'styled-components';

const SocialContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const SocialButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-color: ${props => props.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 10px;
    font-size: 24px;
    color: white;
`;

const SocialButtons = () => (
    <SocialContainer>
        <SocialButton bgColor="#03C75A">N</SocialButton>
        <SocialButton bgColor="#FEE500">K</SocialButton>
    </SocialContainer>
);

export default SocialButtons;
