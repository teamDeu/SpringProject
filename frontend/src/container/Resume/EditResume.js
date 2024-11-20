import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JobTopBar from '../../components/JobTopBar';
import BemailIcon from './img/BemailIcon.png';
import BworkIcon from './img/BworkIcon.png';
import BpnumberIcon from './img/BpnumberIcon.png';
import BbirthIcon from './img/BbirthIcon.png';
import Delw from './img/Delw.png';

const EditResume = () => {
    const { id } = useParams();
    const [resumeData, setResumeData] = useState({
        title: '',
        description: '',
        name: '',
        email: '',
        birthDate: '',
        experience: '',
        phoneNumber: '',
        photo: '',
        desiredLocations: [],
        summary: '',
        jobRoles: [],
        skills: [],
    });

    useEffect(() => {
        const mockData = {
            id: id,
            title: `김세영_이력서${id}`,
            description: "첫번째 이력서 수정중입니다.",
            name: "김세영",
            email: "example@gmail.com",
            birthDate: "1990-01-01",
            experience: "3년",
            phoneNumber: "010-1234-5678",
            photo: "https://via.placeholder.com/150",
            desiredLocations: ["서울 강남구", "서울 서초구"],
            summary: "간단한 소개입니다. 김세영입니다.",
            jobRoles: ["프론트엔드 개발자", "백엔드 개발자"],
            skills: ["JavaScript", "React", "Node.js"],
        };

        setResumeData(mockData); 
    }, [id]);

    const handleInputChange = (key, value) => {
        setResumeData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddItem = (key, item) => {
        if (item && !resumeData[key].includes(item)) {
            setResumeData((prev) => ({
                ...prev,
                [key]: [...prev[key], item],
            }));
        }
    };

    const handleRemoveItem = (key, item) => {
        setResumeData((prev) => ({
            ...prev,
            [key]: prev[key].filter((i) => i !== item),
        }));
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setResumeData((prev) => ({
                ...prev,
                photo: imageUrl,
            }));
        }
    };
    

    return (
        <>
            <JobTopBar />
            <FormContainer>
                <Title>이력서 수정</Title>
                <Form>
                    <InputGroup>
                        <Input
                            type="text"
                            value={resumeData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        <Input
                            type="text"
                            value={resumeData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </InputGroup>
                    <Divider />
                    <ContactRow>
                        <ContactInfo>
                            <UserNameDisplay>{resumeData.name}</UserNameDisplay>
                            <InfoField>
                                <Icon src={BemailIcon} alt="이메일 아이콘" />
                                <InfoFieldInput
                                    type="text"
                                    value={resumeData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </InfoField>
                            <InfoField>
                                <Icon src={BbirthIcon} alt="생년월일 아이콘" />
                                <InfoFieldInput
                                    type="text"
                                    value={resumeData.birthDate}
                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                />
                            </InfoField>
                            <InfoField>
                                <Icon src={BworkIcon} alt="경력 아이콘" />
                                <InfoFieldInput
                                    type="text"
                                    value={resumeData.experience}
                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                />
                            </InfoField>
                            <InfoField>
                                <Icon src={BpnumberIcon} alt="전화번호 아이콘" />
                                <InfoFieldInput
                                    type="text"
                                    value={resumeData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                />
                            </InfoField>
                        </ContactInfo>
                        <PreviewContainer>
                            {resumeData.photo ? (
                                <PreviewImage src={resumeData.photo} alt="미리보기" />
                            ) : (
                                <PhotoUpload>
                                    <input
                                        id="photoUploadInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                    <PhotoButton
                                        onClick={() => document.getElementById('photoUploadInput').click()}
                                    >
                                        사진 업로드
                                    </PhotoButton>
                                </PhotoUpload>
                            )}
                        </PreviewContainer>
                    </ContactRow>
                    <SelectContainer>
                        <Label>희망 근무 지역</Label>
                        <LocationTags>
                            {resumeData.desiredLocations.map((location, index) => (
                                <LocationTag key={index}>
                                    {location}
                                    <DeleteButton onClick={() => handleRemoveItem('desiredLocations', location)}>
                                        <img src={Delw}/>
                                    </DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </SelectContainer>
                    <InputContainer>
                        <Label>간단 소개</Label>
                        <InputContainerInput
                            type="text"
                            value={resumeData.summary}
                            onChange={(e) => handleInputChange('summary', e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>개발 직무</Label>
                        <LocationTags>
                            {resumeData.jobRoles.map((role, index) => (
                                <LocationTag key={index}>
                                    {role}
                                    <DeleteButton onClick={() => handleRemoveItem('jobRoles', role)}><img src={Delw}/></DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </InputContainer>
                    <InputContainer>
                        <Label>기술스택</Label>
                        <LocationTags>
                            {resumeData.skills.map((skill, index) => (
                                <LocationTag key={index}>
                                    {skill}
                                    <DeleteButton onClick={() => handleRemoveItem('skills', skill)}><img src={Delw}/></DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </InputContainer>
                    
                </Form>
                <ButtonContainer>
                        <SaveButton>수정하기</SaveButton>
                    </ButtonContainer>
            </FormContainer>
        </>
    );
};

export default EditResume;


const FormContainer = styled.div`
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

const Form = styled.div`
    border: 1px solid #B5B5B5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 90%;
    margin-bottom: 30px;
`;

const Divider = styled.div`
    width: 90%;
    border-bottom: 1.2px solid #B5B5B5;
    margin-bottom: 10px;
`;
const Label = styled.p`
    font-size: 20px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 20px;
`;

const UserNameDisplay = styled.div`
    font-size: 20px;
    color: #000000;
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
    margin-top: 10px;
`;

const Input = styled.input`
    margin-bottom: 5px;
    width: 98.3%;
    height: 30px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    padding: 10px;
    font-size: 15px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;

    &::placeholder {
        color: #BABABA;
    }
`;

const ContactRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    
`;
const ContactInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 15px;
    
    
`;

const InfoField = styled.div`
    display: flex;
    align-items: left;
    gap: 0px;
    border: none;
    width: 34%;
    margin-top: 10px;

    img {
        width: 25px;
        height: 25px;
    }
    
`;

const InfoFieldInput = styled.input`
    width: 330px;  
    height: 22px;
    padding: 4px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;

    &::placeholder {
        color: #BABABA;
    }
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

const PreviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 255px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #F6F6F6;
`;


const PreviewImage = styled.img`
    width: 340px;
    height: 255px;
    object-fit: contain;
`;

const SelectContainer = styled.div`
    width: 90%;
`;

const LocationTags = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const LocationTag = styled.div`
    display: flex;
    align-items: center;
    padding: 6px 10px;
    background-color: #E0E8F9;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    color: black;
`;

const InputContainer = styled.div`
    width: 90%;
    margin-top: 30px;
`;

const InputContainerInput = styled.input`
    width: 98.3%;
    height: 30px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    padding: 10px;
    font-size: 15px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;
    &::placeholder {
        color: #BABABA;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SaveButton = styled.button`
    background-color: #00257A;
    color: white;
    padding: 17px 70px;
    border: none;
    margin-top: 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;

    &:hover {
        background-color: #001A5A;
    }
`;

const PhotoUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border: 1px dashed #B5B5B5;
    border-radius: 10px;
    background-color: #F6F6F6;
    text-align: center;
    cursor: pointer;
`;

const PhotoButton = styled.button`
    background-color: #00257A;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    &:hover {
        background-color: #001A5A;
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #666;
    margin-left: 8px;
    cursor: pointer;

    img {
        margin-top: 4px;
        width: 22px;
        height: 22px;
    }
`;

