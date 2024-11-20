import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Barrow2 from './img/barrow2.png';
import Garrow from './img/garrow.png';
import Barrow from './img/barrow.png';
import Location from './img/location.png';
import Blocation from './img/blocation.png';
import Glocation from './img/glocation.png';
import Pjob from './img/pjob.png';
import Search2 from './img/search2.png';
import Experience from './img/experience.png';
import Education from './img/education.png';
import Bpjob from './img/bpjob.png';
import Gjob from './img/gjob.png';
import Highlight from './img/highlight.png';
import Nonheart from './img/nonheart.png';
import Heart from './img/heart.png';
import Lo from './img/lo.png';
import Eye from './img/eye.png';
import Gstar from './img/gstar.png';
import Skill from './img/skill.png';
import JobTopBar from '../../components/JobTopBar';
import { jobRoles, skillStacks } from './job';

const regions = [
    {
        
        name: "전국",
        cities: [
            "전체", "서울특별시", "경기도", "부산광역시", "대구광역시", "광주광역시", "대전광역시", "울산광역시", "세종시",
            "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주시"
        ]
    },
    {
        
        name: "서울",
        cities: [
            "서울 전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
            "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
            "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
        ]
    },
    {
        name: "경기",
        cities: [
            "경기 전체", "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시",
            "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시",
            "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시",
            "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"
        ]
    },
    {
        name: "부산",
        cities: [
            "부산 전체", "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구",
            "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
        ]
    },
    {
        name: "대구",
        cities: [
            "대구 전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
        ]
    },
    {
        name: "인천",
        cities: [
            "인천 전체", "강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"
        ]
    },
    {
        name: "광주",
        cities: [
            "광주 전체", "광산구", "남구", "동구", "북구", "서구"
        ]
    },
    {
        name: "대전",
        cities: [
            "대전 전체", "대덕구", "동구", "서구", "유성구", "중구"
        ]
    },
    {
        name: "울산",
        cities: [
            "울산 전체", "남구", "동구", "북구", "울주군", "중구"
        ]
    },
    {
        name: "세종",
        cities: [
            "세종 전체", "세종시"
        ]
    },
    {
        name: "강원",
        cities: [
            "강원 전체", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군",
            "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"
        ]
    },
    {
        name: "충북",
        cities: [
            "충북 전체", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군",
            "진천군", "청주시", "충주시"
        ]
    },
    {
        name: "충남",
        cities: [
            "충남 전체", "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시",
            "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"
        ]
    },
    {
        name: "전북",
        cities: [
            "전북 전체", "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군",
            "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"
        ]
    },
    {
        name: "전남",
        cities: [
            "전남 전체", "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시",
            "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
        ]
    },
    {
        name: "경북",
        cities: [
            "경북 전체", "경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군",
            "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군",
            "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"
        ]
    },
    {
        name: "경남",
        cities: [
            "경남 전체", "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군",
            "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"
        ]
    },
    {
        name: "제주",
        cities: [
            "제주 전체", "서귀포시", "제주시"
        ]
    }
];

