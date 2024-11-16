import React from 'react'
import styled from 'styled-components'
const MainContent = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

export default MainContent

const Container = styled.div`
    display:flex;
    flex-direction : column;
    justify-content : center;
    align-items :center;
    padding: 20px 300px;
`