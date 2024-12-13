import React, { useEffect, useState } from 'react'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import Tab from '../../../components/company/Tab'
import PostComponents from '../../../components/company/PostComponents'
import FilledButton from '../../../components/FilledButton'
import { GetAllJobPosts, GetCandidate, GetCompanyJobPosts } from '../../../api/api'
import { waitForSessionId } from '../../../context/SessionProvider'
import { useNavigate } from 'react-router'




const Index = () => {
  const navigate = useNavigate();
  const [postComponent,setPostComponent] = useState([]);
  const [filteredComponent,setFilteredComponent] = useState([]);
  const [endComponent,setEndComponent] = useState([]);
  const [ingComponent,setIngComponent] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [postData, setPostData] = useState();
  useEffect(() => {
    const fetchSession = async () => {
        try {
            const sessionId = await waitForSessionId();
            setSessionId(sessionId);
        } catch (error) {
            console.error("Failed to fetch session:", error);
        }
    };
    fetchSession();
}, []);

useEffect(() => {
  const fetchData = async () => {
    console.log(postData);
    const formattedData = (postData || []).map(data => ({
      postId: data.id,
      postTitle: data.title,
      postStartDate: data.postDate.split("T")[0],
      postEndDate: data.endDate.split("T")[0],
      postUpdateDate: data.modifyDate ? data.modifyDate.split("T")[0] : "변경없음",
      postResumeInfo: {
        postCandidate: 0,
        postRead: 0,
        postUnread: 0,
        postPass: 0
      }
    }));

    const date = new Date();

    // 각 후보 데이터를 fetchCandidateData로 비동기 처리
    const candidatePromises = formattedData.map(async (data) => {
      const candidateData = await GetCandidate(data.postId);
      data.postResumeInfo = {
        postCandidate: candidateData.length,
        postRead: candidateData.filter((item) => item.passType !== "심사중").length,
        postUnread: candidateData.filter((item) => item.passType === "심사중").length,
        postPass: candidateData.filter((item) => item.passType === "최종 합격").length
      };
      return data; // 비동기 작업 후 수정된 데이터 반환
    });

    // 모든 비동기 작업 완료 후 setState
    const updatedData = await Promise.all(candidatePromises);

    setPostComponent(updatedData); // 상태 업데이트
    setIngComponent(updatedData.filter((data) => {
      const endDate = new Date(data.postEndDate);
      return date.getTime() <= endDate.getTime();
    }));
    setEndComponent(updatedData.filter((data) => {
      const endDate = new Date(data.postEndDate);
      console.log("date : ", date, "endDate: ", endDate);
      return date.getTime() > endDate.getTime();
    }));
    setFilteredComponent(updatedData); // 모든 데이터를 필터링 후 상태 설정
  };

  fetchData();
}, [postData]);

  useEffect(() => {
    const fetchPostData = async() => {
      const getPostData = await GetCompanyJobPosts(sessionId);
      setPostData(getPostData);
    }
    if(sessionId){
      fetchPostData();
    }

  },[sessionId])
  const tabOptions = [
    {
      title : "전체(" + postComponent.length + ")",
      onClick : () => {
        setFilteredComponent(postComponent)
      }
    },
    {
      title : "진행중(" + ingComponent.length + ")",
      onClick : () => {
        setFilteredComponent(ingComponent)
      }
    },
    {
      title : "마감(" + endComponent.length +")",
      onClick : () => {
        setFilteredComponent(endComponent)
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
              <FilledButton onClick={() =>{navigate("/CompanyRegPost")}}>채용 공고 등록</FilledButton>
              </ButtonArticle>
            </TabSection>
            <ComponetsSection>
              {filteredComponent.length ? filteredComponent.map((data) => <PostComponents key = {data.postId} data ={data}/>) : <AlertText>공고가 없습니다.</AlertText>}
            </ComponetsSection>
        </MainContent>
    </Container>
  )
}

export default Index

const Container = styled.div`
      font-family: 'Nanum Square Neo', sans-serif;
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

const AlertText = styled.div`
    width : 100%;
    text-align : center;
    padding : 30px;
    font-size : 30px;
`