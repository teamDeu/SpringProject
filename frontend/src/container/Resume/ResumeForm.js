import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import emailIcon from './img/emailIcon.png';
import workIcon from './img/workIcon.png';
import pnumberIcon from './img/pnumberIcon.png';
import birthIcon from './img/birthIcon.png';
import addPhotoIcon from './img/addPhotoIcon.png'; 
import BemailIcon from './img/BemailIcon.png';
import BworkIcon from './img/BworkIcon.png';
import BpnumberIcon from './img/BpnumberIcon.png';
import BbirthIcon from './img/BbirthIcon.png';
import Delw from './img/Delw.png';


const ResumeForm = () => {
    const [fileNames, setFileNames] = useState([]);
    const fileUploadInputRef = useRef(null); 

    const [selectedRegion, setSelectedRegion] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [photoPreview, setPhotoPreview] = useState(null);
    
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [experience, setExperience] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [desiredLocations, setDesiredLocations] = useState([]);

    const [jobRoles, setJobRoles] = useState([]);
    const [currentJobRole, setCurrentJobRole] = useState("");
    
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState("")


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
    
    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
    if (file) {
        setFileNames([file.name]);
        fileUploadInputRef.current.value = file.name;
    }
    };

    const handleRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setDistricts(cities[region] || []); 
        setSelectedDistrict("");
    }

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleAddLocation = () => {
        if (selectedRegion && selectedDistrict) {
            const location = `${selectedRegion} ${selectedDistrict}`;
            if (!desiredLocations.includes(location)) {
                setDesiredLocations([...desiredLocations, location]);
                setSelectedRegion("");
                setSelectedDistrict("");
            }
        }
    };

    const handleRemoveLocation = (location) => {
        setDesiredLocations(desiredLocations.filter(item => item !== location));
    };

    const handleAddJobRole = () => {
        if (currentJobRole && !jobRoles.includes(currentJobRole)) {
            setJobRoles([...jobRoles, currentJobRole]);
            setCurrentJobRole("");
        }
    };

    const handleRemoveJobRole = (role) => {
        setJobRoles(jobRoles.filter(item => item !== role));
    };

    const handleAddSkill = () => {
        if (currentSkill && !skills.includes(currentSkill)) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill("");
        }
    };

    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(item => item !== skill));
    };

    const handlePhotoClick = () => {
        document.getElementById("photoUploadInput").click();
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setPhotoPreview(imageUrl); 
        }
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };


    return (
        <FormContainer>
            <Title>이력서 작성</Title>
            <Form>
                <InputGroup>
                    <Input type="text" placeholder="이력서 제목을 입력해주세요." />
                    <Input type="text" placeholder="이력서에 대한 간단한 설명을 입력해주세요." />
                </InputGroup>

                <Divider />

                <ContactRow>
                    <ContactInfo>
                        <UserNameDisplay>김세영</UserNameDisplay>

                        <InfoField>
                            <Icon src={email ? BemailIcon : emailIcon} alt="이메일 아이콘" />
                            <InfoFieldInput 
                                type="text" 
                                placeholder="이메일을 입력해주세요."
                                value={email}
                                onChange={handleInputChange(setEmail)}
                            />
                        </InfoField>

                        <InfoField>
                            <Icon src={birthDate ? BbirthIcon : birthIcon} alt="생년월일 아이콘" />
                            <InfoFieldInput 
                                type="text" 
                                placeholder="생년월일을 입력해주세요."
                                value={birthDate}
                                onChange={handleInputChange(setBirthDate)}
                            />
                        </InfoField>

                        <InfoField>
                            <Icon src={experience ? BworkIcon : workIcon} alt="경력 아이콘" />
                            <InfoFieldInput 
                                type="text" 
                                placeholder="총 경력을 입력해주세요."
                                value={experience}
                                onChange={handleInputChange(setExperience)}
                            />
                        </InfoField>

                        <InfoField>
                            <Icon src={phoneNumber ? BpnumberIcon : pnumberIcon} alt="전화번호 아이콘" />
                            <InfoFieldInput 
                                type="text" 
                                placeholder="전화번호를 입력해주세요."
                                value={phoneNumber}
                                onChange={handleInputChange(setPhoneNumber)}
                            />
                        </InfoField>
                    </ContactInfo>
                    
                    {photoPreview ? (
                        <PreviewContainer>
                            <PreviewImage src={photoPreview} alt="미리보기" />
                        </PreviewContainer>
                    ) : (
                        <PhotoUpload onClick={handlePhotoClick}>
                            <img src={addPhotoIcon} alt="사진 추가 아이콘" />
                            <p>사진 추가</p>
                            <input
                                id="photoUploadInput"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </PhotoUpload>
                    )}
                </ContactRow>

                <SelectContainer>
                    <Label>희망 근무 지역</Label>
                    <SelectRow>
                        <Select onChange={handleRegionChange} value={selectedRegion} color={selectedRegion ? '#000' : '#BABABA'}>
                            <option value="">지역</option>
                            {Object.keys(cities).map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </Select>
                        <Select onChange={handleDistrictChange} value={selectedDistrict} color={selectedDistrict ? '#000' : '#BABABA'}>
                            <option value="">행정구역</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </Select>
                        <AddButton onClick={handleAddLocation}>등록</AddButton>
                    </SelectRow>
                    <LocationTags>
                        {desiredLocations.map((location, index) => (
                            <LocationTag key={index}>
                                {location}
                                <DeleteButton onClick={() => handleRemoveLocation(location)}>
                                <img src={Delw} alt="삭제 아이콘" />
                                </DeleteButton>
                            </LocationTag>
                        ))}
                    </LocationTags>
                </SelectContainer>

                <InputContainer>
                    <Label>간단 소개</Label>
                    <InputContainerInput type="text" placeholder="간략하게 요약해서 3~5줄의 읽기 쉬운 내용으로 작성해주세요." />
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
                        {jobRoles.map((role, index) => (
                            <LocationTag key={index}>
                                {role}
                                <DeleteButton onClick={() => handleRemoveJobRole(role)}>
                                    <img src={Delw} alt="삭제 아이콘" />
                                </DeleteButton>
                            </LocationTag>
                        ))}
                    </LocationTags>
                </InputContainer>

                <InputContainer>
                    <Label>기술스택(업무 툴/스킬)</Label>
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
                        {skills.map((skill, index) => (
                            <LocationTag key={index}>
                                {skill}
                                <DeleteButton onClick={() => handleRemoveSkill(skill)}>
                                    <img src={Delw} alt="삭제 아이콘" />
                                </DeleteButton>
                            </LocationTag>
                        ))}
                    </LocationTags>
                </InputContainer>

                <InputContainer>
                    <Label>이력서 / 자기소개서 등록</Label>
                    <FileUploadContainer>
                        <FileUploadInput ref={fileUploadInputRef} type="text" placeholder="이력서 및 자기소개서 파일을 등록해주세요." readOnly />
                        <FileInputLabel>
                            <img src={addPhotoIcon} alt="파일 추가 아이콘" />
                            파일 등록
                            <FileInput type="file"  onChange={handleFileChange} multiple/>
                        </FileInputLabel>
                    </FileUploadContainer>
                </InputContainer>
            </Form>
            <ButtonContainer>
                <SaveButton>저장하기</SaveButton>
            </ButtonContainer>
        </FormContainer>
    );
};

