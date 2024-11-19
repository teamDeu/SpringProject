import React, { useState } from 'react'
import styled from 'styled-components';
import TabItem from './TabItem';

const defaultOptions = [
  {
    title : "마감",
    onClick : () => {}
  },
  {
    title : "진행중",
    onClick : () => {console.log("진행중클릭")}
  },
  {
    title : "전체",
    onClick : () => {}
  },
]
const Tab = ({options = defaultOptions}) => {
    const [activeTab,setActiveTab] = useState(0);
  return (
    <Container>
      {options.map((option,index) => 
        {
          if(index === activeTab){
            return <TabItem onClick = {() => {setActiveTab(index); option.onClick()}} key = {index} tabActive = {true}>{option.title}</TabItem>
          }
          else{
            return <TabItem onClick = {() => {setActiveTab(index); option.onClick()}} key = {index}>{option.title}</TabItem>
          }
        }
      )}
    </Container>
  )
}

export default Tab

const Container = styled.div`
  border-bottom : 1px solid #B5B5B5;
  display:flex;
  gap : 120px;
  width:100%;
`