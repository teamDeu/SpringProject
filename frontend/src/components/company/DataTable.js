import React from 'react'
import styled from 'styled-components'
import TextButton from '../common/TextButton'
import FilledButton from '../FilledButton'

const Table = styled.table`
    border : 1px solid black;
    width : 100%;
`

const HeaderRow = styled.tr`
    border : 1px solid black;
    text-align : center;
    height : 5vh;
`

const ContentRow = styled.tr`
    
`
const HeaderCell = styled.td`
    height : 5vh;
    background-color : #F9F9F9;
    color : #B5B5B5;
`
const ContentCell = styled.td`
    vertical-align : middle;
    height : 15vh;
`

const ButtonArticle = styled.div`
    display : flex;
    flex-direction : column;
    gap : 15px;
    align-items :center;
    width : 100%;
    height : 100%;
`

const ContentBox = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    justify-content :center;
    align-items:center;
`

const tempData = [
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>
    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>

    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>

    },
    {
        "지원자명" : "김세영",
        "경력" : "신입",
        "최종학력" : "대학교(4년제) 졸업",
        "지원일" : "2024-11-02",
        "평가내용" : 
        <ButtonArticle>
            <TextButton>서류 합격</TextButton>
            <FilledButton>이력서 보기</FilledButton>
            <FilledButton>포트폴리오 보기</FilledButton>
        </ButtonArticle>

    },
]
const DataTable = () => {
    console.log()
  return (
    <Table>
        <HeaderRow>
            <HeaderCell><ContentBox><input type="checkbox"></input></ContentBox></HeaderCell>
        {Object.keys(tempData[0]).map((title) => <HeaderCell><ContentBox>{title}</ContentBox></HeaderCell>)}
        </HeaderRow>
        {tempData.map((item) => {
            return(
                <ContentRow>
                    <ContentCell><ContentBox><input type="checkbox"></input></ContentBox></ContentCell>
                    <ContentCell><ContentBox>{item.지원자명}</ContentBox></ContentCell>
                    <ContentCell><ContentBox>{item.경력}</ContentBox></ContentCell>
                    <ContentCell><ContentBox>{item.최종학력}</ContentBox></ContentCell>
                    <ContentCell><ContentBox>{item.지원일}</ContentBox></ContentCell>
                    <ContentCell>{item.평가내용}</ContentCell>
                </ContentRow>
            )
        })}
    </Table>
  )
}

export default DataTable

