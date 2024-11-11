import React from 'react';
import styled from 'styled-components';

const MainText = ({
  children,
}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default MainText;

const Container = styled.span`
  font-size : 120px;
  color : red;
`