const JobSearch = ({ onJobSelect }) => {
    const handleCardClick = (id) => {
        onJobSelect(id); 
    };

    const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
    const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);
    const [isEducationDropdownOpen, setIsEducationDropdownOpen] = useState(false);
    const [selectedExperienceItem, setSelectedExperienceItem] = useState(null);
    const [selectedEducationItem, setSelectedEducationItem] = useState(null);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(regions[0]);
    const [advertisements, setAdvertisements] = useState([]);

    const [selectedExperienceText, setSelectedExperienceText] = useState('');
    const [selectedEducationText, setSelectedEducationText] = useState('');

    const [experienceOptions, setExperienceOptions] = useState([]); 
    const [educationOptions, setEducationOptions] = useState([]);

    const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState({});

    const [selectedCities, setSelectedCities] = useState(["전체"]);

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [bookmarkedAds, setBookmarkedAds] = useState([]);

    useEffect(() => {
        const fetchAdvertisements = async () => {
            const data = [
                {
                    id: 1,
                    title: "전기전자 H/W, F/W 설계",
                    company: "한전 KPS",
                    logo: "https://via.placeholder.com/50", // Placeholder for company logo
                    region: "경기권역",
                    experience: "신입",
                    education: "대졸 이상",
                    deadline: "11.23(목)"
                },
                {
                    id: 2,
                    title: "온라인 AMD 채용",
                    company: "Parity",
                    logo: "https://via.placeholder.com/50",
                    region: "서울권역",
                    experience: "1년",
                    education: "대졸 이상",
                    deadline: "11.29(수)"
                },
                {
                    id: 3,
                    title: "설계/CAD/CAM 전장 설계",
                    company: "씨에이치티",
                    logo: "https://via.placeholder.com/50",
                    region: "강원지역",
                    experience: "2년",
                    education: "고졸 이상",
                    deadline: "11.30(금)"
                },
                {
                    id: 4,
                    title: "해외파견 영업 경력직",
                    company: "에이피솔루션",
                    logo: "https://via.placeholder.com/50",
                    region: "인천권역",
                    experience: "5년",
                    education: "대졸 이상",
                    deadline: "D-6"
                },
                {
                    id: 5,
                    title: "시스템 및 운전 경력",
                    company: "이노비즈테크",
                    logo: "https://via.placeholder.com/50",
                    region: "울산권역",
                    experience: "2년",
                    education: "대졸 이상",
                    deadline: "오늘마감"
                },
                {
                    id: 6,
                    title: "기술평가 및 컨설팅 전문가",
                    company: "NICE 평가정보",
                    logo: "https://via.placeholder.com/50",
                    region: "서울권역",
                    experience: "1년 이상",
                    education: "석사 이상",
                    deadline: "11.17(금)"
                },
            ];
            setAdvertisements(data);
        };
    
        fetchAdvertisements();
    }, []);
    
    const toggleExperienceDropdown = () => {
        setIsExperienceDropdownOpen((prev) => !prev);
    };

    const toggleEducationDropdown = () => {
        setIsEducationDropdownOpen((prev) => !prev);
    };

    const toggleLocationDropdown = () => {
        setIsLocationDropdownOpen((prev) => !prev);
    };

    const toggleJobDropdown = () => {
        setIsJobDropdownOpen((prev) => !prev); 
    };

    const toggleBookmark = (adId) => {
        setBookmarkedAds((prev) =>
            prev.includes(adId) ? prev.filter((id) => id !== adId) : [...prev, adId]
        );
    };

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
        setSelectedLocations((prev) => ({
            ...prev,
            [region.name]: prev[region.name] || [] 
        }));
    };
    
    

    const handleExperienceItemClick = (index) => {
        const options = ['~ 1년', '1년', '2년', '3년', '4년', '5년', '6년', '7년', '8년', '9년', '10년', '10년 ~'];
        setSelectedExperienceItem((prevSelected) => (prevSelected === index ? null : index));
        setSelectedExperienceText((prevSelected) => (prevSelected === index ? '' : options[index]));
    };

    const handleEducationItemClick = (index) => {
        const options = ['고교 졸업 이하', '고등학교 졸업', '대학 졸업 (2,3년제)', '대학교 졸업 (4년제)', '대학원 석사 졸업', '대학원 박사 졸업', '박사 졸업 이상'];
        setSelectedEducationItem((prevSelected) => (prevSelected === index ? null : index));
        setSelectedEducationText((prevSelected) => (prevSelected === index ? '' : options[index]));
    };

    const handleJobClick = (job) => {
        setSelectedJobs((prev) =>
            prev.includes(job) ? prev.filter((item) => item !== job) : [...prev, job]
        );
    };
    
    const handleSkillClick = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
        );
    };
    

    const handleExperienceCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setExperienceOptions((prev) =>
            checked ? [...prev, value] : prev.filter((option) => option !== value)
        );
    };
    
    const handleEducationCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setEducationOptions((prev) =>
            checked ? [...prev, value] : prev.filter((option) => option !== value)
        );
    };

    const handleLocationCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedLocationOptions((prev) =>
            checked ? [...prev, value] : prev.filter((option) => option !== value)
        );
    };

    const handleCityCheckboxChange = (regionName, city) => {
        setSelectedLocations((prev) => {
            const regionCities = prev[regionName] || [];
            const updatedCities = regionCities.includes(city)
                ? regionCities.filter((item) => item !== city) 
                : [...regionCities, city]; 
    
            return {
                ...prev,
                [regionName]: updatedCities
            };
        });
    };

    const handleRemoveCity = (city) => {
        setSelectedCities((prev) => prev.filter((item) => item !== city));
    };

    const handleRemoveItem = (type) => {
        if (type === 'experience') {
            setSelectedExperienceItem(null);
            setSelectedExperienceText('');
        } else if (type === 'education') {
            setSelectedEducationItem(null);
            setSelectedEducationText('');
        }
    };

    const handleRemoveLocation = () => {
        setSelectedLocationOptions([]);
    };


    return (
        <>
            <JobTopBar />
            <Container>
                
                <Title>지역 & 직무 선택</Title>
                <Options>
                <Dropdown onClick={toggleExperienceDropdown}>
                        경력 선택
                        <ArrowIcon src={Barrow2} alt="아래 화살표 아이콘" isOpen={isExperienceDropdownOpen}  />
                    </Dropdown>
                    {isExperienceDropdownOpen  && (
                        <DropdownContent>
                            <CheckboxGroup>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="신입"
                                        onChange={handleExperienceCheckboxChange}
                                    />
                                    신입
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="경력"
                                        onChange={handleExperienceCheckboxChange}
                                    />
                                    경력
                                </label>
                            </CheckboxGroup>
                            <Grid>
                                {['~ 1년', '1년', '2년', '3년', '4년', '5년', '6년', '7년', '8년', '9년', '10년', '10년 ~'].map((year, index) => (
                                    <GridItem
                                    key={index}
                                    isSelected={selectedExperienceItem  === index} 
                                    onClick={() => handleExperienceItemClick(index)} 
                                    >
                                    {year}
                                    </GridItem>
                                ))}
                            </Grid>
                        </DropdownContent>
                    )}
                    <Dropdown onClick={toggleEducationDropdown}>
                        학력 선택
                        <ArrowIcon src={Barrow2} alt="아래 화살표 아이콘" isOpen={isEducationDropdownOpen} />
                    </Dropdown>
                    {isEducationDropdownOpen && (
                        <EducationDropdownContent>
                            <CheckboxGroup>
                                <label>
                                    <input 
                                        type="checkbox"
                                        value="학력무관"
                                        onChange={handleEducationCheckboxChange}
                                    />
                                    학력무관
                                </label>
                            </CheckboxGroup>
                            <Grid>
                                {['고교 졸업 이하', '고등학교 졸업', '대학 졸업 (2,3년제)', '대학교 졸업 (4년제)', '대학원 석사 졸업', '대학원 박사 졸업', '박사 졸업 이상'].map((level, index) => (
                                    <EducationGridItem 
                                    key={index}
                                    isSelected={selectedEducationItem  === index} 
                                    onClick={() => handleEducationItemClick(index)} 
                                    >
                                    {level}
                                    </EducationGridItem>
                                ))}
                            </Grid>
                        </EducationDropdownContent>
                    )}
                </Options>
                <SearchContent>
                    <SelectBox isOpen={isLocationDropdownOpen} onClick={toggleLocationDropdown}>
                        <img src={isLocationDropdownOpen ? Blocation : Location} alt="지역 검색 아이콘" />
                        <span>지역 선택</span>
                        <LocationArrowIcon src={isLocationDropdownOpen ? Barrow : Garrow} alt="화살표 아이콘" />
                    </SelectBox>
                    {isLocationDropdownOpen && (
                        <LocationDropdownContent>
                            {regions.map((region, index) => (
                                <RegionButton
                                    key={index}
                                    isSelected={selectedRegion?.name === region.name}
                                    onClick={() => handleRegionClick(region)}
                                >
                                    {region.name}
                                </RegionButton>
                            ))}
                            {selectedRegion && (
                                <CityCheckboxWrapper>
                                    <CityCheckboxContainer>
                                        {selectedRegion.cities.map((city, index) => (
                                            <label key={index}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLocations[selectedRegion.name]?.includes(city)}
                                                    onChange={() => handleCityCheckboxChange(selectedRegion.name, city)}
                                                />
                                                {city}
                                            </label>
                                        ))}
                                    </CityCheckboxContainer>
                                </CityCheckboxWrapper>
                            )}

                        </LocationDropdownContent>
                    )}   
                            

                    <SelectBox isOpen={isJobDropdownOpen} onClick={toggleJobDropdown}>
                        <img src={isJobDropdownOpen ? Bpjob : Pjob} alt="직업 검색 아이콘" />
                        <span style={{ fontWeight: isJobDropdownOpen ? '700' : '550', color: isJobDropdownOpen ? '#00257A' : '#cdd1dd' }}>
                            직무 & 기술 스택 선택
                        </span>
                        <LocationArrowIcon src={isJobDropdownOpen ? Barrow : Garrow} alt="화살표 아이콘" />
                    </SelectBox>
                    {isJobDropdownOpen && (
                        <JobDropdownContent>
                            <SmallBox>
                                <SectionTitle>직무 & 직업 선택</SectionTitle>
                                <JobGrid>
                                    {jobRoles.map((job, index) => (
                                        <JobGridItem
                                            key={index}
                                            isSelected={selectedJobs.includes(job)}
                                            onClick={() => handleJobClick(job)}
                                        >
                                            {job}
                                        </JobGridItem>
                                    ))}
                                </JobGrid>
                            </SmallBox>
                            <SkillSmallBox>
                                <SectionTitle>스킬 선택</SectionTitle>
                                <SkillGrid>
                                    {skillStacks.map((skill, index) => (
                                        <SkillGridItem
                                            key={index}
                                            isSelected={selectedSkills.includes(skill)}
                                            onClick={() => handleSkillClick(skill)}
                                        >
                                            {skill}
                                        </SkillGridItem>
                                    ))}
                                </SkillGrid>
                            </SkillSmallBox>
                        </JobDropdownContent>
                    
                    )}
                    
                    <SearchButton>
                        검색
                        <img src={Search2} alt="검색 아이콘" />
                    </SearchButton>
                </SearchContent>
                
                <SearchBar isLocationDropdownOpen={isLocationDropdownOpen} isJobDropdownOpen={isJobDropdownOpen}>
                    {(!selectedExperienceText && experienceOptions.length === 0 && 
                    !selectedEducationText && educationOptions.length === 0 && 
                    Object.keys(selectedLocations).length === 0 && 
                    selectedJobs.length === 0 && 
                    selectedSkills.length === 0) && (
                        <Message>검색 조건을 설정해 주세요.</Message>
                    )}

                    {(experienceOptions.length > 0 || selectedExperienceText) && (
                        <SearchItem>
                            <img src={Experience} alt="경력 선택 아이콘" />
                            <span>
                                경력 선택{' > '}
                                {experienceOptions.length > 0 ? experienceOptions.join(', ') : ''}
                                {selectedExperienceText ? ` > ${selectedExperienceText}` : ''}
                            </span>
                            <RemoveButton onClick={() => {
                                setExperienceOptions([]);
                                setSelectedExperienceText('');
                            }}>
                                ✕
                            </RemoveButton>
                        </SearchItem>
                    )}

                    {(educationOptions.length > 0 || selectedEducationText) && (
                        <SearchItem>
                            <img src={Education} alt="학력 선택 아이콘" />
                            <span>
                                학력 선택{' > '}
                                {educationOptions.length > 0 ? educationOptions.join(', ') : ''}
                                {selectedEducationText ? ` > ${selectedEducationText}` : ''}
                            </span>
                            <RemoveButton onClick={() => {
                                setEducationOptions([]);
                                setSelectedEducationText('');
                            }}>
                                ✕
                            </RemoveButton>
                        </SearchItem>
                    )}

                    {Object.entries(selectedLocations).map(([region, cities]) => (
                            <SearchItem key={region}>
                                <img src={Glocation} alt={`${region} 선택 아이콘`} />
                                <span>
                                    지역 선택{' > '}
                                    {region} {'>'} {cities.join(', ')}
                                </span>
                                <RemoveButton
                                    onClick={() => {
                                        setSelectedLocations((prev) => {
                                            const updated = { ...prev };
                                            delete updated[region];
                                            return updated;
                                        });
                                    }}
                                >
                                    ✕
                                </RemoveButton>
                            </SearchItem>
                        ))}

                        {selectedJobs.length > 0 && (
                            <SearchItem>
                                <img src={Gjob} alt="직무 선택 아이콘" />
                                <span>직무 선택 {'>'} {selectedJobs.join(', ')}</span>
                                <RemoveButton onClick={() => setSelectedJobs([])}>✕</RemoveButton>
                            </SearchItem>
                        )}
                        {selectedSkills.length > 0 && (
                            <SearchItem>
                                <img src={Skill} alt="스킬 선택 아이콘" />
                                <span>스킬 선택 {'>'} {selectedSkills.join(', ')}</span>
                                <RemoveButton onClick={() => setSelectedSkills([])}>✕</RemoveButton>
                            </SearchItem>
                        )}

                </SearchBar>

                <SecTitle>이 공고, 놓치지 마세요<img src={Highlight}/> </SecTitle>
                <AdvertisementSection>
                    {advertisements.map((ad) => (
                        <Link 
                        to={`/jobdetail/${ad.id}`} // JobDetail.js로 이동하며 id 전달
                        style={{ textDecoration: 'none', color: 'inherit' }} // Link 스타일 조정
                        key={ad.id}
                        >
                            <AdCard key={ad.id} onClick={() => handleCardClick(ad.id)}>
                                <AdHeader>
                                    <AdLogo src={ad.logo} alt={`${ad.company} 로고`} />
                                    <Bookmark
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(ad.id);
                                    }}
                                    >
                                        <img
                                            src={bookmarkedAds.includes(ad.id) ? Heart : Nonheart}
                                            alt="북마크 아이콘"
                                        />
                                    </Bookmark>
                                </AdHeader>
                                <AdDetails>
                                    <AdTitle>{ad.title}</AdTitle>
                                    <AdCompany>{ad.company}</AdCompany>
                                    <AdInfoLine>
                                        <img src={Lo} alt="지역 아이콘" />
                                        {ad.region} | {ad.experience} | {ad.education}
                                    </AdInfoLine>
                                </AdDetails>
                                <AdDeadline>{ad.deadline}</AdDeadline>
                            </AdCard>
                        </Link>
                    ))}
                </AdvertisementSection>

                <SecTitle>회원님만을 위한 오늘의 공고<img src={Gstar}/> </SecTitle>
                <AdvertisementSection>
                    {advertisements.map((ad) => (
                        <AdCard key={ad.id}>
                            <AdHeader>
                                <AdLogo src={ad.logo} alt={`${ad.company} 로고`} />
                                <Bookmark
                                    onClick={() => toggleBookmark(ad.id)}
                                >
                                    <img
                                        src={bookmarkedAds.includes(ad.id) ? Heart : Nonheart}
                                        alt="북마크 아이콘"
                                    />
                                </Bookmark>
                            </AdHeader>
                            <AdDetails>
                                <AdTitle>{ad.title}</AdTitle>
                                <AdCompany>{ad.company}</AdCompany>
                                <AdInfoLine>
                                    <img src={Lo} alt="지역 아이콘" />
                                    {ad.region} | {ad.experience} | {ad.education}
                                </AdInfoLine>
                            </AdDetails>
                            <AdDeadline>{ad.deadline}</AdDeadline>
                        </AdCard>
                    ))}
                </AdvertisementSection>

                <SecTitle>지금 눈여겨볼 공고<img src={Eye}/> </SecTitle>
                <AdvertisementSection>
                    {advertisements.map((ad) => (
                        <AdCard key={ad.id}>
                            <AdHeader>
                                <AdLogo src={ad.logo} alt={`${ad.company} 로고`} />
                                <Bookmark
                                    onClick={() => toggleBookmark(ad.id)}
                                >
                                    <img
                                        src={bookmarkedAds.includes(ad.id) ? Heart : Nonheart}
                                        alt="북마크 아이콘"
                                    />
                                </Bookmark>
                            </AdHeader>
                            <AdDetails>
                                <AdTitle>{ad.title}</AdTitle>
                                <AdCompany>{ad.company}</AdCompany>
                                <AdInfoLine>
                                    <img src={Lo} alt="지역 아이콘" />
                                    {ad.region}  |  {ad.experience}  |  {ad.education}
                                </AdInfoLine>
                            </AdDetails>
                            <AdDeadline>{ad.deadline}</AdDeadline>
                        </AdCard>
                    ))}
                </AdvertisementSection>
            </Container>
        </>    
    );
};

