import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Blocation from './img/blocation.png';
import Aress from './img/aress.png';
import Nonheart from './img/nonheart.png';
import Heart from './img/heart.png';
import Acompany from './img/acompany.png';
import Acompany2 from './img/acompany2.png';
import Edit from './img/edit.png';
import Plus from './img/plus.png';
import Trash from './img/trash.png';
import JobTopBar from '../../components/JobTopBar';

const JobDetail = () => {

    const jobData = {
        1: {
            title: "전기전자 H/W, F/W 설계",
            company: "한전 KPS",
            logo: "https://via.placeholder.com/50",
            region: "경기권역",
            experience: "신입",
            education: "대졸 이상",
            deadline: "11.23(목)",
            location: "서울 서초구 방배로27길 3 3층",
            description: "Python, MySQL, AWS를 사용한 백엔드 설계 및 개발...",
            skills: ["Python", "REST API", "AWS", "Python", "REST API", "Python", "REST API", "Python", "REST API"],
            tasks: ["플레이오 서비스 백엔드 개발 ", "데이터 처리(수집, 가공) Batch 개발 / 관리 (Python, MySQL, AWS S3)","API 개발 / 관리 (Python)"],
            requirements: ["Web에 대한 이해 - http 프로토콜, 헤더, 캐시, 웹소켓, 전반적인 동작과정", "RDB, MySQL, MongoDB 사용 경험", "Cloud 환경(AWS, Azure 등) 경험이 있으신 분"],
            preferences: ["서비스 개발 프로세스 및 API기반 서비스에 대한 폭넓은 이해", "Swagger 등 OpenAPI 기반 RESTful 서비스 개발 유경험자", "Python Pandas 라이브러리를 사용해보신 분", "클린코드를 만들기 위해 지속적으로 고민하고 리팩토링하시는 분"],
            benefits: ["Slack, Notion, Jira 등 다양한 업무용 도구(SaaS)를 적극적으로 사용합니다.", "27” 4K 모니터를 기본으로 사용하고 필요시 듀얼 모니터도 지원합니다.", "몸과 마음의 건강을 위해 건강검진과 심리상담을 지원합니다.", " 주 1회 재택 근무를 합니다.", "생일선물과 경조사, 명절선물을 챙겨드립니다."],
            companyDescription: {

                images : [Acompany, Acompany2, Acompany, Acompany2],

                description: [
                    "[GNA COMPANY]\n지엔에이컴퍼니는 게인사의 니즈에 최적화된 마케팅을 제공하는 게이머 전용 플랫폼  ‘플레이오’라는 안드로이드 앱을 서비스하고 있습니다. 게임을 사랑하는 유저들에게 최고의 혜택을 제공하는 플랫폼 서비스로써, 다양한 게임 엔터테인먼트 경험에 가치를 더하고자 합니다. 한국을 시작으로 미국, 일본에 서비스하고 있으며, 대만 진출을 준비하고 있습니다.",
                    "[플레이오 PlayIo]\nBest Value for Gamers! Nexon, Moon Active 등 글로벌 파트너사들과 협력합니다.Best Value for Gamers Nexon, Moon Active 등 200여 개의 파트너사들과 협업, 8,000,000 이상의 게임, 약 3,000,000명이 플레이오를 다운 받았으며, 3,000개 이상의 게임이 입점해 있습니다.",
                ],
            },
        
        },
        2: {
            title: "온라인 AMD 채용",
            company: "Parity",
            logo: "https://via.placeholder.com/50",
            region: "서울권역",
            experience: "1년",
            education: "대졸 이상",
            deadline: "11.29(수)",
            location: "서울 중구 을지로1가 100",
            description: "AMD와 관련된 업무...",
            skills: ["JavaScript", "React", "CSS"],
            tasks: ["플레이오 서비스 백엔드 개발 ", "데이터 처리(수집, 가공) Batch 개발 / 관리 (Python, MySQL, AWS S3)","API 개발 / 관리 (Python)"],
            requirements: ["Web에 대한 이해 - http 프로토콜, 헤더, 캐시, 웹소켓, 전반적인 동작과정", "RDB, MySQL, MongoDB 사용 경험", "Cloud 환경(AWS, Azure 등) 경험이 있으신 분"],
            preferences: ["서비스 개발 프로세스 및 API기반 서비스에 대한 폭넓은 이해", "Swagger 등 OpenAPI 기반 RESTful 서비스 개발 유경험자", "Python Pandas 라이브러리를 사용해보신 분", "클린코드를 만들기 위해 지속적으로 고민하고 리팩토링하시는 분"],
            benefits: ["Slack, Notion, Jira 등 다양한 업무용 도구(SaaS)를 적극적으로 사용합니다.", "27” 4K 모니터를 기본으로 사용하고 필요시 듀얼 모니터도 지원합니다.", "몸과 마음의 건강을 위해 건강검진과 심리상담을 지원합니다.", " 주 1회 재택 근무를 합니다.", "생일선물과 경조사, 명절선물을 챙겨드립니다."],
            companyDescription: {
                images: [
                    "https://via.placeholder.com/600x400?text=GNA+Company",
                    "https://via.placeholder.com/600x400?text=PlayIo+Service",
                ],
                description: [
                    "[GNA COMPANY]\n저희 회사는 게임사와 네크워크 최적화를 제공하는 게이머 중심 플랫폼으로 '플레이오'라는 안드로이드 앱 서비스를 제공합니다.",
                    "[PlayIo 서비스]\nBest Value for Gamers! Nexon, Moon Active 등 글로벌 파트너사들과 협력합니다.",
                ],
            },
        
        },
    };

    const { jobId } = useParams();
    const job = jobData[jobId];
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(job.location);
        alert("주소가 복사되었습니다.");
    };

    const handleOpenMap = () => {
        const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(job.location)}`;
        window.open(mapUrl, "_blank");
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === job.companyDescription.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? job.companyDescription.images.length - 1 : prevIndex - 1
        );
    };

    const toggleFavorite = () => {
        setIsFavorited((prev) => !prev); 
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    };
    
    const handleRemoveFile = (index) => {
        setUploadedFiles((prevFiles) =>
          prevFiles.filter((_, fileIndex) => fileIndex !== index)
        );
    };

    return (
        <>
            <JobTopBar />
            <Container>
                <Header>              
                    <HeaderLeft>
                        <Title>{job.title}</Title>                   
                        <CompanyWrapper>
                            <Icon src={isFavorited ? Heart : Nonheart} alt="관심기업" onClick={toggleFavorite}  />
                            <span>관심기업</span>
                        </CompanyWrapper>
                    </HeaderLeft>
                    <HeaderRight>
                        <ApplyButton onClick={toggleModal}>지원하기</ApplyButton>
                    </HeaderRight>

                </Header>
                <Company>{job.company}</Company>
                <Divider />
                {showModal && (
                    <ModalOverlay onClick={toggleModal}>
                        <ModalContainer onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>입사 지원</ModalTitle>
                                <CloseButton onClick={toggleModal}>X</CloseButton>
                            </ModalHeader>
                            <ModalContent>
                                <JobSummaryHeader>
                                    <h3>{job.title}</h3>
                                    <JobApplyButton>지원하기</JobApplyButton>
                                </JobSummaryHeader>
                                <h4>{job.company}</h4>
                                <AccountInfo>
                                    <AccountHeader>
                                        <h4>계정 정보</h4>
                                        <EditIcon src={Edit} alt="Edit" />
                                    </AccountHeader>
                                    <BorderedBox>
                                        <AccountDetails>
                                        <p>이름</p>
                                        <p>김지원</p>
                                        <p>이메일</p>
                                        <p>tpdud66770@naver.com</p>
                                        <p>연락처</p>
                                        <p>010-1234-1234</p>
                                        <p>출생년도</p>
                                        <p>2001</p>
                                        </AccountDetails>
                                    </BorderedBox>
                                </AccountInfo>

                                <ResumeSection>
                                    <h4>지원 이력서</h4>
                                    <ResumeBox >
                                        <input type="radio" id="resume" name="resume" />
                                        <label htmlFor="resume">김지원_이력서_제목</label>
                                        <ResumeRow>
                                            <p>2024.11.03 등록</p>
                                            <ResumeEditIcon src={Edit} alt="Edit" />
                                        </ResumeRow>
                                    </ResumeBox >
                                </ResumeSection>

                                <AttachmentSection>
                                    <h4>첨부파일</h4>
                                    <AttachmentHeader>
                                        <h2>같이 제출하실 첨부파일을 선택해주세요!</h2>
                                        <AddFileButton onClick={() => document.getElementById("fileUploadInput").click()}>
                                            <img src={Plus} alt="첨부파일 추가" />
                                            첨부파일 추가
                                        </AddFileButton>
                                    </AttachmentHeader>
                                    <input
                                        id="fileUploadInput"
                                        type="file"
                                        multiple
                                        style={{ display: "none" }}
                                        onChange={handleFileUpload}
                                    />
                                    <Dropzone>
                                        {uploadedFiles.length > 0 ? (
                                        <FileList>
                                            {uploadedFiles.map((file, index) => (
                                            <FileItem key={index}>
                                                {file.name}
                                                <RemoveFileButton onClick={() => handleRemoveFile(index)}><img src={Trash} /></RemoveFileButton>
                                            </FileItem>
                                            ))}
                                        </FileList>
                                        ) : (
                                        <>
                                            <h2>첨부파일이 비어있습니다.</h2>
                                            <p>PDF 형식을 추천드립니다!</p>
                                        </>
                                        )}
                                    </Dropzone>
                                </AttachmentSection>
                            </ModalContent>
                        </ModalContainer>
                    </ModalOverlay>
                )}

                <JobInfo>
                    <InfoContainer>
                        <InfoBlock>
                            <InfoItem>
                                <strong>경력</strong> {job.experience}
                            </InfoItem>
                            <InfoItem>
                                <strong>학력</strong> {job.education}
                            </InfoItem>
                            <InfoItem>
                                <strong>마감일</strong> {job.deadline}
                            </InfoItem>
                            <InfoItem>
                                <strong>근무지역</strong>
                                <AddressContainer>
                                    {job.location}
                                    <IconWrapper>
                                        <Icon src={Blocation} onClick={handleOpenMap} /> 지도보기
                                        <Icon src={Aress} onClick={handleCopyAddress} />
                                        <AddressCopyText onClick={handleCopyAddress}>주소복사</AddressCopyText>
                                    </IconWrapper>
                                </AddressContainer>
                            </InfoItem>
                        </InfoBlock>
                    </InfoContainer>

                    
                    <InfoContainer>
                        <InfoBlock>
                            <InfoItem>
                                <strong>근무형태</strong> 정규직 수습기간 3개월
                            </InfoItem>
                            <InfoItem>
                                <strong>급여</strong> 면접 후 결정
                            </InfoItem>
                            <InfoItem>
                                <strong>출퇴근 시간</strong> 08:00 ~ 17:00
                            </InfoItem>
                        </InfoBlock>
                    </InfoContainer>
                </JobInfo>
                <Divider />
                <Skills>
                    <h3>기술 스택</h3>
                    <SkillList>
                        {job.skills.map((skill, index) => (
                            <SkillItem key={index}>{skill}</SkillItem>
                        ))}
                    </SkillList>
                </Skills>
                <Section>
                    <SectionTitle>주요 업무</SectionTitle>
                    <ul>
                        {job.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>자격 요건</SectionTitle>
                    <ul>
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>우대 사항</SectionTitle>
                    <ul>
                        {job.preferences.map((pref, index) => (
                            <li key={index}>{pref}</li>
                        ))}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>복지 및 혜택</SectionTitle>
                    <HighlightText>
                        개인의 성장이 팀의 성장이라고 믿습니다. 개인의 성장을 위해 다양한 지원을 아끼지 않습니다.
                    </HighlightText>
                    <ul>
                        {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </Section>
                <Divider />
                <CompanySection>
                    <SectionTitle>기업/서비스 소개</SectionTitle>
                    <ImageCarousel>
                        <Arrow onClick={handlePrevImage}>&lt;</Arrow>
                        <ImageWrapper>
                            <img
                                src={job.companyDescription.images[currentImageIndex]}
                                alt={`기업 소개 이미지 ${currentImageIndex + 1}`}
                            />
                        </ImageWrapper>
                        <Arrow onClick={handleNextImage}>&gt;</Arrow>
                    </ImageCarousel>
                    <CompanyDescriptions>
                        {job.companyDescription.description.map((desc, index) => (
                            <DescriptionText key={index}>{desc}</DescriptionText>
                        ))}
                    </CompanyDescriptions>
                </CompanySection>        

            </Container>
        </>
    );
};

export default JobDetail;

const Container = styled.div`
    padding: 20px;
    width: 69%;
    margin: 20px auto;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: auto;
