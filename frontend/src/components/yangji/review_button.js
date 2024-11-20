import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    height: 60px;
    position: relative;
    box-sizing: border-box;
    font-family: 'Nanum Square Neo', sans-serif;
    cursor: pointer;
`;

const ButtonBackground = styled.div`
    background: #00257a;
    border-radius: 8.38px;
    width: 250px;
    height: 60px;
    position: absolute;
    left: 0px;
    top: 0px;
`;

const ButtonText = styled.div`
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center; /* 중앙 정렬 */
    text-align: center; /* 텍스트 중앙 정렬 */
`;

const ReviewButton = ({ text, onClick }) => {
    return (
        <ButtonContainer onClick={onClick}>
            <ButtonBackground />
            <ButtonText>{text}</ButtonText>
        </ButtonContainer>
    );
};

export default ReviewButton;
