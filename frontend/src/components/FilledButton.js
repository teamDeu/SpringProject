import React from 'react';
import styled from 'styled-components';



const FilledButton = ({
  children,
  color = "#00257A",
  size = "180px",
  height,
  onClick = ()=>{}
}) => {
  return (
    <ButtonContainer height = {height} color={color} onClick={onClick} size={size}>
      {children}  
    </ButtonContainer>
  );
};

export default FilledButton;

const ButtonContainer = styled.button`
  cursor: pointer;
  background-color: ${props => props.color};
  color : white;
  border-radius: 10px;
  border:none;
  padding : 5px;
  width : ${props => props.size};
  height : ${props => props.height ? props.height : ""};
  &:hover {
    opacity: 0.8;
  };
  font-size : 16px;
  font-weight : bold;
`;
