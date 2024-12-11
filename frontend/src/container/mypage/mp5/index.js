import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import JobCard from '../../../components/mypage/JobCard';
import { GetUserScrapPosts, getUserInfo } from '../../../api/api'; // API 함수 가져오기

const Index = () => {
    const [activeTab, setActiveTab] = useState("스크랩"); // 탭 상태 관리
    const [scrapList, setScrapList] = useState([]); // 스크랩 데이터 상태
    const [userId, setUserId] = useState(null); // 사용자 ID 상태

    // 세션에서 사용자 ID 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(); // 사용자 정보 가져오기 API 호출
                setUserId(userInfo.id); // 사용자 ID 설정
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                alert("로그인이 필요합니다.");
                // 로그인이 필요하면 로그인 페이지로 이동
                window.location.href = "/login";
            }
        };

        fetchUserInfo();
    }, []);

    // 스크랩 데이터 가져오기
    useEffect(() => {
        if (!userId || activeTab !== "스크랩") return;

        GetUserScrapPosts(userId)
            .then((data) => {
                setScrapList(data); // 스크랩 데이터 상태 업데이트
            })
            .catch((error) => {
                console.error("스크랩 데이터 가져오기 실패:", error);
            });
    }, [userId, activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                </Tabs>

                {/* 스크랩 탭 */}
                {activeTab === "스크랩" && (
                    <Content>
                        <JobList>
                            {scrapList.map((job, index) => (
                                <JobCard
                                    key={index}
                                    company={job.company_name}
                                    title={job.title}
                                    experience={job.experience || "무관"}
                                    education={job.education || "무관"}
                                    location={job.location}
                                    deadline={job.end_date}
                                />
                            ))}
                        </JobList>
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
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const JobList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
