import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import InputArray from '../../../components/company/InputArray'
import SearchInput from '../../../components/company/SearchInput'
import PostInfoTable from '../../../components/company/PostInfoTable'
import InputWithPhoto from '../../../components/company/InputWithPhoto'
import FilledButton from '../../../components/FilledButton'
import { GetAllSkills, GetIdJobPost, PostJobPost } from '../../../api/api'
import InputArrayTitle from '../../../components/company/InputArrayTitle'
import { waitForSessionId } from '../../../context/SessionProvider'
import { useLocation } from 'react-router'
const searchIcon = process.env.PUBLIC_URL + '/icons/search.png';

const Index = () => {
  const [sessionId, setSessionId] = useState(null);
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
  const { state } = useLocation();
  const [skillData , setSkillData] = useState([]);
  const [postInfo , setPostInfo] = useState({
    company : sessionId,
    title : "",
    companyName : "",
    location : "",
    employmentType : "",
    salary : "",
    endDate : "",
    experience : "",
    education : "",
    commuteTime :"",
    skills : [],
    jobDuties :[],
    requirements:[],
    additionalPreferences:[],
    employeeBenefits:[],
    aboutCompany:{},
  });
  useEffect(() => {
    const fecthData = async() =>{
        try {
          const data = await GetAllSkills();
          setSkillData(data);
          if(state){
            const postData = await GetIdJobPost(state);
            setPostInfo({...postData,company : sessionId});
          }

        } catch (error) {
          
        }
    }
    fecthData();
  },[])

  const updatePostInfo = (type,value) =>{
    setPostInfo(prev => ({...prev,[type] : value}));
  }

  const updatePostInfoTable = (tableValue) =>{
    const keys = Object.keys(tableValue);
    keys.forEach((key) => updatePostInfo(key,tableValue[key]))
  }

  useEffect(() => {
    setPostInfo(prev => ({...prev,"company" : sessionId}))
  },[sessionId])
  useEffect(() => {
    console.log(postInfo);
  },[postInfo])
  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>채용 공고 등록</ContentTitle>
            </TitleSection>
            <TitleInputSection>
            <InputArrayTitle>채용 정보 (간단 요약)</InputArrayTitle>
            <InputSection>
                <TitleInput value ={postInfo.title} onBlur = {(e) => {updatePostInfo("title",e.target.value)}} placeholder='채용 공고 제목을 입력해주세요.'/>
                <CaptionInput value = {postInfo.companyName} onBlur = {(e) => {updatePostInfo("companyName",e.target.value)}} placeholder='기업 이름을 입력해주세요'/>
            </InputSection>
            </TitleInputSection>
            <PostInfoTable value ={postInfo} keys ={["experience", "salary", "education", "employmentType", "commuteTime", "location"]} updateValue = {(tableValue) => {updatePostInfoTable(tableValue)}}/>
            <SearchInput value = {postInfo.skills} data ={skillData} title ="기술스택(업무 툴/스킬)" placeholder="기술 스택을 등록해주세요." onChange = {(value)=>{updatePostInfo("skills",value)}}/>
            <InputArray value = {postInfo.jobDuties} title ="주요 업무" placeholder ="주요 업무를 입력해주세요." updateValue = {(value) => {updatePostInfo("jobDuties",value)}}/>
            <InputArray value = {postInfo.requirements} title ="자격 요건" placeholder ="자격 요건을 입력해주세요." updateValue = {(value) => {updatePostInfo("requirements",value)}}/>
            <InputArray value = {postInfo.additionalPreferences} title ="우대 사항" placeholder ="우대사항 조건을 입력해주세요." updateValue = {(value) => {updatePostInfo("additionalPreferences",value)}}/>
            <InputArray value = {postInfo.employeeBenefits} title ="복지 및 혜택" placeholder ="복지 및 해택을 입력해주세요." mainInput={"기업의 장점에 대해 한줄로 간단하게 작성해주세요."} updateValue = {(value) => {updatePostInfo("employeeBenefits",value)}}/>
            <Divider/>
            <InputWithPhoto value = {postInfo.aboutCompany} updateValue = {(value) => {updatePostInfo("aboutCompany",value)}} title="기업/서비스 소개"/>
            <ButtonSection>
            <FilledButton onClick = {() => {PostJobPost(postInfo)}} height = "40px">등록하기</FilledButton>
            </ButtonSection>
            
        </MainContent>
        
    </Container>

  )
}

export default Index

const Container = styled.div`
`
const Divider = styled.div`
    width : 100%;
    margin : 40px 0px;
    border : 1px solid #B5B5B5;
`
const TitleSection = styled.section`
    width:100%;
`
const ButtonSection = styled.section`
  width:100%;
  padding : 30px;
  text-align:center;
`

const InputSection = styled.div`
    display:flex;
    flex-direction : column;
    gap:20px;
    margin-bottom : 40px;
`
const TitleInput = styled.input`
    padding : 20px;
    font-size : 24px;
    border : 1px solid #B5B5B5;
    border-radius:10px;
`

const CaptionInput = styled.input`
    padding : 15px;
    font-size : 20px;
    border : 1px solid #B5B5B5;
    border-radius:10px;
`

const TitleInputSection = styled.div`
  width : 100%;
`