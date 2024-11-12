import React from 'react';
import styled from 'styled-components';



const FilledButton = ({
  children,
  color = 'primary_55',
  onClick,
  size = 'md',
}) => {
  return (
    <ButtonContainer color={color} onClick={onClick} size={size}>
      {children}
    </ButtonContainer>
  );
};

export default FilledButton;

const ButtonContainer = styled.button`
  cursor: pointer;
  color: white;
  border-radius: 4px;
  :hover {
    opacity: 0.8;
  }
`;