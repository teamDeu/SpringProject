import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import Tab from '../../../components/company/Tab'
import FilledButton from '../../../components/FilledButton'
import DataTable from '../../../components/company/DataTable'
import ChangeButton from '../../../components/company/ChangeButton'
import { useLocation } from 'react-router'
import { GetCandidate } from '../../../api/api'
const triangleRightIcon = process.env.PUBLIC_URL + '/icons/triangle-right.png';
const options = [
    {
        title : "전체",
        onClick : () =>{}
    },
    {
        title : "서류합격",
        onClick : () =>{}
    },
    {
        title : "최종합격",
        onClick : () =>{}
    },
]
const Container = styled.div``

const TitleSection = styled.section`
    width : 100%;
`
const TabSection = styled.section`
    width : 100%;
`

const ButtonSection = styled.section`
    display:flex;
    justify-content : flex-end;
    padding : 20px;
    width : 100%;
`

const TableSection = styled.section`
    width : 100%;
    display : flex;
    align-items : center;
`

const Button = styled.button`
    width : 180px;
    padding : 10px;
    font-size : 16px;
    position : relative;
    display:flex;
    background-color : #FFFEFE;
    align-items :center;
    border : 1px solid #B5B5B5;
    border-radius : 10px;
    justify-content : center;
    cursor : pointer;
    & > img{
        position : absolute;
        right : 10px;
        width : 16px;
    };
    &:hover{
        background-color : #B5B5B5;
    }
`
const ButtonArticle = styled.div`
    display : flex;
    flex-direction : column;
    gap : 15px;
    align-items :center;
    justify-content : center;
    width : 100%;
    height : 100%;
`
const tempData = [{
    지원자명: '김세영',
    경력: '신입',
    최종학력: '대학교(4년제) 졸업',
    지원일: '2024-11-02',
    평가내용 : <ButtonArticle>
        <ChangeButton title = "합격 여부" defaultValue = {{title : "서류 합격" , color : "blue"}} options ={[
          {title : "서류 합격" , color : "blue"},{title : "최종 합격" , color : "red"}
        ]}/>
        <Button>이력서 보기 <img src ={triangleRightIcon}/></Button>
        <Button>포트폴리오 보기 <img src ={triangleRightIcon}/></Button>
    </ButtonArticle>
  },
  {
    지원자명: '김세영',
    경력: '경력 2년',
    최종학력: '대학교(4년제) 졸업',
    지원일: '2024-11-02',
    평가내용 : <ButtonArticle>
        <ChangeButton title = "합격 여부" defaultValue = {{title : "서류 합격" , color : "blue"}} options ={[
          {title : "서류 합격" , color : "blue"},{title : "최종 합격" , color : "red"}
        ]}/>
        <Button>이력서 보기 <img src ={triangleRightIcon}/></Button>
        <Button>포트폴리오 보기 <img src ={triangleRightIcon}/></Button>
    </ButtonArticle>
  },
];

const CandidateManageButtons = () => {
    return (
        <ButtonArticle>
        <ChangeButton title = "합격 여부" defaultValue = {{title : "서류 합격" , color : "blue"}} options ={[
          {title : "서류 합격" , color : "blue"},{title : "최종 합격" , color : "red"}
        ]}/>
        <Button>이력서 보기 <img src ={triangleRightIcon}/></Button>
        <Button>포트폴리오 보기 <img src ={triangleRightIcon}/></Button>
        </ButtonArticle>
    )
}
const Index = () => {
    const [candidateData , setCandidateData] = useState([])
    const [formattedData , setFormattedData] = useState([
        {
            지원자명 : "데이터가",
            경력 :"존재하지",
            최종학력 : "않습니다.",
            지원일 : "",
            평가내용 : "",
        }
    ])
    const {state} = useLocation();
    console.log(state);
    useEffect(()=>{
        const fecthData = async() => {
            const data = await GetCandidate(state);
            if(data.length > 0){
                setCandidateData(data);
            }
            console.log(data);
        }
        fecthData();
    },[])

    useEffect(() => {
        if(candidateData.length > 0){
            setFormattedData(candidateData.map((item) => {
                return {
                    지원자명 : item.name,
                    경력 : item.experienceLevel,
                    최종학력 : item.educationLevel + " " + item.educationStatus,
                    지원일 : item.createAt,
                    평가내용 : <CandidateManageButtons/>
                }
            }))
        }
        
    },[candidateData])
  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>지원자관리</ContentTitle>
            </TitleSection>
            <TabSection>
                <Tab options={options}/>
            </TabSection>
            <ButtonSection>
                <FilledButton height = "40px">삭제</FilledButton>
            </ButtonSection>
            <TableSection>
                <DataTable data ={formattedData}/>
            </TableSection>
        </MainContent>
    </Container>
  )
}

export default Index

