import React, { useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import InputWithTitle from '../../../components/company/InputWithTitle';
import ContentTitle from '../../../components/common/ContentTitle';
import InputTitle from '../../../components/company/InputTitle';
import FilledButton from '../../../components/FilledButton';
import MainContent from '../../../components/common/MainContent';
import { PostComapany } from '../../../api/api';
import { useNavigate } from 'react-router';

const InputArray = [
    { 
        type : "companyName",
        title : "기업명",
        placeholder : "기업명을 입력해주세요"
    },
    { 
        type : "industry",
        title : "기업업종",
        placeholder : "기업 업종을 입력해주세요"
    },
    { 
        type : "location",
        title : "주소",
        placeholder : "서울시 구로 디지털로 34길 코오롱싸이언스벨리 1차 6층"
    },
    { 
        type : "businessNumber",
        title : "사업자번호",
        placeholder : "‘-’을 제외하고 10자리로 입력해주세요."
    },
    { 
        type : "since",
        title : "설립연도",
        placeholder : "예) 2020"
    },
    { 
        type : "employees",
        title : "직원수",
        placeholder : "예) 100"
    },
    { 
        type : "managerName",
        title : "담당자 이름",
        placeholder : "예) 홍길동"
    },
    { 
        type : "managerPhone",
        title : "담당자 연락처",
        placeholder : "예) 01012341234"
    },
    
]


const Index = () => {
    const navigate = useNavigate();
    const [companyInfo,setCompanyInfo] = useState({
        id : "als981209",
        pwd : "",
        companyName: "Test", // String
        industry: "", // String
        location: "", // String
        businessNumber: "", // String
        since: 0, // Long (nullable number)
        employees: 0, // Long (nullable number)
        managerName: "", // String
        managerPhone: "", // String
    })
    function regCompanyInfoButton(){

        const keys = Object.keys(companyInfo)
        for(let i = 0 ; i < keys.length ; i++){
            if(keys[i] === "id" || keys[i] === "pwd"){
                continue;
            }
            if(companyInfo[keys[i]] === "" || companyInfo[keys[i]] === 0 ){
                const type = InputArray.find((item) => item.type === keys[i])
                console.log(type.title);
                alert(`${type.title}을(를) 입력해주세요.`)
                return;
            }
        }

        PostComapany(companyInfo).then( () =>
            {
                console.log("입력성공"); 
                alert("기업정보가 입력되었습니다.")
                navigate("/CompanyManagePost")
            }
        )
    }
    const handleInputChange = (type, value) => {
        setCompanyInfo(prevState => ({
            ...prevState,
            [type]: value
        }));
    };
    return (
        <Container>
            <JobTopBar/>
            <MainContent>
                <TitleSection>
                    <ContentTitle>서비스 이용을 위해 기업정보를 등록해주세요.</ContentTitle>
                </TitleSection>
                <InputSection>
                    {InputArray.map((input, index) => (
                    <InputWithTitle 
                        key={index} 
                        title={input.title} 
                        placeholder={input.placeholder}
                        type = {typeof companyInfo[input.type]}
                        value = {companyInfo[input.type]}
                        onChange={e => handleInputChange(input.type, e.target.value)}
                    />
                ))}
                </InputSection>
                <FileSection>
                    <InputTitle>기업 로고 등록</InputTitle>
                </FileSection>
                <ButtonSection>
                    <FilledButton onClick={regCompanyInfoButton}>기업정보 등록</FilledButton>
                </ButtonSection>
            </MainContent>
        </Container>
    );
};

export default Index;

const Container = styled.div`

`
const TitleSection = styled.section`
    width : 100%;
`
const InputSection = styled.section`
    display:flex;
    flex-wrap : wrap;
    justify-content : space-between;
    width:100%;
    margin-bottom : 50px;
`

const FileSection = styled.section`
    width : 100%;
`
const ButtonSection = styled.section`
    display:flex;
    justify-content : center;
`