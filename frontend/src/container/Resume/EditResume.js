import React, { useEffect, useState, useRef  } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JobTopBar from '../../components/JobTopBar';
import BemailIcon from './img/BemailIcon.png';
import BworkIcon from './img/BworkIcon.png';
import BpnumberIcon from './img/BpnumberIcon.png';
import BbirthIcon from './img/BbirthIcon.png';
import AddPhotoIcon from './img/addPhotoIcon.png';
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

    const cities = {
        전체: ["전체", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"],
        서울: ["전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
        부산: ["전체", "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
        대구: ["전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
        인천: ["전체", "강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
        광주: ["전체", "광산구", "남구", "동구", "북구", "서구"],
        대전: ["전체", "대덕구", "동구", "서구", "유성구", "중구"],
        울산: ["전체", "남구", "동구", "북구", "울주군", "중구"],
        세종: ["전체", "세종시"],
        경기: ["전체", "가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시 분당구", "성남시 수정구", "성남시 중원구", "수원시 권선구", "수원시 영통구", "수원시 장안구", "수원시 팔달구", "시흥시", "안산시 단원구", "안산시 상록구", "안성시", "안양시 동안구", "안양시 만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 기흥구", "용인시 수지구", "용인시 처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
        강원: ["전체", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
        충북: ["전체", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군", "청주시 상당구", "청주시 서원구", "청주시 청원구", "청주시 흥덕구", "충주시"],
        충남: ["전체", "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "연기군", "예산군", "천안시 동남구", "천안시 서북구", "청양군", "태안군", "홍성군"],
        전북: ["전체", "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시 덕진구", "전주시 완산구", "정읍시", "진안군"],
        전남: ["전체", "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
        경북: ["전체", "경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시 남구", "포항시 북구"],
        경남: ["전체", "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시 마산합포구", "창원시 마산회원구", "창원시 성산구", "창원시 의창구", "창원시 진해구", "통영시", "하동군", "함안군", "함양군", "합천군"],
        제주: ["전체", "서귀포시", "제주시"]
    };

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [currentJobRole, setCurrentJobRole] = useState('');
    const [currentSkill, setCurrentSkill] = useState('');
    const fileUploadInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);

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
            filename: "example_resume.pdf",
            fileurl: "https://example.com/example_resume.pdf",
        };

        setResumeData(mockData); 
        setUploadedFile({ name: mockData.filename, url: mockData.fileurl });
    }, [id]);

    const handleInputChange = (key, value) => {
        setResumeData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddJobRole = () => {
        if (currentJobRole && !resumeData.jobRoles.includes(currentJobRole)) {
            setResumeData((prev) => ({
                ...prev,
                jobRoles: [...prev.jobRoles, currentJobRole],
            }));
            setCurrentJobRole('');
        }
    };

    const handleAddSkill = () => {
        if (currentSkill && !resumeData.skills.includes(currentSkill)) {
            setResumeData((prev) => ({
                ...prev,
                skills: [...prev.skills, currentSkill],
            }));
            setCurrentSkill('');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile({ name: file.name, url: URL.createObjectURL(file) }); // 새 파일 추가
        }
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

    const handleRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setDistricts(cities[region] || []);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleAddLocation = () => {
        if (selectedRegion && selectedDistrict) {
            const newLocation = `${selectedRegion} ${selectedDistrict}`;
            if (!resumeData.desiredLocations.includes(newLocation)) {
                setResumeData((prev) => ({
                    ...prev,
                    desiredLocations: [...prev.desiredLocations, newLocation],
                }));
            }
            setSelectedRegion('');
            setSelectedDistrict('');
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
                                <PhotoWrapper>
                                    <PreviewImage src={resumeData.photo} alt="미리보기" />
                                    <PhotoIconButton onClick={() => document.getElementById('photoUploadInput').click()}>
                                        <img src={AddPhotoIcon} alt="사진 변경" />
                                    </PhotoIconButton>
                                    <input
                                        id="photoUploadInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </PhotoWrapper>
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
                        <SelectRow>
                            <Select
                                onChange={handleRegionChange}
                                value={selectedRegion}
                                color={selectedRegion ? '#000' : '#BABABA'}
                            >
                                <option value="">지역</option>
                                {Object.keys(cities).map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                onChange={handleDistrictChange}
                                value={selectedDistrict}
                                color={selectedDistrict ? '#000' : '#BABABA'}
                            >
                                <option value="">행정구역</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </Select>
                            <AddButton onClick={handleAddLocation}>등록</AddButton>
                        </SelectRow>
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
                        <InputRow>
                            <InputContainerInput 
                                type="text" 
                                placeholder="직무를 입력해주세요."
                                value={currentJobRole}
                                onChange={(e) => setCurrentJobRole(e.target.value)}
                            />
                            <AddButton2 onClick={handleAddJobRole}>등록</AddButton2>
                        </InputRow>
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
                        <InputRow>
                            <InputContainerInput 
                                type="text" 
                                placeholder="기술스택을 등록해주세요."
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                            />
                            <AddButton2 onClick={handleAddSkill}>등록</AddButton2>
                        </InputRow>
                        <LocationTags>
                            {resumeData.skills.map((skill, index) => (
                                <LocationTag key={index}>
                                    {skill}
                                    <DeleteButton onClick={() => handleRemoveItem('skills', skill)}><img src={Delw}/></DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </InputContainer>
                    <InputContainer>
                        <Label>이력서 / 자기소개서 등록</Label>
                        <FileUploadContainer>
                            {uploadedFile ? (
                                <FilePreview>
                                    <FileLink href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
                                        {uploadedFile.name}
                                    </FileLink>
                                    <DeleteButton onClick={() => setUploadedFile(null)}>
                                        <img src={Delw} alt="삭제" />
                                    </DeleteButton>
                                </FilePreview>
                            ) : (
                                <FileUploadInput
                                    ref={fileUploadInputRef}
                                    type="text"
                                    placeholder="이력서 및 자기소개서 파일을 등록해주세요."
                                    readOnly
                                />
                            )}
                            <FileInputLabel>
                                <img src={AddPhotoIcon} alt="파일 추가 아이콘" />
                                파일 등록
                                <FileInput type="file" onChange={handleFileChange} />
                            </FileInputLabel>
                        </FileUploadContainer>
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
    object-fit: cover;
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

const PhotoWrapper = styled.div`
    position: relative;
    width: 340px;
    height: 255px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #F6F6F6;
`;

const PhotoIconButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 30px;
        height: 30px;
        opacity: 0.8;
    }

    &:hover img {
        opacity: 1;
    }
`;




const SelectRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: flex-start;
`;

const Select = styled.select`
    width: 160px;
    height: 40px;
    padding: 5px;
    border: 1.2px solid #B5B5B5;
    border-radius: 5px;
    font-size: 15px;
    font-family: 'Nanum Square Neo', sans-serif;
    color: ${({ color }) => color};
    background-color: #FFFFFF;

    &:focus {
        outline: none;
    }

    option {
        color: #000000;
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

const AddButton = styled.button`
    background-color: #00257A;
    color: white;
    border: none;
    padding: 5px 17px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const AddButton2 = styled.button`
    background-color: #00257A;
    color: white;
    border: none;
    padding: 5px 17px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
    font-weight: 600;
    font-size: 14px; 
    font-family: 'Nanum Square Neo', sans-serif;
    width: 60px;
    height: 46px;
    white-space: nowrap; 
`;

const FileUploadContainer = styled.div`
    width: 98.3%;
    position: relative;
`;

const FileUploadInput = styled.input`
    width: 93%;
    height: 25px; 
    padding: 10px;
    padding-right: 90px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    font-size: 14px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;

    &::placeholder {
        color: #BABABA; 
    }
`;

const FileInputLabel = styled.label`
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    background: none;
    color: #00257A;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Nanum Square Neo', sans-serif;
    font-size: 14px;

    img {
        width: 23px;
        height: 23px;
        margin-right: 3px;
    }
`;

const FileInput = styled.input`
    display: none;
    
`;

const FilePreview = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    color: #000;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    width: 100%;
    height: 25px; 
    padding: 10px;
`;

const FileLink = styled.a`
    text-decoration: none;
    color: #000000;
    font-weight: 700;

    &:hover {
        text-decoration: underline;
    }
`;