export default JobSearch;




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

const Options = styled.div`
    display: flex;    
    margin-bottom: 20px;
    gap: 20px;
 
`;

const CityCheckboxWrapper = styled.div`
    border: 1.2px solid #000000;
    padding: 10px; 
    margin-top: -12px;
    width: 1220px;
    height: 140px;
    overflow-y: auto;
    background-color: #FFFFFF; 
    margin-left: 20px;

    &::-webkit-scrollbar {
        display: none; 
    }
`;

const CityCheckboxContainer = styled.div`
    margin-left: 20px;
    margin-top: 2px;
    gap: 40px;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 500;

    label {
        display: flex;
        align-items: center;
        font-size: 13px;
        
    }
`;


const Dropdown = styled.div`
    font-size: 14px;
    color: #000;    
    background: none;
    border:none;
    display: flex;
    align-items: left;
    gap: 5px;
    cursor: pointer;

    img {
        width: 20px;
        height: 13px;
    }
`;

const ArrowIcon = styled.img`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    
`;

const LocationArrowIcon = styled.img`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    
`;

const RegionButton = styled.button`
    position: relative;
    top: 10px;
    margin-bottom: 10px;
    background-color: none;
    background: none;
    color: ${({ isSelected }) => (isSelected ? '#00257A' : '#CDD1DD')};
    border: none;
    font-size: 14px;
    cursor: pointer;
    font-weight: ${({ isSelected }) => (isSelected ? 700 : 550)};
    font-family: 'Nanum Square Neo', sans-serif;
    margin-left: 13px;


`;

