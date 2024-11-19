import React from 'react'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import InputArray from '../../../components/company/InputArray'
import SearchInput from '../../../components/company/SearchInput'
import PostInfoTable from '../../../components/company/PostInfoTable'
import CustomCalendar from '../../../components/common/CustomCalender'
import InputWithPhoto from '../../../components/company/InputWithPhoto'
import FilledButton from '../../../components/FilledButton'
const tempData = 
  [
    "Python", "Java", "JavaScript", "C", "C++", "C#", "Ruby", "PHP", "Go", "Rust", "Kotlin", 
    "Swift", "TypeScript", "R", "Dart", "SQL",
    "HTML", "CSS", "React.js", "Angular", "Vue.js", "Node.js", "Express.js", "Next.js", "Nuxt.js",
    "Spring Framework", "Spring Boot", "Django", "Flask", "Ruby on Rails", "ASP.NET Core", 
    "Laravel", "NestJS", "GraphQL",
    "Flutter", "React Native", "SwiftUI", "Jetpack Compose", "Android SDK",
    "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Oracle DB",
    "Docker", "Kubernetes", "AWS", "Google Cloud Platform (GCP)", "Microsoft Azure", 
    "Terraform", "Ansible",
    "TensorFlow", "PyTorch"
  ]
  const searchIcon = process.env.PUBLIC_URL + '/icons/search.png';
  const transformedData = tempData.map(item => ({
    img: searchIcon,
    name: item
  }));

const index = () => {
  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>채용 공고 등록</ContentTitle>
            </TitleSection>
            <PostInfoTable/>

            <SearchInput data ={transformedData} title ="기술스택(업무 툴/스킬)" placeholder="기술 스택을 등록해주세요."/>
            <InputArray title ="주요 업무" placeholder ="주요 업무를 입력해주세요."/>
            <InputArray title ="자격 요건" placeholder ="자격 요건을 입력해주세요."/>
            <InputArray title ="우대 사항" placeholder ="우대사항 조건을 입력해주세요."/>
            <InputArray title ="복지 및 혜택" placeholder ="복지 및 해택을 입력해주세요." mainInput={"기업의 장점에 대해 한줄로 간단하게 작성해주세요."}/>
            <Divider/>
            <InputWithPhoto title="기업/서비스 소개"/>
            <ButtonSection>
            <FilledButton height = "40px">수정하기</FilledButton>
            </ButtonSection>
            
        </MainContent>
        
    </Container>

  )
}

export default index

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