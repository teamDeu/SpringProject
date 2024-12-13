import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MainContent from '../../../components/common/MainContent'
import JobTopBar from '../../../components/JobTopBar'
import ContentTitle from '../../../components/common/ContentTitle'
import Tab from '../../../components/company/Tab'
import CompanyInfo from '../../../components/company/CompanyInfo'
import CompanyDetail from '../../../components/company/CompanyDetail'
import { waitForSessionId } from '../../../context/SessionProvider'
import { GetCompanyInfo } from '../../../api/api'
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

    const [companyInfo, setCompanyInfo] = useState({ 
        id: sessionId || undefined,
        pwd: "",
        companyName: "Test",
        industry: "",
        location: "",
        businessNumber: "",
        since: 0,
        employees: 0,
        managerName: "",
        managerPhone: "",
        logoUrl: "",
    });

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
          if (sessionId) {
            try {
              const data = await GetCompanyInfo(sessionId); // API 호출
              console.log("getCompnay : ",data);
              setCompanyInfo(data); // 기존 상태를 유지하며 업데이트
            } catch (error) {
              console.error("Error fetching company info:", error);
            }
          }
        };
        fetchData();
      }, [sessionId]);

  return (
    <Container>
        <JobTopBar/>
        <MainContent>
            <TitleSection>
                <ContentTitle>개인정보관리</ContentTitle>
                <Tab options={[{title : "개인정보 수정" , onClick : () => {setTabState(0)}},{title : "기업정보 수정" , onClick : () => {setTabState(1)}}]}/>
            </TitleSection>
            {tabState == 0 ? <CompanyInfo companyInfo ={companyInfo} setCompanyInfo = {setCompanyInfo}/> : <CompanyDetail companyInfo={companyInfo} setCompanyInfo={setCompanyInfo}/>}
            
        </MainContent>
    </Container>
  )
}

export default Index


const Container = styled.div`
      font-family: 'Nanum Square Neo', sans-serif;
`

const TitleSection = styled.section`
    width:100%;
`