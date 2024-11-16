import React from 'react'
import styled from 'styled-components'
const ContentTitle = ({children}) => {
  return (
    <Title>{children}</Title>
  )
}

export default ContentTitle

const Title = styled.div`
  font-size:35px;
  padding-bottom : 50px;
  padding-top : 10px;
  font-weight : bold;
`