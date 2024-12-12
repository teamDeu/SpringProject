import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import JobCard from '../../../components/mypage/JobCard';
import { GetUserScrapPosts, getUserInfo } from '../../../api/api'; // API 함수 가져오기
import axios from 'axios';

const Index = () => {
    const [activeTab, setActiveTab] = useState("스크랩"); // 탭 상태 관리
    const [scrapList, setScrapList] = useState([]); // 스크랩 데이터 상태
    const [userId, setUserId] = useState(null); // 사용자 ID 상태
    const [selectedJobs, setSelectedJobs] = useState([]); // 선택된 공고 ID 상태

    // 세션에서 사용자 ID 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(); // 사용자 정보 가져오기 API 호출
                setUserId(userInfo.id); // 사용자 ID 설정
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                alert("로그인이 필요합니다.");
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

    const handleSelectJob = (jobId, isSelected) => {
        if (isSelected) {
            setSelectedJobs((prev) => [...prev, jobId]); // 선택된 공고 추가
        } else {
            setSelectedJobs((prev) => prev.filter((id) => id !== jobId)); // 선택 해제
        }
    };

    const handleDeleteSelected = async () => {
        try {
            // 서버에 삭제 요청
            await Promise.all(
                selectedJobs.map((jobId) =>
                    axios.delete(`http://localhost:8080/api/favorites/${jobId}`, {
                        params: { userId },
                    })
                )
            );

            // UI에서 삭제된 데이터 제거
            const updatedScrapList = scrapList.filter((job) => !selectedJobs.includes(job.id));
            setScrapList(updatedScrapList); // UI 상태 업데이트
            setSelectedJobs([]); // 선택 상태 초기화
        } catch (error) {
            console.error("Error deleting selected jobs:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
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
                        <DeleteButton
                            onClick={handleDeleteSelected}
                            disabled={selectedJobs.length === 0}
                        >
                            삭제
                        </DeleteButton>
                        <JobList>
                            {scrapList.map((job, index) => (
                                <JobCard
                                    key={index}
                                    jobId={job.id} // 공고 ID 전달
                                    company={job.company_name}
                                    title={job.title}
                                    experience={job.experience || "무관"}
                                    education={job.education || "무관"}
                                    location={job.location}
                                    deadline={job.endDate}
                                    onSelect={handleSelectJob} // 선택 상태 전달
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

const DeleteButton = styled.button`
    align-self: flex-end;
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
