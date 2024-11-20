import React from 'react'
import styled from 'styled-components'
const InputArrayTitle = ({children}) => {
  return (
    <Container>{children}</Container>
  )
}

export default InputArrayTitle

const Container = styled.div`
    font-size : 24px;
    font-weight : bold;
    margin-bottom : 12px;
`