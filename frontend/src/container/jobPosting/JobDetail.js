import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const JobDetail = () => {
    const { id } = useParams();

    // Sample job data (fetch data from a real source or pass as props in production)
    const jobData = {
        1: {
            title: "전기전자 H/W, F/W 설계",
            company: "한전 KPS",
            logo: "https://via.placeholder.com/50",
            region: "경기권역",
            experience: "신입",
            education: "대졸 이상",
            deadline: "11.23(목)",
            description: "Python, MySQL, AWS를 사용한 백엔드 설계 및 개발...",
            skills: ["Python", "REST API", "AWS"],
        },
        2: {
            title: "온라인 AMD 채용",
            company: "Parity",
            logo: "https://via.placeholder.com/50",
            region: "서울권역",
            experience: "1년",
            education: "대졸 이상",
            deadline: "11.29(수)",
            description: "AMD와 관련된 업무...",
            skills: ["JavaScript", "React", "CSS"],
        },
        // Add more job details as necessary
    };

    const job = jobData[id];

    if (!job) {
        return <p>Job not found.</p>;
    }

    return (
        <Container>
            <Header>
                <Logo src={job.logo} alt={`${job.company} 로고`} />
                <div>
                    <Title>{job.title}</Title>
                    <Company>{job.company}</Company>
                </div>
            </Header>
            <Details>
                <p><strong>Region:</strong> {job.region}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p><strong>Education:</strong> {job.education}</p>
                <p><strong>Deadline:</strong> {job.deadline}</p>
            </Details>
            <Description>
                <p><strong>Description:</strong> {job.description}</p>
            </Description>
            <Skills>
                <h3>Required Skills:</h3>
                <ul>
                    {job.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </Skills>
        </Container>
    );
};

export default JobDetail;

const Container = styled.div`
    padding: 20px;
    font-family: "Nanum Square Neo", sans-serif;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const Logo = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const Company = styled.h2`
    font-size: 18px;
    color: #666;
    margin: 5px 0 0 0;
`;

const Details = styled.div`
    margin-bottom: 20px;

    p {
        margin: 5px 0;
    }
`;

const Description = styled.div`
    margin-bottom: 20px;

    p {
        line-height: 1.6;
    }
`;

const Skills = styled.div`
    h3 {
        margin-bottom: 10px;
    }

    ul {
        list-style: disc;
        margin: 0;
        padding-left: 20px;
    }
`;