const DropdownContent = styled.div`
    position: absolute;
    background: #fff;
    top: 100%;
    border: 1.2px solid #000000;
    width: 250px;
    padding: 10px;
    z-index: 10;
    margin-top: -680px;
`;

const EducationDropdownContent  = styled.div`
    position: absolute;
    background: #fff;
    top: 100%;
    border: 1.2px solid #000000;
    width: 300px;
    padding: 10px;
    z-index: 10;
    margin-top: -680px;
`;

const LocationDropdownContent = styled.div`
    position: absolute;
    background: #fff;
    border: 1.2px solid #000000;
    width: 66.9%;
    height: 210px;
    padding: 10px;
    z-index: 10;
    margin-top: 270px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: flex-start; 
    gap: 20px;
`;

const JobDropdownContent = styled.div`
    position: absolute;
    background: #fff;
    border: 1.2px solid #000000;
    width: 65.9%;
    height: 200px;
    max-height: 200px;
    overflow-y: auto;
    padding: 20px;
    margin-top: 290px;
    display: flex; 
    flex-wrap: wrap;
    flex-direction: row;

    &::-webkit-scrollbar {
        display: none; 
    }
    
`;

const SmallBox = styled.div`
    max-height: 100px; 
    width: 1230px;
    display: flex;
    flex-direction: column;
    border: 1.2px solid #000000; 
    padding: 10px;
    background-color: none; 
    background: none;
    position: relative;
    border-bottom: none;
    overflow-y: auto; 
    scrollbar-width: thin; 
    scrollbar-color: #cdd1dd transparent;

    &::-webkit-scrollbar {
        display: none; 
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cdd1dd;
        border-radius: 4px; 
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 200px; 
        width: 1px; 
        height: 400px;
        background-color: #000;
    }
`;

