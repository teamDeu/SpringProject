import React from 'react'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
import Tab from '../../../components/company/Tab'
import FilledButton from '../../../components/FilledButton'
import DataTable from '../../../components/company/DataTable'

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
const index = () => {
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
                <DataTable/>
            </TableSection>
        </MainContent>
    </Container>
  )
}

export default index

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