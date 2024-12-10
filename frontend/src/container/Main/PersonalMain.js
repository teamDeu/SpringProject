import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import JobTopBar from '../../components/JobTopBar';
import Eye from './img/eye.png';
import Hlogo from './img/Hlogo.png';
import Aa from './img/aa.png';
import Aa2 from './img/aa2.png';
import Co from './img/co.jpg';

function PersonalMain() {
    const [companies, setCompanies] = useState([]);
    const [popularJobPosts, setPopularJobPosts] = useState([]);
    const [urgentJobPosts, setUrgentJobPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/featured-companies') // 백엔드 API 경로
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching featured companies:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/popular-jobposts2') // 백엔드 API 경로
            .then((response) => {
                setPopularJobPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching popular job posts:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/urgent-jobposts2') // 백엔드 API 경로
            .then((response) => {
                setUrgentJobPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching urgent job posts:', error);
            });
    }, []);

    const handlePrevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (currentIndex < companies.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleCompanyClick = (companyId) => {
        navigate(`/jobdetail/${companyId}`); 
    };

    const handleJobPostingClick = (jobId) => {
        navigate(`/jobdetail/${jobId}`); 
    };

    return (
        <>
            <JobTopBar />    
            <Container>

                <Section>
                    <SectionTitle><img src={Eye}/>  많은 회원들이 눈여겨보는 기업</SectionTitle>
                    <CarouselWrapper>
                        <Arrow onClick={handlePrevImage} disabled={currentIndex === 0}>
                            &lt;
                        </Arrow>
                        <CompanyCarousel>
                            {companies.slice(currentIndex, currentIndex + 5).map((company, index) => (
                                <CompanyCard key={index} onClick={() => handleCompanyClick(company.id)}>
                                    <Logo src={company.logo} alt={`${company.companyName} 로고`} />
                                    <CompanyName>{company.companyName}</CompanyName>
                                    <Description>{company.title}</Description>
                                    <Views>{company.views} views</Views>
                                </CompanyCard>
                            ))}
                        </CompanyCarousel>
                        <Arrow onClick={handleNextImage} disabled={currentIndex >= companies.length - 5}>
                            &gt;
                        </Arrow>
                    </CarouselWrapper>
                </Section>


                <ViewContainer>
                    조회수 높은 기업의 채용 공고
                </ViewContainer>
                <JobPostingsContainer>
                    {popularJobPosts.map((job, index) => (
                        <JobPostingCard key={index} onClick={() => handleJobPostingClick(job.id)}>
                            <JobLogo src={job.logo || Co} alt={`${job.company} 로고`} />
                            <JobTitle>{job.title}</JobTitle>
                            <p>{job.company}</p>
                            <p>{job.salary || '연봉 정보 없음'}</p>
                            <JobDeadline>{job.deadline || '없음'}</JobDeadline>
                        </JobPostingCard>
                    ))}
                </JobPostingsContainer>

                <DeadlineContainer>
                    마감 임박한 채용 공고          
                </DeadlineContainer>
                <JobPostingsContainer>
                    {urgentJobPosts.map((job, index) => (
                        <JobPostingCard key={index} onClick={() => handleJobPostingClick(job.id)}>
                            <JobLogo src={job.logo || Co} alt={`${job.company} 로고`} />
                            <JobTitle>{job.title}</JobTitle>
                            <p>{job.company}</p>
                            <p>{job.salary || '연봉 정보 없음'}</p>
                            <JobDeadline>{job.deadline || '없음'}</JobDeadline>
                        </JobPostingCard>
                    ))}
                </JobPostingsContainer>


            </Container>
        </>
    );
};

export default PersonalMain;


const Container = styled.div`
    padding: 20px;
    width: 69%;
    margin: 20px auto;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
`;

const Section = styled.section`
    background: #F9F9FB;
    border-radius: 10px;
    height: 300px;
    padding: 20px;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    margin-top: 10px;
    margin-left: 35px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 25px;
    gap: 50px;

    img { 
        width: 30px;
        height: 30px;
        margin-bottom: -9px;
    }
`;

const CarouselWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CompanyCarousel = styled.div`
    display: flex;
    gap: 25px;
    overflow: hidden;
    justify-content: center;

    width: 95%;
`;

const CompanyCard = styled.div`
    flex: 0 0 auto;
    width: 180px;
    height: 200px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: relative; 
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
`;

const CompanyName = styled.h3`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
`;

const Views = styled.p`
    font-size: 12px;
    color: #999;
    position: absolute; 
    bottom: 20px; 
    right: 20px; 
    margin: 0; 
   
`;

const Arrow = styled.button`
    font-size: 30px;
    color: #666;
    cursor: pointer;
    user-select: none;
    margin: 10px 10px;
    border: none;
    background: none;

    &:hover {
        color: #333;
    }
`;

const ViewContainer = styled.div`
    text-align: center;
    padding: 15px 0;
    border-radius: 10px;
    font-size: 22px;
    color: none;
    border: 1px solid #ddd;
    margin-top: 70px;
`;

const DeadlineContainer = styled.div`
    text-align: center;
    padding: 15px 0;
    border-radius: 10px;
    font-size: 22px;
    color: none;
    border: 1px solid #ddd;
    margin-top: 70px;
`;

const JobPostingsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    margin-top: 35px;
`;

const JobPostingCard = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 320px;
    overflow: hidden;

    p {
        margin-top: 8px;
    }
`;

const JobImage = styled.img`
    width: 100%;
    height: 210px; 
    margin-top: 10px;
    object-fit: cover; 
    border-radius: 0 0 10px 10px;
    margin-bottom: 0px;
`;

const JobLogo = styled.img`
    width: 100px; /* 
    max-width: 100px;
    height: 120px; 
    margin-bottom: 15px;
    margin-top: 15px;
    object-fit: contain;
`;

const JobTitle = styled.h3`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
`;

const JobDeadline = styled.p`
    font-size: 14px;
    color: #ff0000;
    margin-top: 5px;
`;


