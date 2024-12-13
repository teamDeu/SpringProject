import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import MainContent from '../../../components/common/MainContent';
import FilledButton from '../../../components/FilledButton';
import UserComponents from '../../../components/company/UserComponents';
import { GetAllUserSearch } from '../../../api/api';
import DropdownSelect from '../../../components/company/SelectBox';
const tempUserImage = process.env.PUBLIC_URL + '/img/tempUserImage.png';
const countryOptions = {
    전체: ["전체"],
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
}

const categoryOptions = [
    "전체",
    "서버/백엔드 개발자",
    "프론트엔드 개발자",
    "안드로이드 개발자",
    "iOS 개발자",
    "데이터 엔지니어",
    "데이터 사이언티스트",
    "데브옵스 엔지니어",
    "QA 엔지니어",
    "AI/머신러닝 엔지니어",
    "게임 개발자",
    "풀스택 개발자",
    "시스템 엔지니어",
    "보안 엔지니어",
    "네트워크 엔지니어",
    "DBA(Database Administrator)",
    "클라우드 엔지니어",
    "DevOps 엔지니어",
    "사이버 보안 분석가",
    "블록체인 개발자",
    "IoT 엔지니어",
    "데이터 시각화 전문가",
    "로봇 프로세스 자동화(RPA) 개발자",
    "증강현실(AR) 개발자",
    "가상현실(VR) 개발자"
]

const ageOptions = [
    "무관",
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "60대",
    "70대",
]
const maxAgeOptions = ["무관"];
const skillOptions = [
    "전체",
    "Python", "Java", "JavaScript", "C", "C++", "C#", "Ruby", "PHP", "Go", "Rust",
    "Kotlin", "Swift", "TypeScript", "R", "Dart", "SQL", "HTML", "CSS", "React.js", "Angular",
    "Vue.js", "Node.js", "Express.js", "Next.js", "Nuxt.js", "Spring Framework", "Spring Boot",
    "Django", "Flask", "Ruby on Rails", "ASP.NET Core", "Laravel", "NestJS", "GraphQL", "Flutter",
    "React Native", "SwiftUI", "Jetpack Compose", "Android SDK", "MySQL", "PostgreSQL", "MongoDB",
    "SQLite", "Redis", "Oracle DB", "Docker", "Kubernetes", "AWS", "Microsoft Azure", "Terraform",
    "Ansible", "TensorFlow", "PyTorch"
];

const tempuserDatas = [];


