import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JobTopBar2 from '../../../components/JobTopBar';
import JobApplicationStatus from '../../../components/mypage/JobApplicationStatus';
import { getUserInfo, GetCandidate2 } from '../../../api/api';

const Index = () => {
    const [userId, setUserId] = useState(null);
    const [applicationList, setApplicationList] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserId(userInfo.id);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                alert("로그인이 필요합니다.");
                window.location.href = "/login";
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (!userId) return;
    
        const fetchApplicationList = async () => {
            try {
                console.log("Sending API request to /candidate2 with userId:", userId);
                const candidates = await GetCandidate2(userId); // 수정된 Query Parameter 반영
                console.log("API Response:", candidates);
                const formattedList = candidates.map((candidate) => ({
                    company: candidate.companyName,
                    title: candidate.title,
                    location: candidate.location,
                    deadline: candidate.endDate || "마감일 없음",
                    status: candidate.passType || "상태 없음",
                }));
                console.log("Formatted List:", formattedList);
                setApplicationList(formattedList);
            } catch (error) {
                console.error("Failed to fetch application list:", error);
            }
        };
        
    
        fetchApplicationList();
    }, [userId]);
    

    return (
        <Container>
            <HeaderContainer>
                <JobTopBar2 />
            </HeaderContainer>
            <PageContent>
                <Title>지원 내역</Title>
                <Subtitle>총 {applicationList.length}건</Subtitle>
                <ApplicationList>
                    {applicationList.map((application, index) => {
                        console.log("Rendering Application:", application); // 각 항목 확인
                        return (
                            <JobApplicationStatus
                                key={index}
                                company={application.company}
                                title={application.title}
                                location={application.location}
                                deadline={application.deadline}
                                status={application.status}
                                statusColor={getStatusColor(application.status)}
                                onViewResume={() => alert(`이력서 보기 클릭: ${application.company}`)}
                            />
                        );
                    })}
                </ApplicationList>

            </PageContent>
        </Container>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case "심사중":
            return "#FFD700";  // 노란색
        case "서류 합격":
            return "#1E90FF";  // 파란색 (서류합격 -> 파란색)
        case "최종 합격":
            return "#90EE90";  // 연두색 (최종합격 -> 연두색)
        case "불합격":
            return "#EA2D2E";  // 빨간색 (불합격 -> 빨간색)
        default:
            return "#000";  // 기본값 검은색
    }
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
    margin-top: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
`;

const ApplicationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
