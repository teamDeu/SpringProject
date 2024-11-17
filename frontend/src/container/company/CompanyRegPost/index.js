import React from 'react'
import styled from 'styled-components'
import JobTopBar from '../../../components/JobTopBar'
import MainContent from '../../../components/common/MainContent'
import ContentTitle from '../../../components/common/ContentTitle'
const index = () => {
  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>채용 공고 등록</ContentTitle>
            </TitleSection>
        </MainContent>
    </Container>

  )
}

export default index

const Container = styled.div`
`

const TitleSection = styled.section`
    width:100%;
`