const Index = () => {
    const [cities , setCities] = useState(["전체"]);
    const [maxAgeOptions,setMaxAgeOptions] = useState(["무관"]);
    
    const [userDatas,setUserDatas] = useState(tempuserDatas);
    const [filteredData,setFilteredData] = useState(tempuserDatas);
    const [coutrySelect , setCountrySelect] = useState("전체");
    const [citySelect , setCitySelect] = useState("전체");
    const [categorySelect , setCateogorySelect] = useState("전체");
    const [minAgeSelect , setMinAgeSelect] = useState("무관");
    const [maxAgeSelect , setMaxAgeSelect] = useState("무관");
    const [skillSelect, setSkillSelect] = useState("전체");

    const onChangeCountry = (value) => {
        setCities(countryOptions[value])
        setCountrySelect(value)
        setCitySelect("전체")
    }
    const onChangeMinAge = (value) => {
        setMinAgeSelect(value)
        setMaxAgeSelect("무관")
        console.log(ageOptions.slice([ageOptions.findIndex((e) => e == value)]))
        setMaxAgeOptions(["무관",...ageOptions.slice([ageOptions.findIndex((e) => e == value)+1])]);
    }
    const onClickSearch = () => {
        let searchData = userDatas;
        searchData = coutrySelect === "전체" ? searchData : searchData.filter((item) => item.userLocation.findIndex((location) => location.name.includes(coutrySelect)) != -1)
        searchData = citySelect === "전체" ? searchData : searchData.filter((item) => item.userLocation.findIndex((location) => location.region.includes(citySelect)) != -1)
        searchData = categorySelect === "전체" ? searchData : searchData.filter((item) => item.userCategory.findIndex((category) => category.name === categorySelect) != -1)
        searchData = skillSelect === "전체" ? searchData : searchData.filter((item) => item.userSkills.findIndex((skill) => skill.name === skillSelect) != -1)
        searchData = minAgeSelect === "무관" ? searchData : searchData.filter((item) => {
            const minNum = +minAgeSelect.replace("대","")
            const maxNum = maxAgeSelect === "무관" ? 100 : +maxAgeSelect.replace("대","")
            return item.userAge >= minNum && item.userAge <= maxNum
        })

        setFilteredData(searchData);
    }

    useEffect(() => {
        const fetchData = async() => {
            const data = await GetAllUserSearch();
            console.log(data);
            setUserDatas(data);
            setFilteredData(data);
        }
        fetchData();
    },[])
    return (
        <Container>
            <JobTopBar/>
            <MainContent>
                <SearchSection>
                    <SearchTitle>
                        <ColorFont>원하는 조건의 인재</ColorFont>를 지금 바로 검색해 보세요!
                    </SearchTitle>
                    <DropdownDiv>
                    <DropdownSection>
                        <DropdownArticle>
                            <DropdonwTitle>
                                지역
                            </DropdonwTitle>
                            <Dropdowns>
                            <DropdownSelect value = {coutrySelect} options = {Object.keys(countryOptions)} defaultOption = {countryOptions["전체"][0]} onChange = {(value)=>{
                                onChangeCountry(value)
                                }}/>
                            <DropdownSelect 
                                value = {citySelect}
                                options = {cities} defaultOption = {cities[0]} onChange = {(value)=>{setCitySelect(value)}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                개발직무
                            </DropdonwTitle>
                            <Dropdowns>
                                <DropdownSelect
                                value ={categorySelect}
                                options = {categoryOptions} defaultOption = {categoryOptions[0]} onChange = {(value)=>{setCateogorySelect(value)}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                연령
                            </DropdonwTitle>
                            <Dropdowns>
                            <DropdownSelect value = {minAgeSelect} options = {ageOptions} defaultOption = {'무관'} onChange = {(value)=>{onChangeMinAge(value)}}/>
                            <DropdownSelect value = {maxAgeSelect} options = {maxAgeOptions} defaultOption = {'무관'} onChange = {(value)=>{setMaxAgeSelect(value)}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                기술스택
                            </DropdonwTitle>
                            <Dropdowns>
                            <DropdownSelect value = {skillSelect} options = {skillOptions} defaultOption = {'전체'} onChange = {(value)=>{setSkillSelect(value)}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                    </DropdownSection>
                        <FilledButton onClick={onClickSearch} color = "#FF8447" size = "60px">검색 시작</FilledButton>
                    </DropdownDiv>
                </SearchSection>
                <ComponentSection>
                    {filteredData.map((userData) => <UserComponents image ={tempUserImage} data ={userData}/>)}
                </ComponentSection>
            </MainContent>
        </Container>
    );
};

export default Index;

const Container = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
`

const SearchSection = styled.section`
    border-radius : 30px;
    border : 1px solid black;
    width : 100%;
    display:flex;
    flex-direction : column;
    align-items:center;
    padding : 50px 0px 30px 0px;
`

const SearchTitle = styled.div`
    font-size : 28px;
    margin-bottom : 30px;
`

const ColorFont = styled.span`
    color : #FF8447;
    font-weight : bold;
`

const DropdownSection = styled.div`
    display:flex;
    justify-content : space-between;
    width : 100%;
    gap :5px;
    align-items: center;
    box-sizing:border-box;

`
const DropdownArticle = styled.article`
    width:23%;
`


const Dropdowns = styled.div`
    display : flex;
    width:100%;
    gap : 5px;
`

const DropdonwTitle = styled.div`
    width : 100%;
    margin-bottom : 10px;
    font-size : 18px;
`

const DropdownDiv = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content : space-between;
    padding : 0px 50px; 
    box-sizing : border-box;
`

const ComponentSection = styled.div`
    width:100%;
    margin-top:50px;
    display:flex;
    flex-wrap : wrap;
    justify-content : space-between;
`