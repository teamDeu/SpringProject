import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Png from './img/png.png';
import { Link, useNavigate } from 'react-router-dom';
import AddPhotoIcon from './img/addPhotoIcon.png';
import Del from './img/Del.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JobTopBar from '../../components/JobTopBar';


const MyResume = ({ onAddResumeClick }) => {
    const [showMenu, setShowMenu] = useState(null); 
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [resumes, setResumes] = useState([]); 
    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                // 현재 로그인한 사용자의 ID 가져오기
                const sessionResponse = await axios.get("http://localhost:8080/api/session", {
                    withCredentials: true, // 세션 쿠키 포함
                });

                const userId = sessionResponse.data;

                // 로그인한 사용자의 이력서 가져오기
                const resumeResponse = await axios.get(`http://localhost:8080/api/resumes/user/${userId}`);
                setResumes(resumeResponse.data);
            } catch (error) {
                console.error("Error fetching resumes:", error);
            }
        };

        fetchResumes();
    }, []);

    const handleResumeEdit = (id) => {
        navigate(`/editresume/${id}`);
    };


    const handleMenuToggle = (id) => {
        setShowMenu(showMenu === id ? null : id); 
    };

    const handleAddResumeClick = () => {
        onAddResumeClick();
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileDelete = (fileName) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        );
    };

    const handleResumeDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/resumes/${id}`, {
                withCredentials: true, // 세션 쿠키 포함
            });
    
            if (response.status === 204) {
                // 성공적으로 삭제된 경우, 로컬 상태에서도 해당 이력서 제거
                setResumes((prevResumes) => prevResumes.filter((resume) => resume.id !== id));
                setShowMenu(null); // 메뉴 닫기
                alert("이력서가 성공적으로 삭제되었습니다.");
            } else {
                throw new Error(`Failed to delete resume. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
            alert("이력서 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDownloadPDF = async (resume) => {
        const element = document.getElementById(`resume-${resume.id}`);
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; 
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`${resume.title}.pdf`);
    };

    return (
        <>
            <JobTopBar />
        
            <Container>
                <Title>My 이력서</Title>
                <Section>
                    <Header>
                        <Subtitle>이력서 관리</Subtitle>
                        <ButtonContainer>
                            <Link to="/resumeform">
                                <AddResumeButton>이력서 작성하기</AddResumeButton>
                            </Link>    
                        </ButtonContainer>
                    </Header>
                    <ResumeBox>
                        {resumes.map((resume) => (
                            <ResumeItem key={resume.id} id={`resume-${resume.id}`}>
                                <TitleContainer>
                                    <ResumeTitle onClick={() => handleResumeEdit(resume.id)}>{resume.title}</ResumeTitle>
                                    <MenuButton onClick={() => handleMenuToggle(resume.id)}>
                                        <MenuIcon src={Png} alt="메뉴 아이콘" />
                                        {showMenu === resume.id && (
                                            <DropdownMenu>
                                                <MenuItem onClick={() => handleDownloadPDF(resume)}>PDF 다운로드</MenuItem>
                                                <MenuItem delete onClick={() => handleResumeDelete(resume.id)}>
                                                    이력서 삭제
                                                </MenuItem>
                                            </DropdownMenu>
                                        )}
                                    </MenuButton>
                                </TitleContainer>
                                <ResumeDescription>{resume.description}</ResumeDescription>
                                <Actions>
                                    <Date>
                                        {resume.updatedAt 
                                            ? "수정   :  " + new window.Date(resume.updatedAt).toLocaleDateString() 
                                            : resume.createdAt 
                                                ? new window.Date(resume.createdAt).toLocaleDateString() 
                                                : 'N/A'}
                                    </Date>

                                </Actions>
                            </ResumeItem>
                        ))}
                    </ResumeBox>
                </Section>
                <Section>
                    <Subtitle>첨부파일</Subtitle>
                    <Description>경험을 보여줄 수 있는 포트폴리오 / 경력기술서 등을 첨부해보세요. (PDF를 권장합니다.)</Description>
                    <AttachmentBox>
                        {uploadedFiles.length > 0 ? (
                            uploadedFiles.map((file, index) => (
                                <FileItem key={index}>
                                    {file.name}
                                    <DeleteButton onClick={() => handleFileDelete(file.name)}>
                                        <img src={Del} alt="삭제 아이콘" />
                                    </DeleteButton>
                                </FileItem>
                            ))
                        ) : (
                            <Placeholder>첨부파일이 비어있습니다.</Placeholder>
                        )}
                        <FileUploadButton>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                        </FileUploadButton>
                    </AttachmentBox>
                    <Label htmlFor="file-upload">
                        <img src={AddPhotoIcon} alt="사진 추가 아이콘" style={{ width: '19px', height: '19px' }} />
                        첨부파일 추가
                    </Label>
                </Section>
            </Container>
        </>
    );
};

export default MyResume;


const Container = styled.div`
    padding: 20px;
    width: 69%;
    margin: 20px auto;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
`;

const Title = styled.h2`
    text-align: left;
    font-size: 30px;
    margin-bottom: 30px;
`;

const Section = styled.div`
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 40px;
    margin-bottom: 30px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Subtitle = styled.h3`
    margin-left: 30px;
    font-size: 28px;
    margin-bottom: 5px;
    font-weight: 600;
`;

const ButtonContainer = styled.div``;

const AddResumeButton = styled.button`
    background-color: #00257A;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    margin-top: -10px;
    margin-right: 30px;
    &:hover {
        background-color: #001A5A;
    }
`;

const ResumeBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
    justify-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 20px;
    
`;

const ResumeItem = styled.div`
    background: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 400;
    height: 120px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ResumeTitle = styled.h4`
    font-size: 17px;
    font-weight: 700;
`;

const ResumeDescription = styled.p`
    font-weight: 400;
    font-size: 15px;
    margin-top: 10px;
`;

const Actions = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
`;

const Date = styled.span`
    font-size: 11px;
    color: #757575;
    font-weight: 650;
    margin-left: auto;
    margin-top: 40px;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative; 
`;

const MenuIcon = styled.img`
    width: 5px;
    height: 14px;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 20px; 
    right: 0;
    background-color: #fff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    width: 100px;
    padding: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MenuItem = styled.div`
    font-size: 13px;
    padding: 6px 10px;
    cursor: pointer;
    color: ${(props) => (props.delete ? 'red' : '#000')};
    font-family: 'Nanum Square Neo', sans-serif;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Description = styled.p`
    margin-left: 30px;
    font-size: 15px;
    color: #494949;
    margin-bottom: 15px;
    margin-top: 20px;
`;

const AttachmentBox = styled.div`
    border: 1px dashed #ddd;
    border-radius: 10px;
    padding: 30px;
    text-align: left;
    margin-top: 20px;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Placeholder = styled.p`
    color: #aaa;
    font-size: 17px;
    margin-top: 20px;
    text-align: center;
`;

const FileUploadButton = styled.div`
    margin-top: 20px;
`;

const Label = styled.label`
    color: #00257A;
    cursor: pointer;
    font-size: 14px;
    margin-left: 30px;
    margin-top: 15px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
`;

const FileItem = styled.div`
    font-size: 14px;
    color: #494949;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    gap: 10px; 
    margin-bottom: 8px;
    align-items: center;
`;

const DeleteButton = styled.button`
     background: none;
    border: none;
    cursor: pointer;
    padding: 0px;

    img {
        margin-top: 7px;
        width: 20px;
        height: 20px;
    }

`;