`;


const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 0px;
    font-weight: 700;
`;

const CompanyWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid #C4C4C8;
    padding: 10px;
    margin-top: 0px;
    
    span {
        font-size: 14px;
    }
`;



const ApplyButton = styled.button`
    background-color: #00257a;
    color: #fff;
    border: none;
    padding: 15px 40px;
    font-size: 15px;
    cursor: pointer;
    margin-top: -10px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;

`;

const Company = styled.h2`
    font-size: 16px; 
    font-weight: 550;
    margin-top: -5px;
    color: #666; 
    margin-bottom: 10px; 
    margin-left: 5px;

`;


const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin: 50px 0;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 20px;
    border: none;
`;

const JobInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    margin-top: 40px;
`;

const InfoBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InfoItem = styled.div`
    display: flex; 
    align-items: center;
    font-size: 13px;
    color: #333;
    gap: 50px;
    margin-left: 20px;


    strong {
        font-size: 15px;
        font-weight: 700;
        text-align: left;
        width: 120px; 
    }
    
    &:nth-child(4) {
        align-items: flex-start; 
        gap: 50px; 
    }
`;

const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-size: 13px;
`;

const AddressCopyText = styled.span`
    color: #00257A; 
    font-size: 13px;
    cursor: pointer;

`;

const IconWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    align-items: center;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 0px; 
`;

const Skills = styled.div`
    margin-top: 130px;

    h3 {
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: 1000;
        margin-left: 25px;
    }