const SkillSmallBox = styled.div`
    max-height: 140px; 
    width: 1230px;
    display: flex;
    flex-direction: column;
    border: 1.2px solid #000000; 
    padding: 10px;
    background-color: none; 
    background: none;
    position: relative;
    overflow-y: auto; 
    scrollbar-width: thin; 
    scrollbar-color: #cdd1dd transparent;

    &::-webkit-scrollbar {
        display: none; 
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cdd1dd;
        border-radius: 4px; 
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 200px; 
        width: 1px; 
        height: 900px;
        background-color: #000;
    }
`;


const CheckboxGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    font-weight: 590;


    label {
        display: flex;
        align-items: center;
        font-size: 13px;
        gap: 3px;
        
    }

    input {
        cursor: pointer;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
`;

const GridItem = styled.div`
    text-align: center;
    padding: 17px 12px;
    border: 1.2px solid #CDD1DD;
    background-color:  ${({ isSelected }) => (isSelected ? '#F0F4FF' : '#fff')};
    color : ${({ isSelected }) => (isSelected ? '#00257A' : '#000')};
    font-size: 14px;
    cursor: pointer;
    font-weight: ${({ isSelected }) => (isSelected ? '700' : '590')};
    border-bottom: ${({ index }) => (index < 6 ? 'none' : '1.2px solid #CDD1DD')};

    &:hover {
        background-color: #F0F4FF;
    }

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
        border-bottom: none; 
    }

    &:nth-of-type(4),
    &:nth-of-type(5),
    &:nth-of-type(6) {
        border-bottom: none;
    }

    &:nth-of-type(7),
    &:nth-of-type(8),
    &:nth-of-type(9) {
        border-bottom: none; 
    }

    &:nth-of-type(1),
    &:nth-of-type(4),
    &:nth-of-type(7),
    &:nth-of-type(10) {
        border-right: none;
    }

    &:nth-of-type(2),
    &:nth-of-type(5),
    &:nth-of-type(8),
    &:nth-of-type(11) {
        border-right: none;
    }
