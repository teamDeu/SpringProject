import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    width: 400px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const ModalTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #003366;
`;

const ModalContent = styled.p`
    margin-bottom: 20px;
    font-size: 18px;
    color: #555;
`;

const CloseButton = styled.button`
    padding: 10px 20px;
    background: #003366;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background: #00509e;
    }
`;

const Modal = ({ title, content, onClose }) => (
    <ModalOverlay>
        <ModalContainer>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>{content}</ModalContent>
            <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContainer>
    </ModalOverlay>
);

export default Modal;
