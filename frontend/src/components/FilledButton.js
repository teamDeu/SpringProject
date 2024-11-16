import React from 'react';
import styled from 'styled-components';



const FilledButton = ({
  children,
  color = "#00257A",
  size = "180px",
  onClick = ()=>{}
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
  background-color: #00257A;
  color : white;
  border-radius: 10px;
  width : ${props => props.size};
  height : 50px;
  :hover {
    opacity: 0.8;
  },
  font-size : 25px;
  font-weight : bold;
`;
