import React, { useEffect, useState } from 'react'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import Tab from '../../../components/company/Tab'
import PostComponents from '../../../components/company/PostComponents'
import FilledButton from '../../../components/FilledButton'
import { GetAllJobPosts } from '../../../api/api'




const Index = () => {
  const [postComponent,setPostComponent] = useState([]);
  const [filteredComponent,setFilteredComponent] = useState([]);
  useEffect(() => {
    const fecthData = async() => {
      const postData = await GetAllJobPosts();
      const formattedData = (postData || []).map(data => ({
        postTitle : data.title,
        postStartDate : data.postDate.split("T")[0],
        postEndDate : data.endDate.split("T")[0],
        postUpdateDate : data.postDate.split("T")[0],
    postResumeInfo :{
        postCandidate : 100,
        postRead : 77,
        postUnread : 23,
        postPass : 0
    }}));
      setPostComponent(formattedData);
      setFilteredComponent(formattedData);
    }

    fecthData();
  },[])

  const tabOptions = [
    {
      title : "전체",
      onClick : () => {
        setFilteredComponent(postComponent)
      }
    },
    {
      title : "진행중",
      onClick : () => {
        const date = new Date();
        setFilteredComponent(postComponent.filter((data) => {
          const endDate = new Date(data.postEndDate);
          console.log("date : ",date,"endDate: ", endDate);
          return date.getTime() <= endDate.getTime();
        }))
      }
    },
    {
      title : "마감",
      onClick : () => {
        const date = new Date();
        setFilteredComponent(postComponent.filter((data) => {
          const endDate = new Date(data.postEndDate);
          return date.getTime() > endDate.getTime();
        }))
      }
    }
  ];

  useEffect(() => {
    console.log(postComponent)
  },[postComponent])
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
              <ButtonArticle>
              <FilledButton>채용 공고 등록</FilledButton>
              </ButtonArticle>
            </TabSection>
            <ComponetsSection>
              {filteredComponent && filteredComponent.map((data) => <PostComponents data ={data}/>)}
            </ComponetsSection>
        </MainContent>
    </Container>
  )
}

export default Index

const Container = styled.div`

`

const TitleSection  = styled.section`
    width : 100%;
`

const TabSection = styled.section`
  display:flex;
  align-items:center;
  position : relative;
  width : 100%;
`
const ComponetsSection = styled.section`
  width:100%;
`

const ButtonArticle = styled.article`
  position : absolute;
  right : 0px;
`