`;

const SkillGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: 8px; 
    align-items: flex-start;
    margin-top: -35px;
    margin-left: 200px;
    padding: 10px;
`;

const SkillGridItem = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    padding: 10px 15px; 
    border: 1.2px solid #CDD1DD; 
    background-color: ${({ isSelected }) => (isSelected ? '#F0F4FF' : '#fff')};
    color: ${({ isSelected }) => (isSelected ? '#00257A' : '#000')};
    font-size: 14px; 
    font-weight: ${({ isSelected }) => (isSelected ? '700' : '500')};
    cursor: pointer;
    text-align: center;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 

    &:hover {
        background-color: #E8F0FE; 
    }
`;


const JobGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: 8px; 
    align-items: flex-start;
    margin-top: -35px;
    margin-left: 200px;
    padding: 10px;
    
`;

const JobGridItem = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    padding: 10px 15px; 
    border: 1.2px solid #CDD1DD; 
    background-color: ${({ isSelected }) => (isSelected ? '#F0F4FF' : '#fff')};
    color: ${({ isSelected }) => (isSelected ? '#00257A' : '#000')};
    font-size: 14px; 
    font-weight: ${({ isSelected }) => (isSelected ? '700' : '500')};
    cursor: pointer;
    text-align: center;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 

    &:hover {
        background-color: #E8F0FE; 
    }
