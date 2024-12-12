import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Blocation from './img/blocation.png';
import Aress from './img/aress.png';
import Nonheart from './img/nonheart.png';
import Heart from './img/heart.png';
import Edit from './img/edit.png';
import Plus from './img/plus.png';
import Trash from './img/trash.png';
import JobTopBar from '../../components/JobTopBar';


const JobDetail = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [userId, setUserId] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const BACKEND_URL = "http://localhost:8080/uploads";

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 현재 로그인한 사용자 ID 가져오기
                const sessionResponse = await axios.get("http://localhost:8080/api/session", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                });

                const userId = sessionResponse.data;
                setUserId(userId);

                // 사용자 정보 가져오기
                const userResponse = await axios.get(`http://localhost:8080/api/user-details`, {
                    params: { userId },
                });

                setUserInfo(userResponse.data); // 사용자 정보 저장

                // 이력서 정보 가져오기
                const resumesResponse = await axios.get(`http://localhost:8080/api/resumes/user/${userId}`);
                console.log("Resumes:", resumesResponse.data);
                setResumes(resumesResponse.data);

                const jobResponse = await axios.get(`http://localhost:8080/api/idjobpost?id=${jobId}`);
                const jobData = jobResponse.data;

                // 이미지가 있는 경우 첫 번째 이미지만 사용
                setJob({
                    ...jobData,
                    images: jobData.images || [], // 이미지 리스트를 추가
                });

                // 즐겨찾기 상태 확인
                const favoriteResponse = await axios.get("http://localhost:8080/api/favorites/check", {
                    params: { userId, jobPostId: jobId },
                });

                setIsFavorited(favoriteResponse.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [jobId]);

    useEffect(() => {
        // views 증가 API 호출
        axios.put(`http://localhost:8080/api/jobpost/${jobId}/increment-views`)
            .catch((error) => console.error('Error incrementing views:', error));
    }, [jobId]);
    

    if (isLoading) {
        return <Container>Loading...</Container>;
    }

    if (!job) {
        return <Container>Job details not found.</Container>;
    }

    const toggleFavorite = async () => {
        try {
            if (isFavorited) {
                // 즐겨찾기 삭제
                await axios.delete(`http://localhost:8080/api/favorites/${jobId}`, {
                    params: { userId },
                });
                console.log("즐겨찾기 삭제 성공");
            } else {
                // 즐겨찾기 추가
                await axios.post("http://localhost:8080/api/favorites", {
                    userId,
                    jobPostId: jobId,
                });
                console.log("즐겨찾기 추가 성공");
            }
            setIsFavorited(!isFavorited); // 상태 업데이트
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleResumeSelect = (event) => {
        setSelectedResumeId(Number(event.target.value)); // 선택된 이력서 ID 설정
    };
    
    const handleApplyForJob = async () => {
        if (!selectedResumeId) {
            alert("이력서를 선택해주세요.");
            return;
        }
    
        const formData = new FormData();
        formData.append("postId", jobId);
        formData.append("resumeId", selectedResumeId);
    
        if (uploadedFiles.length > 0) {
            formData.append("file", uploadedFiles[0]); // 첫 번째 파일만 전송
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/candidate/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (response.status === 200) {
                alert("지원이 완료되었습니다!");
                toggleModal();
            } else {
                alert("지원 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error applying for job:", error);
            alert("지원 중 오류가 발생했습니다.");
        }
    };
    
    
    
    
    const handleEditClick = () => {
        navigate("/mp1"); 
    };

    const handleResumeEdit = (id) => {
        navigate(`/editresume/${id}`);
    };

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
                <Company>{job.companyName}</Company>
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
                                    <JobApplyButton type="button" onClick={handleApplyForJob}>지원하기</JobApplyButton>
                                </JobSummaryHeader>
                                <h4>{job.company}</h4>
                                <AccountInfo>
                                    <AccountHeader>
                                        <h4>계정 정보</h4>
                                        <EditIcon
                                            src={Edit}
                                            alt="Edit"
                                            onClick={handleEditClick} // 클릭 이벤트 추가
                                        />
                                    </AccountHeader>
                                    <BorderedBox>
                                        <AccountDetails>
                                        <p>이름</p>
                                        <p>{userInfo?.name || "정보 없음"}</p>
                                        <p>이메일</p>
                                        <p>{userInfo?.email || "정보 없음"}</p>
                                        <p>연락처</p>
                                        <p>{userInfo?.phone || "정보 없음"}</p>
                                        <p>출생년도</p>
                                        <p>{userInfo?.birthDate || "정보 없음"}</p>
                                        </AccountDetails>
                                    </BorderedBox>
                                </AccountInfo>

                                <ResumeSection>
                                    <h4>지원 이력서</h4>
                                    {resumes.length > 0 ? (
                                        resumes.map((resume) => (
                                            <ResumeBox key={resume.id}>
                                                <input
                                                    type="radio"
                                                    id={`resume-${resume.id}`}
                                                    name="resume"
                                                    value={resume.id}
                                                    onChange={handleResumeSelect}
                                                />
                                                <label htmlFor={`resume-${resume.id}`}>{resume.title}</label>
                                                <ResumeRow>
                                                    <p>
                                                        {resume.updatedAt
                                                            ? `수정: ${new Date(resume.updatedAt).toLocaleDateString()}`
                                                            : `등록: ${new Date(resume.createdAt).toLocaleDateString()}`}
                                                    </p>
                                                    <ResumeEditIcon src={Edit} alt="Edit"  onClick={() => handleResumeEdit(resume.id)} />
                                                </ResumeRow>
                                            </ResumeBox>
                                        ))
                                    ) : (
                                        <p>등록된 이력서가 없습니다.</p>
                                    )}
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
                                <strong>경력</strong> {job.experience || "정보 없음"}
                            </InfoItem>
                            <InfoItem>
                                <strong>학력</strong> {job.education || "정보 없음"}
                            </InfoItem>
                            <InfoItem>
                                <strong>마감일</strong> {job.endDate || "정보 없음"}
                            </InfoItem>
                            <InfoItem>
                                <strong>근무지역</strong>
                                <AddressContainer>
                                    {job.location || "정보 없음"}
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
                                <strong>근무형태</strong> {job.employmentType || "정보 없음"}
                            </InfoItem>
                            <InfoItem>
                                <strong>급여</strong> {job.salary || "정보 없음"}
                            </InfoItem>
                            <InfoItem>
                                <strong>출퇴근 시간</strong> {job.commuteTime || "정보 없음"}
                            </InfoItem>
                        </InfoBlock>
                    </InfoContainer>
                </JobInfo>
                <Divider />
                <Skills>
                    <h3>기술 스택</h3>

                    
                    <SkillList>
                        {job.skills ? (
                            // JSON 문자열을 객체로 변환하여 name 값만 추출
                            JSON.parse(job.skills).map((skill, index) => (
                                <SkillItem key={index}>{skill.name || "알 수 없는 기술"}</SkillItem>
                            ))
                        ) : (
                            <SkillItem>기술 스택 정보가 없습니다.</SkillItem>
                        )}
                    </SkillList>


                </Skills>


                
                <Section>
                    <SectionTitle>주요 업무</SectionTitle>
                    <ul>
                        {job.jobDuties ? (
                            // JSON 문자열을 객체로 변환하여 value 값만 추출
                            JSON.parse(job.jobDuties).map((duty, index) => (
                                <li key={index}>{duty.value || "알 수 없는 업무"}</li>
                            ))
                        ) : (
                            <li>주요 업무 정보가 없습니다.</li>
                        )}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>자격 요건</SectionTitle>
                    <ul>
                        {job.requirements ? (
                            // JSON 문자열을 객체로 변환하여 value 값만 추출
                            JSON.parse(job.requirements).map((requirement, index) => (
                                <li key={index}>{requirement.value || "알 수 없는 자격 요건"}</li>
                            ))
                        ) : (
                            <li>자격 요건 정보가 없습니다.</li>
                        )}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>우대 사항</SectionTitle>
                    <ul>
                        {job.additionalPreferences ? (
                            // JSON 문자열을 객체로 변환하여 value 값만 추출
                            JSON.parse(job.additionalPreferences).map((preference, index) => (
                                <li key={index}>{preference.value || "알 수 없는 우대 사항"}</li>
                            ))
                        ) : (
                            <li>우대 사항 정보가 없습니다.</li>
                        )}
                    </ul>
                </Section>
                <Section>
                    <SectionTitle>복지 및 혜택</SectionTitle>
                        {job.employeeBenefits ? (
                            (() => {
                                const benefits = JSON.parse(job.employeeBenefits);
                                const mainBenefits = benefits.filter((benefit) => benefit.type === "main");
                                const otherBenefits = benefits.filter((benefit) => benefit.type !== "main");

                                return (
                                    <>
                                        <HighlightText>
                                            {mainBenefits.length > 0
                                                ? mainBenefits.map((benefit, index) => (
                                                    <span key={index}>{benefit.value}</span>
                                                ))
                                                : "메인 복지 정보가 없습니다."}
                                        </HighlightText>
                                        <ul>
                                            {otherBenefits.length > 0 ? (
                                                otherBenefits.map((benefit, index) => (
                                                    <li key={index}>{benefit.value || "알 수 없는 복지"}</li>
                                                ))
                                            ) : (
                                                <li>복지 및 혜택 정보가 없습니다.</li>
                                            )}
                                        </ul>
                                    </>
                                );
                            })()
                        ) : (
                            <p>복지 및 혜택 정보가 없습니다.</p>
                        )}
                </Section>
                <Divider />
                <CompanySection>
                    <SectionTitle>기업/서비스 소개</SectionTitle>
                    <ImageCarousel>
                        {job.images && job.images.length > 0 ? (
                            <>
                                
                                <ImageWrapper>
                                    <img
                                        src={`http://localhost:8080/uploads/${job.images[currentImageIndex].imgPath}`}
                                        alt={`기업 소개 이미지 ${currentImageIndex + 1}`}
                                    />
                                </ImageWrapper>
                                
                            </>
                        ) : (
                            <p>등록된 이미지가 없습니다.</p>
                        )}
                    </ImageCarousel>

                    <DescriptionText>
                        {job.aboutCompany || "기업 소개글이 없습니다."}
                    </DescriptionText>
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
    margin-left: 30px;
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

