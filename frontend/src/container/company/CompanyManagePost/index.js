import React from 'react'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import Tab from '../../../components/company/Tab'
import PostComponents from '../../../components/company/PostComponents'

const tabOptions = [
  {
    title : "진행중",
    onClick : () => {console.log("진행중클릭")}
  },
  {
    title : "마감",
    onClick : () => {}
  },
  {
    title : "전체",
    onClick : () => {}
  }
];

const postComponents = [
  {
    postTitle : "[플레이오]Python 백엔드 개발",
    postStartDate : "2024-11-01",
    postEndDate : "2024-11-13",
    postUpdateDate : "11-02",
    postResumeInfo :{
        postCandidate : 10,
        postRead : 10,
        postUnread : 0,
        postPass : 0
    },
  },
  {
    postTitle : "[일주지앤에스]Java 백엔드 개발",
    postStartDate : "2024-11-01",
    postEndDate : "2024-11-13",
    postUpdateDate : "11-02",
    postResumeInfo :{
        postCandidate : 10,
        postRead : 10,
        postUnread : 0,
        postPass : 0
    },
  },
  {
    postTitle : "[바이트사이즈]AI 개발",
    postStartDate : "2024-11-01",
    postEndDate : "2024-11-13",
    postUpdateDate : "11-02",
    postResumeInfo :{
        postCandidate : 10,
        postRead : 10,
        postUnread : 0,
        postPass : 0
    },
  },
  {
    postTitle : "[플레이오]Python 백엔드 개발",
    postStartDate : "2024-11-01",
    postEndDate : "2024-11-13",
    postUpdateDate : "11-02",
    postResumeInfo :{
        postCandidate : 100,
        postRead : 77,
        postUnread : 23,
        postPass : 0
    },
  }
]
const index = () => {
  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
            <ContentTitle>
                공고 · 지원자 관리
            </ContentTitle>
            </TitleSection>
            <TabSection>
              <Tab options={tabOptions}/>
            </TabSection>
            <ComponetsSection>
              {postComponents.map((postComponent) => <PostComponents data ={postComponent}/>)}
            </ComponetsSection>
        </MainContent>
    </Container>
  )
}

export default index

const Container = styled.div`

`

const TitleSection  = styled.section`
    width : 100%;
`

const TabSection = styled.section`
    width : 100%;
`
const ComponetsSection = styled.section`
  width:100%;
`