`;

const EducationGridItem = styled.div`
    text-align: center;
    padding: 18px 14px;
    border: 1.2px solid #CDD1DD;
    background-color:  ${({ isSelected }) => (isSelected ? '#F0F4FF' : '#fff')};
    color : ${({ isSelected }) => (isSelected ? '#00257A' : '#000')};
    font-size: 14px;
    cursor: pointer;
    font-weight: ${({ isSelected }) => (isSelected ? '700' : '590')};
    border-bottom: ${({ index }) => (index < 6 ? 'none' : '1.2px solid #CDD1DD')};

    &:hover {
        background-color: #F0F4FF;
    }

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4) {
        border-bottom: none; 
    }

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(4),
    &:nth-of-type(5) {
        border-right: none;
    }

`;

const SearchBar = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 97%;
    height: 210px;
    background-color: #f9f9fb;
    border: 1.2px solid #CDD1DD;
    padding: 10px;
    margin-top: ${({ isLocationDropdownOpen, isJobDropdownOpen }) => 
        isLocationDropdownOpen 
            ? '220px' 
            : isJobDropdownOpen 
            ? '240px' 
            : '-20px'};
    
`;

const SearchContent = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;


const SelectBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 13px;
    border: 1.2px solid ${({ isOpen }) => (isOpen ? '#000000' : '#CDD1DD')};
    background-color: #fff;
    font-size: 14px;
    color: #cdd1dd;
    min-width: 250px;
    gap: 5px;
    cursor: pointer;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    position: relative;

    img:nth-of-type(1) {
        width: 23px; 
        height: 23px;
    }

    img:nth-of-type(2) {
        width: 20px; 
        height: 13px;
        margin-left: auto;
    }

    span {
        line-height: 1;
        font-weight: ${({ isOpen }) => (isOpen ? 700 : 550)}; 
        color: ${({ isOpen }) => (isOpen ? '#00257A' : '#cdd1dd')}; 
    }

    &:nth-of-type(1) {
        border-right:  ${({ isOpen }) => (isOpen ? '1.2' : 'none')};; 
        border-bottom: none;
    }

    &:nth-of-type(2) {
        border-bottom: none; 
    }

