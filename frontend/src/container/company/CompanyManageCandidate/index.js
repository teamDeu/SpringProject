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

const AlertText = styled.div`
    width : 100%;
    text-align : center;
    padding : 30px;
    font-size : 30px;
`


const CandidateManageButtons = ({value = "심사중" , data}) => {
    const buttonColor = {
        심사중 : "black",
        "서류 합격" : "blue",
        "최종 합격" : "green",
        "불합격" : "red",
    }
    console.log("여기서확인중",value);
    const color = buttonColor[value] || "black"; // 기본값을 "black"으로 설정
    return (
        <ButtonArticle>
        <ChangeButton data = {data} title = "합격 여부" defaultValue = {{title : value , color : color}} options ={[
          {title :"심사중", color : buttonColor["심사중"]},{title : "서류 합격" , color : buttonColor["서류 합격"]},{title : "최종 합격" , color : buttonColor["최종 합격"]},{title : "불합격" , color :buttonColor["불합격"]}
        ]}/>
        <Button>이력서 보기 <img src ={triangleRightIcon}/></Button>
        <Button>포트폴리오 보기 <img src ={triangleRightIcon}/></Button>
        </ButtonArticle>
    )
}
const Index = () => {
    const [candidateData , setCandidateData] = useState([])
    const [formattedData , setFormattedData] = useState([])
    const setFormattedDataItems = (items) => {
        setFormattedData(items.map((item) => {
            return {
                지원자명 : item.name,
                경력 : item.experienceLevel,
                최종학력 : item.educationLevel + " " + item.educationStatus,
                지원일 : item.createAt,
                평가내용 : <CandidateManageButtons data= {item} value = {item.passType}/>
            }
        }))
    }
    const options = [
        {
            title: "전체(" + candidateData.length + ")",
            onClick: () => {
                if (candidateData.length) {
                    setFormattedDataItems(candidateData);  // 전체 데이터를 표시
                    console.log(candidateData);  // 상태 확인
                }
            }
        },
        {
            title: "서류 합격(" + candidateData.filter(item => item.passType === "서류 합격").length + ")",
            onClick: () => {
                const filteredData = candidateData.filter(item => item.passType === "서류 합격");
                if (filteredData.length) {
                    setFormattedDataItems(filteredData);
                } else {
                    setFormattedData([]);  // 빈 배열로 초기화
                }
                console.log(filteredData);  // 상태 확인
            }
        },
        {
            title: "최종 합격(" + candidateData.filter(item => item.passType === "최종 합격").length + ")",
            onClick: () => {
                const filteredData = candidateData.filter(item => item.passType === "최종 합격");
                if (filteredData.length) {
                    setFormattedDataItems(filteredData);
                } else {
                    setFormattedData([]);  // 빈 배열로 초기화
                }
                console.log(filteredData);  // 상태 확인
            }
        }
    ];
    
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
            setFormattedDataItems(candidateData)
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
                {formattedData.length ? <DataTable data ={formattedData}/> : <AlertText>지원자가 없습니다.</AlertText>}
            </TableSection>
        </MainContent>
    </Container>
  )
}

export default Index

