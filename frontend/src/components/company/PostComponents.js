import React from 'react'
import styled from 'styled-components'

import RoundedLabel from './RoundedLabel'
import TextButton from '../common/TextButton'
import PostResumeInfo from './PostResumeInfo'
import { useNavigate } from 'react-router'
const tempData = {
    postTitle : "[플레이오]Python 백엔드 개발",
    postStartDate : "2024-11-01",
    postEndDate : "2024-11-13",
    postUpdateDate : "11-02",
    postResumeInfo :{
        postCandidate : 10,
        postRead : 10,
        postUnread : 0,
        postPass : 0
    }
    
}


const PostComponents = ({data = tempData}) => {
    const navigate = useNavigate();
    const date = new Date();
    const endDate = new Date(data.postEndDate);
    const isIng = date.getTime() <= endDate.getTime();

    const handelDelete = (e) => {
        console.log("click : ",e.target.parentNode.parentNode)
        alert("삭제되었습니다.");
        e.target.parentNode.parentNode.remove();
    }
    
    const handelModify = () => {
        navigate("/CompanyRegPost",{ state: data.postId })
    }

  return (
    <Container>
        <StateSection>
            {isIng ? <RoundedLabel color = "red">진행중</RoundedLabel> : <RoundedLabel color = "#B5B5B5">마감</RoundedLabel> }
        </StateSection>
        <InfoSection>
            <InfoTitle>{data.postTitle}</InfoTitle>
            <InfoDate>{data.postStartDate} ~ {data.postEndDate} &nbsp;I&nbsp; {data.postUpdateDate} 수정 </InfoDate>
            <PostResumeInfo postResumeInfo={data.postResumeInfo}/>
        </InfoSection>
        <ButtonSection>
            <TextButton fontsize = "18px" color ="#B5B5B5">마감</TextButton>
            <ButtonDivider>|</ButtonDivider>
            <TextButton onclick = {handelModify} fontsize = "18px" color ="#B5B5B5">수정</TextButton>
            <ButtonDivider>|</ButtonDivider>
            <TextButton onclick = {(e) => {handelDelete(e)}} fontsize = "18px" color ="#B5B5B5">삭제</TextButton>
        </ButtonSection>
    </Container>
  )
}

export default PostComponents

const Container = styled.div`
    border : 1px solid #B5B5B5;
    border-radius : 10px;
    width : 100%;
    margin-top : 45px;
    padding : 45px;
    gap : 10px;
    box-sizing : border-box;
    display:flex;
    justify-content : space-between;
`

const StateSection = styled.section``
const InfoSection = styled.section`
    width: 75%;
    display:flex;
    flex-direction : column;
    gap : 20px;
`
const ButtonSection = styled.section`
    display:flex;
    align-items : center;
    height : 10px;
`

const ButtonDivider = styled.div`
    color : #B5B5B5;
`

const InfoTitle = styled.div`
    font-size : 24px;
    font-weight : bold;
`

const InfoDate = styled.div`
    font-size : 16px;
    color : #746E6E;
`