`;


const SearchButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 17px;
    color: #00257A;
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    gap: 5px;
    margin-left: auto;

    img {
        width: 20px;
        height: 20px;
    }
`;


const Message = styled.p`
    width: 476px;
    font-size: 18px;
    color: #746e6e;
    margin-left: 350px;
    margin-top:  ${({ isOpen }) => (isOpen ? '300px' : '100px')};
    text-align: center;
`;

const SearchItem = styled.div`
    display: flex;
    align-items: center;
    background: none;
    padding: 10px;
    border: none;
    gap: 8px;
    margin-right: 10px;

    img {
        width: 23px;
        height: 23px;
    }

    span {
        font-size: 13px;
        color: #746E6E;
    }
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    font-size: 14px;
    color: #999;
    cursor: pointer;

    &:hover {
        color: #333;
    }
`;

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SectionTitle = styled.h2`
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #000000;
    padding-left: 4px;
`;

const SecTitle = styled.h2`
    margin-top: 130px;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #000000;
    padding-left: 4px;

    img {
        margin-left: 5px;
        margin-bottom: -10px;
        width: 35px;
        height: 35px;
    }
`;


const AdvertisementSection = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 20px;
`;

const AdCard = styled.div`
    margin-top: 15px;
    border: 1.3px solid #CDD1DD;
    border-radius: 20px;
    padding: 20px;
    height: 180px;
    width: 370px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const AdHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    margin-bottom: 8px;
`;

const AdLogo = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
`;

const AdTitle = styled.h4`
    font-size: 17px;
    font-weight: 700;
    color: #000000;
    margin: 0;
`;

const Bookmark = styled.span`
    font-size: 20px;
    color: #ccc;
    cursor: pointer;

    img {
        width: 25px;
        height: 25px;
    }
`;

const AdDetails = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const AdCompany = styled.p`
    font-size: 14px;
    color: #939498;
    margin-top: 7px;
    font-weight: 400px;

`;

const AdInfoLine = styled.p`
    margin-top: 5px;
    font-size: 14px;
    color: #939498;
    font-weight: 400px;
    display: flex;
    align-items: center;
    gap: 8px;

    img {
        width: 20px;
        height: 20px;
    }
`;

const AdDeadline = styled.p`
    font-size: 14px;
    color: #000000;
    font-weight: bold;
    text-align: right;
    
`;

