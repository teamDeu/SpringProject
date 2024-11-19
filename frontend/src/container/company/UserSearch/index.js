import React from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import MainContent from '../../../components/common/MainContent';
import DropdownSelect from '../../../components/yangji/selectbox';
import FilledButton from '../../../components/FilledButton';
import UserComponents from '../../../components/company/UserComponents';
const tempUserImage = process.env.PUBLIC_URL + '/img/tempUserImage.png';
const countryOptions = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "경남", "경북", "전남", "전북", "충남", "충북", "제주", "전국"]
const userDatas = [
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 0,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "김민석",
        userAge : 27,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 0,
        userRegDate : "2024-11-14 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 10,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 5,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 3,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 2,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 0,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 0,
        userRegDate : "2024-11-16 17:00:00"
    },
    {
        userName : "양지혁",
        userAge : 25,
        userGender : "남",
        userLocation : ["고양시 일산동구", "서울 강남구","서울 서초구"],
        userCategory : ["서버/백엔드 개발자","프론트엔드 개발자","웹 풀스택 개발자","안드로이드 개발자"],
        userSkills : ["Java","C++"],
        userExp : 0,
        userRegDate : "2024-11-16 17:00:00"
    },
]

const Index = () => {
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
                            <DropdownSelect options = {countryOptions} defaultOption = {countryOptions[0]} onChange = {()=>{}}/>
                            <DropdownSelect options = {countryOptions} defaultOption = {'서울'} onChange = {()=>{}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                개발직무
                            </DropdonwTitle>
                            <Dropdowns>
                                <DropdownSelect options = {countryOptions} defaultOption = {'서울'} onChange = {()=>{}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                연령
                            </DropdonwTitle>
                            <Dropdowns>
                            <DropdownSelect options = {countryOptions} defaultOption = {'서울'} onChange = {()=>{}}/>
                            <DropdownSelect options = {countryOptions} defaultOption = {'서울'} onChange = {()=>{}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                        <DropdownArticle>
                            <DropdonwTitle>
                                기술스택
                            </DropdonwTitle>
                            <Dropdowns>
                            <DropdownSelect options = {countryOptions} defaultOption = {'서울'} onChange = {()=>{}}/>
                            </Dropdowns>  
                        </DropdownArticle>
                    </DropdownSection>
                        <FilledButton color = "#FF8447" size = "60px">검색 시작</FilledButton>
                    </DropdownDiv>
                </SearchSection>
                <ComponentSection>
                    {userDatas.map((userData) => <UserComponents image ={tempUserImage} data ={userData}/>)}
                    
                </ComponentSection>
            </MainContent>
        </Container>
    );
};

export default Index;

const Container = styled.div`

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