import React from 'react'
import styled from 'styled-components'
const PostResumeInfo = ({postResumeInfo}) => {
  return (
    <Container>
        <Content>
            <ContentTitle>지원자</ContentTitle>
            <ContentValue>{postResumeInfo.postCandidate}</ContentValue>
        </Content>
        <Divider/>
        <Content>
            <ContentTitle>열람</ContentTitle>
            <ContentValue>{postResumeInfo.postRead}</ContentValue>
        </Content>
        <Divider/>
        <Content>
            <ContentTitle>미열람</ContentTitle>
            <ContentValue>{postResumeInfo.postUnread}</ContentValue>
        </Content>
        <Divider/>
        <Content>
            <ContentTitle>최종합격</ContentTitle>
            <ContentValue>{postResumeInfo.postPass}</ContentValue>
        </Content>
    </Container>
  )
}

export default PostResumeInfo

const Container = styled.div`
    display:flex;
    width : 50%;
    padding : 10px;
    border : 1px solid #B4B4B4;
    border-radius : 10px;  
`
const Content = styled.div`
    display:flex;
    flex-direction : column;
    align-items :center;
    padding : 10px;
    gap : 10px;
    width : 25%;
    box-sizing : border-box;
`
const ContentTitle = styled.div`
    font-size : 18px;
`
const ContentValue = styled.div`
    font-size : 20px;
    color : #00257A;
`
const Divider = styled.div`
    height : 100%;
    border-right : 0.1px solid #B4B4B4;

`