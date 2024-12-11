import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MainContent from '../../../components/common/MainContent'
import JobTopBar from '../../../components/JobTopBar'
import ContentTitle from '../../../components/common/ContentTitle'
import Tab from '../../../components/company/Tab'
import CompanyInfo from '../../../components/company/CompanyInfo'
import CompanyDetail from '../../../components/company/CompanyDetail'
import { waitForSessionId } from '../../../context/SessionProvider'
const Index = () => {

    const [tabState, setTabState] = useState(0);
    const [sessionId,setSessionId] = useState();
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

  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>개인정보관리</ContentTitle>
                <Tab options={[{title : "개인정보 수정" , onClick : () => {setTabState(0)}},{title : "기업정보 수정" , onClick : () => {setTabState(1)}}]}/>
            </TitleSection>
            {tabState == 0 ? <CompanyInfo/> : <CompanyDetail id = {sessionId}/>}
            
        </MainContent>
    </Container>
  )
}

export default Index


const Container = styled.div``

const TitleSection = styled.section`
    width:100%;
`