`;

const SkillList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    list-style: none;
    margin-left: 25px;
`;

const SkillItem = styled.li`
    background-color: #F1F1F2;
    color: #333;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 5px;
`;

const Section = styled.div`
    margin-top: 100px;
    

    ul {
        margin: 15px 0 10px 55px;
        padding: 0;
        list-style: disc;
    }

    li {
        font-size: 14px;
        margin-bottom: 20px;
    }
`;

const SectionTitle = styled.h3`
    font-size: 20px;
    font-weight: 1000;
    margin-bottom: 15px;
    margin-left: 25px;
`;

const HighlightText = styled.div`
    margin-left: 25px;
    margin-bottom: 20px;
    color: #FF0000; 
    font-weight: 700;
    font-size: 15px;
`;


const CompanySection = styled.div`
    margin-top: 50px;
`;

const ImageCarousel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
    width: 1300px; 
    max-width: 600px; 
    height: auto;
    margin-bottom: 10px;

    img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
`;

const CompanyDescriptions = styled.div`
    margin-top: 40px;
    margin-left: 25px;

    img {
        width: 1000px;

    }
`;

const DescriptionText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    margin-top: 40px;
    white-space: pre-wrap;
    margin-bottom: 20px;

`;



const Arrow = styled.div`
    font-size: 30px;
    color: #666;
    cursor: pointer;
    user-select: none;
    margin: 0 10px;

    &:hover {
        color: #333;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: white;
    width: 550px;
    height: 700px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #00257A;
    color: #fff;
    padding: 20px;
`;

const ModalTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #fff;

`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
`;

const ModalContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 15px;
    margin-left: 10px;  

    h4 {
        margin-top: -10px;
        font-size: 14px;
    }

    scrollbar-width: none; 
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
        display: none; 
    }
`;

const JobSummaryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    h3 {
        font-size: 20px;
        font-weight: 700;
    }
`;

const JobApplyButton = styled.button`
    background-color: #00257a;
    color: #fff;
    border: none;
    padding: 10px 30px;
    font-size: 14px;
    font-weight: 700;
    margin-right: 15px;
    font-family: 'Nanum Square Neo', sans-serif;

`;

const AccountInfo = styled.div`

    margin-top: 30px;


    h4 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`;

const AccountDetails = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr; 
    row-gap: 10px; 
    column-gap: 20px; 
    margin-top: 5px;
    margin-bottom: 5px; 
    font-size: 14px;
    color: #333;

    p {
        margin: 5px; 
    }

    p:nth-child(odd) {
        
        font-weight: bold;
        color: #929191; 
    }

    p:nth-child(even) {
        color: #000; 
    }
`;

const BorderedBox = styled.div`
    margin-top: 5px;
    border: 1.3px solid #D9D9D9; 
    border-radius: 10px; 
    padding: 20px 15px; 
    background-color: #fff; 
    width: 490px;

`;

const ResumeSection = styled.div`
    margin-top: 40px;

    h4 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    input {
        margin-right: 10px;

    }

    p {
        margin-top: 10px;
        margin-left: 30px;
        font-size: 12px;
        color: #666;
    }

    label {
        font-size: 14px;
    }
`;

const ResumeBox = styled.div`
    margin-top: 10px;
    border: 1.3px solid #D9D9D9;
    border-radius: 10px;
    padding: 20px 15px;
    background-color: #fff;
    width: 490px;
`;

const AttachmentSection = styled.div`
    margin-top: 30px;


    h4 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 2px;
    }
    
    h2 {
        margin-left: 2px;
        font-size: 13px;
        color: #BCBABA;
    }
`;

const AttachmentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const AddFileButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: #00257A; 
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    font-family: 'Nanum Square Neo', sans-serif;
    margin-right: 15px;

    img {
        width: 24px;
        height: 24px;
        margin-right: 3px;
    }

`;

const Dropzone = styled.div`
    background: #fff;
    border: 1px dashed #ddd;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 10px;
    width: 500px;
    height: 20px;
    min-height: 80px;
    max-height: 300px;
    margin-top: 10px;
    overflow-y: auto;

    h2 {
        margin-top: 23px;
        font-size: 14px;
        color: #9C9C9C;
    }

    p {
        margin-top: 10px;
        font-size: 12px;
        color: #9C9C9C;
    }

    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;


const AccountHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const EditIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`;

const ResumeRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-size: 12px;
    color: #666;
`;

const ResumeEditIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 7px;

`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const RemoveFileButton = styled.button`
    border: none;
    background: none;

    img {
        margin-top: 5px;
        width: 20px;
        height: 20px;
    }
`;

