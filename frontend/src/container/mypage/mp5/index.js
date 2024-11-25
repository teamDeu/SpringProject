// index.js
import React, { useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import JobCard from '../../../components/mypage/JobCard';
import CompanyCard from '../../../components/mypage/CompanyCard';

const Index = () => {
    const [activeTab, setActiveTab] = useState("스크랩"); // 탭 상태 관리
    const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 기업 상태

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSelectedCompany(null); // 탭 전환 시 선택 초기화
    };

    const handleCompanyClick = (companyName) => {
        setSelectedCompany(companyName); // 선택된 기업 업데이트
    };

    // 스크랩된 채용 정보
    const scrapList = [
        {
            company: "지엔에이컴퍼니",
            title: "[플레이오] Python 백엔드 개발",
            experience: "2 ~ 6년",
            education: "무관",
            location: "서울",
            deadline: "2024-11-13",
        },
        {
            company: "지엔에이컴퍼니",
            title: "[플레이오] Node.js 개발자",
            experience: "1 ~ 3년",
            education: "무관",
            location: "부산",
            deadline: "2024-12-01",
        },
    ];

    // 관심기업 목록
    const companyList = [
        { logo: "https://via.placeholder.com/50", name: "(주)네오아이티피", jobs: 4 },
        { logo: "https://via.placeholder.com/50", name: "(주)패러티", jobs: 4 },
        { logo: "https://via.placeholder.com/50", name: "(주)에스에이엠", jobs: 0 },
        { logo: "https://via.placeholder.com/50", name: "인터링크(주)", jobs: 3 },
        { logo: "https://via.placeholder.com/50", name: "(주)지엔에이컴퍼니", jobs: 3 },
        { logo: "https://via.placeholder.com/50", name: "효성그룹", jobs: 4 },
    ];

    // 각 기업별 채용 정보
    const jobList = {
        "(주)네오아이티피": [
            {
                company: "(주)네오아이티피",
                title: "[네오아이티피] Java 백엔드 개발자",
                experience: "3 ~ 5년",
                education: "학사 이상",
                location: "서울",
                deadline: "2024-11-20",
            },
        ],
        "(주)지엔에이컴퍼니": [
            {
                company: "(주)지엔에이컴퍼니",
                title: "[플레이오] Python 백엔드 개발",
                experience: "2 ~ 6년",
                education: "무관",
                location: "서울",
                deadline: "2024-11-13",
            },
            {
                company: "(주)지엔에이컴퍼니",
                title: "[플레이오] Node.js 개발자",
                experience: "1 ~ 3년",
                education: "무관",
                location: "부산",
                deadline: "2024-12-01",
            },
        ],
    };

    return (
        <Container>
            <HeaderContainer>
                <JobTopBar />
            </HeaderContainer>
            <PageContent>
                <Tabs>
                    <Tab
                        active={activeTab === "스크랩"}
                        onClick={() => handleTabClick("스크랩")}
                    >
                        스크랩
                    </Tab>
                    <Tab
                        active={activeTab === "관심기업"}
                        onClick={() => handleTabClick("관심기업")}
                    >
                        관심기업
                    </Tab>
                </Tabs>

                {/* 스크랩 탭 */}
                {activeTab === "스크랩" && (
                    <Content>
                        <ControlRow>
                            <Checkbox type="checkbox" />
                            <DeleteText>삭제</DeleteText>
                        </ControlRow>
                        <JobList>
                            {scrapList.map((job, index) => (
                                <JobCard key={index} {...job} />
                            ))}
                        </JobList>
                    </Content>
                )}

                {/* 관심기업 탭 */}
                {activeTab === "관심기업" && (
                    <Content>
                        <CompanyList>
                            {companyList.map((company, index) => (
                                <CompanyCard
                                    key={index}
                                    logo={company.logo}
                                    companyName={company.name}
                                    jobCount={company.jobs}
                                    onClick={() => handleCompanyClick(company.name)}
                                />
                            ))}
                        </CompanyList>
                        {selectedCompany && (
                            <JobSection>
                                <JobSectionTitle>
                                    {selectedCompany} | 채용중{" "}
                                    {jobList[selectedCompany]?.length || 0}건
                                </JobSectionTitle>
                                <JobList>
                                    {jobList[selectedCompany]?.map((job, index) => (
                                        <JobCard key={index} {...job} />
                                    )) || <p>등록된 채용 정보가 없습니다.</p>}
                                </JobList>
                            </JobSection>
                        )}
                    </Content>
                )}
            </PageContent>
        </Container>
    );
};

export default Index;

// Styled Components
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderContainer = styled.div`
    width: 100%;
`;

const PageContent = styled.div`
    width: 70%;
    max-width: 1000px;
    margin-top: 40px;
`;

const Tabs = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
`;

const Tab = styled.div`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => (props.active ? "#000" : "#aaa")};
    border-bottom: ${(props) => (props.active ? "2px solid #00257A" : "none")};

    &:hover {
        color: #000;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ControlRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Checkbox = styled.input`
    width: 16px;
    height: 16px;
`;

const DeleteText = styled.span`
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const JobList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const CompanyList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

const JobSection = styled.div`
    margin-top: 40px;
`;

const JobSectionTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;
    