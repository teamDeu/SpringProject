import React from 'react'
import styled from 'styled-components'
const RoundedLabel = ({color,children}) => {
  return (
    <Label color ={color}>{children}</Label>
  )
}

export default RoundedLabel

const Label = styled.div`
  color : ${props => props.color};
  padding : 10px 20px;
  border : 1px solid #B5B5B5;
  border-radius : 30px;
`