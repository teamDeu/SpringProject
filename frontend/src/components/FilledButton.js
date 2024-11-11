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

const ButtonContainer = styled.button<{ size: CustomSize }>`
  cursor: pointer;
  background-color: ${({ theme, color }) => theme.color[color]};
  color: white;
  font-size: ${({ theme }) => theme.font.size.body_1};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  width: ${({ size }) => customWidth(size)};
  height: ${({ size }) => customHeight(size)};

  border-radius: 4px;

  :hover {
    opacity: 0.8;
  }
`;