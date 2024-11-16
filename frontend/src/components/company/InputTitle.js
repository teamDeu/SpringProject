import React from 'react'
import styled from 'styled-components'
const InputTitle = ({children}) => {
  return (
    <Title>{children}</Title>
  )
}

export default InputTitle

const Title = styled.div`
    margin-bottom : 15px;
`