export default ResumeForm;

const FormContainer = styled.div`
    padding: 20px;
    width: 69%;
    margin: 20px auto;
    background-color: none;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    
`;

const InputRow = styled.div`
    display: flex;
    align-items: center
    width: 100%;
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

const UserNameDisplay = styled.div`
    font-size: 20px;
    color: #000000;
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
    margin-top: 10px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
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


    p {
        color: #000000;
        font-weight: 700; 
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



const PhotoUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 255px;
    border: none;
    border-radius: 10px;
    background: #F6F6F6;
    text-align: center;
    color: #BABABA;
    font-size: 14px;
    overflow: hidden;

    img {
        width: 30px;
        height: 30px;
        margin-bottom: 8px;
    }

    p {
        color: #00257A;
        font-weight: 700; 
    }
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
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: flex-start;

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
    color: #BABABA;
    font-weight: 700;
    background-color: #FFFFFF;
     color: ${({ color }) => color}; 

    &:focus {
        outline: none;
        border-color: #B5B5B5;
    }

    option {
        color: #000000; 
        font-weight: 500; 
    }
`;

const InputContainer = styled.div`
    width: 90%;
    margin-top: 30px;
`;

const InputContainerInput = styled.input`
    margin-bottom: 5px;
    width: 98.3%;
    height: 25px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    padding: 10px;
    font-size: 14px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;

    &::placeholder {
        color: #BABABA; 
    }
`;

const Label = styled.p`
    font-size: 20px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 20px;
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
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;

    &:hover {
        background-color: #001A5A;
    }
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
