import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import emailIcon from './img/emailIcon.png';
import workIcon from './img/workIcon.png';
import pnumberIcon from './img/pnumberIcon.png';
import birthIcon from './img/birthIcon.png';
import addPhotoIcon from './img/addPhotoIcon.png';
import BemailIcon from './img/BemailIcon.png';
import BworkIcon from './img/BworkIcon.png';
import BpnumberIcon from './img/BpnumberIcon.png';
import JobTopBar from '../../components/JobTopBar';
import BbirthIcon from './img/BbirthIcon.png';
import Delw from './img/Delw.png';

const EditResume  = () => {

    const { id: resumeId } = useParams(); // URL에서 resumeId 추출
    const [loading, setLoading] = useState(true);

    const [photoPreview, setPhotoPreview] = useState(null);
    const [desiredLocations, setDesiredLocations] = useState([]);

    const [jobCategories, setJobCategories] = useState([]); // JobCategory 데이터 저장
    const [selectedJobCategory, setSelectedJobCategory] = useState(""); // 선택된 JobCategory 저장
    const [jobRoles, setJobRoles] = useState([]); // 선택된 직무 저장

    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]); // 선택된 기술 스택


    const [locations, setLocations] = useState([]); // 전체 e_locations 데이터
    const [regionOptions, setRegionOptions] = useState([]); // 선택된 지역에 따른 행정구역
    const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 지역 (name)
    const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 행정구역 (region)

    const [resumeFile, setResumeFile] = useState(null);

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        email: "",
        birth: "",
        phone: "",
        profileImg: "",
    });

    const [resumeData, setResumeData] = useState({
        title: "",
        description: "",
        experienceYears: "",
        locations: [],
        jobRoles: [],
        skills: [],
        fileName: "",
        summary: "",
    });


    useEffect(() => {

        //현재 로그인한 사람
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/session", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰 사용 시
                    },
                    withCredentials: true, 
                });
    
                if (response.status === 200) {
                    // 서버에서 반환된 사용자 ID를 userInfo에 설정
                    const userId = response.data;
                    setUserInfo((prevState) => ({
                        ...prevState,
                        id: userId,
                    }));
                }
            } catch (error) {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            }
        };
    
        fetchUserInfo();

        
    


        //개발 직무 카테고리 가져옴
        const fetchJobCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/job-categories");
                if (response.status === 200) {
                    setJobCategories(response.data);
                }
            } catch (error) {
                console.error("JobCategory 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchJobCategories();

        //기술 스킬 가져옴
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/skills");
                if (response.status === 200) {
                    setSkills(response.data);
                }
            } catch (error) {
                console.error("기술 스택 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchSkills();

        //지역 가져옴
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/locations");
                if (response.status === 200) {
                    setLocations(response.data);
                }
            } catch (error) {
                console.error("e_locations 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchLocations();
    }, []);


    // 지역 선택에 따라 행정구역 필터링
    useEffect(() => {
        if (selectedLocation) {
            const filteredRegions = locations
                .filter((loc) => loc.name === selectedLocation)
                .map((loc) => loc.region);
            setRegionOptions(filteredRegions);
        } else {
            setRegionOptions([]);
        }
    }, [selectedLocation, locations]);

    useEffect(() => {
        const fetchUserDataAndResume = async () => {
            try {

                // 사용자 정보 로드
                const userResponse = await axios.get(`http://localhost:8080/api/eusers/${userInfo.id}`);
                if (userResponse.status === 200) {
                    const user = userResponse.data;
                    setUserInfo({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        profileImg: user.profileImg,
                        birth: user.birth,
                    });
    
                    // 프로필 이미지 미리보기
                    if (user.profileImg) {
                        setPhotoPreview(user.profileImg);
                    }
                }
    
                // 이력서 정보 로드
                const resumeResponse = await axios.get(`http://localhost:8080/api/resumes/${resumeId}`);
                if (resumeResponse.status === 200) {
                    const { title, description, experienceYears, summary, pdfUrl } = resumeResponse.data;
                    setResumeData((prevState) => ({
                        ...prevState,
                        title,
                        description,
                        experienceYears: experienceYears || "",
                        summary,
                        fileName: pdfUrl || "",
                    }));
                }

                // 지역 정보 로드
                const locationResponse = await axios.get(`http://localhost:8080/api/resume-locations/${resumeId}`);
                if (locationResponse.status === 200) {
                    const registeredLocations = locationResponse.data.map((loc) => ({
                        name: loc.location.name,
                        region: loc.location.region,
                    }));
                    setDesiredLocations(registeredLocations);
                }

                //직무 카테고리 정보 로드
                const response = await axios.get(`http://localhost:8080/api/resume-job-categories/${resumeId}`);
                if (response.status === 200) {
                    const categories = response.data.map((category) => ({
                        name: category.jobCategory.name,
                    }));
                    setJobRoles(categories.map((category) => category.name)); // 화면에 표시
                }

                const skillresponse = await axios.get(`http://localhost:8080/api/resume-skills/resume/${resumeId}`);
                if (skillresponse.status === 200) {
                    const fetchedSkills = skillresponse.data.map(skill => skill.skill.name);
                    setSelectedSkills(fetchedSkills); // 화면에 표시될 기술 스택 설정
                }


            } catch (error) {
                console.error("Error fetching user or resume data:", error);
            }
        };
    
        if (resumeId && userInfo.id) {
            fetchUserDataAndResume();
        }
    }, [resumeId, userInfo.id]);
    



    // 이력서 저장 핸들러
    const handleSave = async () => {
        try {

            // 기본 사용자 정보 업데이트
            await axios.put(`http://localhost:8080/api/eusers/${userInfo.id}`, {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                birth: userInfo.birth,
                phone: userInfo.phone,
                profileImg: userInfo.profileImg,
            }, {
                headers: { "Content-Type": "application/json" },
            });

            // 이력서 데이터 업데이트
            let fileUrl = resumeData.fileName || ""; 
            await axios.put(`http://localhost:8080/api/resumes/${resumeId}`, {
                userId: userInfo.id,
                title: resumeData.title,
                description: resumeData.description,
                experienceYears: parseInt(resumeData.experienceYears) || 0,
                pdfUrl: fileUrl,
                summary: resumeData.summary,
                updatedAt: new Date().toISOString().split('T')[0],
            }, {
                headers: { "Content-Type": "application/json" },
            });
            
            
            // 선택된 기술 스택 ID 리스트 생성
            const selectedSkillIds = selectedSkills.map(skillName => {
                const skill = skills.find(s => s.name === skillName);
                return skill ? skill.id : null;
            }).filter(Boolean); // 유효한 ID만 포함

            // 기술 스택 업데이트 요청
            await axios.put(`http://localhost:8080/api/resume-skills/resume/${resumeId}`, selectedSkillIds, {
                headers: { "Content-Type": "application/json" },
            });
            
            
            const selectedLocationIds = desiredLocations.map(location => {
                const locationData = locations.find(loc => loc.name === location.name && loc.region === location.region);
                return locationData ? locationData.id : null;
            }).filter(Boolean); // 유효한 ID만 포함
    
            await axios.put(`http://localhost:8080/api/resume-locations/resume/${resumeId}`, selectedLocationIds, {
                headers: { "Content-Type": "application/json" },
            });

            
            const selectedJobCategoryIds = jobRoles.map(roleName => {
                const jobCategory = jobCategories.find(jc => jc.name === roleName);
                return jobCategory ? jobCategory.id : null;
            }).filter(Boolean); // 유효한 ID만 포함
    
            // 직무 카테고리 업데이트 요청
            await axios.put(`http://localhost:8080/api/resume-job-categories/resume/${resumeId}`, selectedJobCategoryIds, {
                headers: { "Content-Type": "application/json" },
            });


            alert("이력서가 성공적으로 수정되었습니다!");

            window.location.reload()
        } catch (error) {
            console.error("이력서 수정 중 오류 발생:", error);
            alert("이력서 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleAddJobRole = () => {
        if (selectedJobCategory && !jobRoles.includes(selectedJobCategory)) {
            setJobRoles([...jobRoles, selectedJobCategory]);
            setSelectedJobCategory("");
        }
    };

    const handleAddSkill = () => {
        if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
            setSelectedSkills([...selectedSkills, selectedSkill]);
            setSelectedSkill("");
        } else {
            alert("이미 선택된 기술 스택입니다.");
        }
    };
    

    const handleRemoveJobRole = (role) => {
        setJobRoles(jobRoles.filter((item) => item !== role));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
    
            try {
                const response = await axios.post("http://localhost:8080/api/resumes/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const fileUrl = response.data;
    
                setResumeData((prevState) => ({
                    ...prevState,
                    fileName: fileUrl,
                }));
            } catch (error) {
                console.error("Resume file upload failed:", error);
            }
        }
    };
    

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
    
            try {
                const response = await axios.post(`http://localhost:8080/api/eusers/${userInfo.id}/upload-profile-img`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const imageUrl = response.data;
    
                setUserInfo((prevState) => ({
                    ...prevState,
                    profileImg: imageUrl,
                }));
    
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("Profile image upload failed:", error);
            }
        }
    };
    
    

    const handlePhotoClick = () => {
        const input = document.getElementById('photoUploadInput');
        if (input) {
            input.click(); // 파일 선택을 트리거
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
                            placeholder="이력서 제목을 입력해주세요."
                            value={resumeData.title}
                            onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="이력서에 대한 간단한 설명을 입력해주세요."
                            value={resumeData.description}
                            onChange={(e) => setResumeData({ ...resumeData, description: e.target.value })}
                        />
                    </InputGroup>

                    <UserInfoContainer>

                            <UserInfoField>
                                <UserInfoInput
                                    type="text"
                                    placeholder="이름을 입력해주세요."
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                />
                            </UserInfoField>
                            <UserInfo>
                            <UserInfoField>
                                <UserInfoIcon src={userInfo.email ? BemailIcon : emailIcon} alt="이메일" />
                                <UserInfoInput
                                    type="email"
                                    placeholder="이메일을 입력해주세요."
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                />
                            </UserInfoField>
                            <UserInfoField>
                                <UserInfoIcon src={userInfo.birth ? BbirthIcon : birthIcon} alt="생년월일" />
                                <UserInfoInput
                                    type="date"
                                    placeholder="생년월일을 입력해주세요."
                                    value={userInfo.birth}
                                    onChange={(e) => setUserInfo({ ...userInfo, birth: e.target.value })}
                                    isSelected={!!userInfo.birth}
                                />
                            </UserInfoField>
                            <UserInfoField>
                                <UserInfoIcon src={userInfo.phone ? BpnumberIcon : pnumberIcon} alt="전화번호" />
                                <UserInfoInput
                                    type="tel"
                                    placeholder="전화번호를 입력해주세요."
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                />
                            </UserInfoField>
                            <UserInfoField>
                                <UserInfoIcon src={resumeData.experienceYears ? BworkIcon : workIcon} alt="경력" />
                                <UserInfoInput
                                    type="number"
                                    placeholder="경력을 입력해주세요."
                                    value={resumeData.experienceYears}
                                    onChange={(e) => setResumeData({ ...resumeData, experienceYears: e.target.value })}
                                />
                            </UserInfoField>
                        </UserInfo>
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

                    </UserInfoContainer>

                    



                    <InputContainer>
                        <Label>희망 근무 지역</Label>
                        <InputRow>
                            <Select2
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">지역을 선택해주세요.</option>
                                {[...new Set(locations.map((loc) => loc.name))].map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Select2>

                            <Select2
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                disabled={!regionOptions.length}
                            >
                                <option value="">행정구역을 선택해주세요.</option>
                                {regionOptions.map((region, index) => (
                                    <option key={index} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </Select2>

                            {/* 등록 버튼 */}
                            <AddButton2
                                onClick={() => {
                                    if (selectedLocation && selectedRegion) {
                                        setDesiredLocations([
                                            ...desiredLocations,
                                            { name: selectedLocation, region: selectedRegion },
                                        ]);
                                        setSelectedLocation("");
                                        setSelectedRegion("");
                                    }
                                }}
                            >
                                등록
                            </AddButton2>
                        </InputRow>

                        {/* 선택된 지역 및 행정구역 표시 */}
                        <LocationTags>
                            {desiredLocations.map((loc, index) => (
                                <LocationTag key={index}>
                                    {loc.name} - {loc.region}
                                    <DeleteButton
                                        onClick={() =>
                                            setDesiredLocations(
                                                desiredLocations.filter((item, idx) => idx !== index)
                                            )
                                        }
                                    >
                                        <img src={Delw} alt="삭제 아이콘" />
                                    </DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </InputContainer>`




                    <InputContainer>
                        <Label>간단 소개</Label>
                        <InputContainerInput
                            type="text"
                            placeholder="간략하게 요약해서 3~5줄의 읽기 쉬운 내용으로 작성해주세요."
                            value={resumeData.summary}
                            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>개발 직무</Label>
                        <InputRow>
                            <Select
                                value={selectedJobCategory}
                                onChange={(e) => setSelectedJobCategory(e.target.value)}
                            >
                                <option value="">개발 직무를 선택해주세요.</option>
                                {jobCategories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
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
                        <Label>기술 스택 (업무 툴 / 스킬)</Label>
                        <InputRow>
                            <Select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                            >
                                <option value="">기술 스택을 선택해주세요.</option>
                                {skills.map((skill) => (
                                    <option key={skill.id} value={skill.name}>
                                        {skill.name}
                                    </option>
                                ))}
                            </Select>
                            <AddButton2
                                onClick={() => {
                                    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
                                        setSelectedSkills([...selectedSkills, selectedSkill]);
                                        setSelectedSkill("");
                                    }
                                }}
                            >
                                등록
                            </AddButton2>
                        </InputRow>
                        <LocationTags>
                            {selectedSkills.map((skill, index) => (
                                <LocationTag key={index}>
                                    {skill}
                                    <DeleteButton
                                        onClick={() =>
                                            setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                                        }
                                    >
                                        <img src={Delw} alt="삭제 아이콘" />
                                    </DeleteButton>
                                </LocationTag>
                            ))}
                        </LocationTags>
                    </InputContainer>
                    <InputContainer>
                        <Label>이력서/자기소개서 등록</Label>
                        <FileUploadContainer>
                            <FileUploadInput 
                                type="text"
                                placeholder="이력서 및 자기소개서 파일을 등록해주세요."
                                value={resumeFile ? resumeFile.name : ""}
                                readOnly
                            />
                            <FileInputLabel>
                                <img src={addPhotoIcon} alt="파일 추가 아이콘" />
                                파일 등록
                                <FileInput  id="fileUpload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}/>
                            </FileInputLabel>

                        </FileUploadContainer>
                    </InputContainer>
                    
                </Form>
                <ButtonContainer>
                    <SaveButton onClick={handleSave}>수정하기</SaveButton>
                </ButtonContainer>
            </FormContainer>
        </>
    );
};

export default EditResume;


const PreviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 318px;
    height: 255px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #F6F6F6;
`;

const PreviewImage = styled.img`
    width: 318px;
    height: 255px;
    object-fit: contain;
`;

const PhotoUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 318px;
    height: 255px;
    border: 2px dashed #B5B5B5;
    border-radius: 10px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }

    p {
        font-size: 12px;
        color: #00257A;
        margin: 0;
    }

    &:hover {
        border-color: #00257A;
    }
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
    width: 91%;
    margin-bottom: 30px; 
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

const UserInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;


`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 50px;
    margin-left: -336px;
    margin-bottom: 50px;
`;


const UserInfoField = styled.div`
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

const UserInfoIcon = styled.img`
    width: 28px;
    height: 28px;

`;

const UserInfoInput = styled.input`
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

    &::-webkit-datetime-edit-fields-wrapper {
        color: ${({ isSelected  }) => (isSelected  ? "#000000" : "#BABABA")}; 
    }
    

`;

const Select2 = styled.select`
    width: 300px;
    height: 47px;
    padding: 5px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    background-color: #FFFFFF;
    margin-right: 10px;

    color: ${({ value }) => (value ? "#000000" : "#BABABA")}; 

    &:focus {
        outline: none;
        border-color: #B5B5B5;
    }

    option {
        color: #000000; 
        font-weight: 500; 
    }
`;


const Select = styled.select`
    width: 94%;
    height: 47px;
    padding: 5px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    background-color: #FFFFFF;
    margin-right: 10px;

    color: ${({ value }) => (value ? "#000000" : "#BABABA")}; 

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




const AddButton2 = styled.button`

    background-color: #00257A;
    color: white;
    border: none;
    padding: 5px 17px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 5px;
    font-weight: 600;
    font-size: 14px; 
    font-family: 'Nanum Square Neo', sans-serif;
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

const FileUploadContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
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
    right: 0px;
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





