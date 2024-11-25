import React from 'react';
import styled from 'styled-components';
import JobTopBar2 from '../../../components/JobTopBar';
import JobApplicationStatus from '../../../components/mypage/JobApplicationStatus';

const Index = () => {
    // 지원 내역 데이터
    const applicationList = [
        { 
            company: "지엔에이컴퍼니",
            title: "채용큐레이터 신입 및 경력 모집",
            location: "서울 강서구",
            deadline: "2024-11-13",
            status: "심사중"
        },
        { 
            company: "지엔에이컴퍼니",
            title: "채용큐레이터 신입 및 경력 모집",
            location: "서울 강서구",
            deadline: "2024-11-13",
            status: "서류합격"
        },
        { 
            company: "지엔에이컴퍼니",
            title: "채용큐레이터 신입 및 경력 모집",
            location: "서울 강서구",
            deadline: "2024-11-13",
            status: "불합격"
        },
        { 
            company: "지엔에이컴퍼니",
            title: "채용큐레이터 신입 및 경력 모집",
            location: "서울 강서구",
            deadline: "2024-11-13",
            status: "심사중"
        },
        { 
            company: "지엔에이컴퍼니",
            title: "채용큐레이터 신입 및 경력 모집",
            location: "서울 강서구",
            deadline: "2024-11-13",
            status: "서류합격"
        },
    ];

    return (
        <Container>
            <HeaderContainer>
                <JobTopBar2 />
            </HeaderContainer>
            <PageContent>
                <Title>지원 내역</Title>
                <Subtitle>총 {applicationList.length}건</Subtitle>
                <ApplicationList>
                    {applicationList.map((application, index) => (
                        <JobApplicationStatus
                            key={index}
                            company={application.company}
                            title={application.title}
                            location={application.location}
                            deadline={application.deadline}
                            status={application.status}
                            statusColor={getStatusColor(application.status)} // 상태 색상 전달
                            onViewResume={() => alert(`이력서 보기 클릭: ${application.company}`)}
                        />
                    ))}
                </ApplicationList>
            </PageContent>
        </Container>
    );
};

// 상태별 색상 반환 함수
const getStatusColor = (status) => {
    switch (status) {
        case "심사중":
            return "#1A28F4"; // 파란색
        case "서류합격":
            return "#3AD847"; // 초록색
        case "불합격":
            return "#EA2D2E"; // 빨간색
        default:
            return "#000"; // 기본 색상 (검정)
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
