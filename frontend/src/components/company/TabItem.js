import React from 'react'
import styled from 'styled-components'
const TabItem = ({children,tabActive = false,onClick}) => {
    console.log(tabActive);
  return (
    <Container onClick ={onClick} tabActive = {tabActive}>{children}</Container>
  )
}

export default TabItem

const Container = styled.div`
    padding : 15px;
    cursor : pointer;
    &:hover{
        color : #00257A;
        font-weight : bold;
    };
    color : ${(props) => props.tabActive ? "#00257A" : "black"};
    font-weight :  ${(props) => props.tabActive ? "bold" : "normal"};
`