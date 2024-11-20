import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width:90px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const AddButton = ({ to, iconSrc, altText, children }) => {
  return (
    <StyledLink to={to}>
      <Button>
        <ButtonIcon src={iconSrc} alt={altText} />
        {children}
      </Button>
    </StyledLink>
  );
};

export default AddButton;
