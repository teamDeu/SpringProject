import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputWithTitle from '../../components/company/InputWithTitle';
import ContentTitle from '../../components/common/ContentTitle';
import InputTitle from '../../components/company/InputTitle';
import FilledButton from '../../components/FilledButton';
import MainContent from '../../components/common/MainContent';
import { useLocation, useNavigate } from 'react-router';
import PhotoInput from './PhotoInput';
import { GetCompanyInfo, PostCompany } from '../../api/api';

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

const CompanyDetail = ({id}) => {
    const navigate = useNavigate();
    
    const [companyInfo, setCompanyInfo] = useState({ 
        id: id || undefined,
        pwd: "",
        companyName: "Test",
        industry: "",
        location: "",
        businessNumber: "",
        since: 0,
        employees: 0,
        managerName: "",
        managerPhone: "",
        logoUrl: "",
    });

    // 로고 이미지 업데이트
    const updateImage = (value) => {
        setCompanyInfo((prev) => ({ ...prev, logoUrl: value }));
    }

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await GetCompanyInfo(id);  // GetCompanyInfo 호출하여 companyInfo 가져오기
                    setCompanyInfo(data);
                } catch (error) {
                    console.error("Error fetching company info:", error);
                }
            }
        };
        fetchData();
    }, [id]);  // id 값이 변경될 때마다 실행

    // 기업 정보 제출 버튼
    function regCompanyInfoButton() {
        const keys = Object.keys(companyInfo);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "id" || keys[i] === "pwd") {
                continue;
            }
            if (companyInfo[keys[i]] === "" || companyInfo[keys[i]] === 0) {
                const type = InputArray.find((item) => item.type === keys[i]);
                console.log(type.title);
                alert(`${type.title}을(를) 입력해주세요.`);
                return;
            }
        }

        // PostCompany로 데이터 전송
        PostCompany(companyInfo).then(() => {
            console.log("입력 성공");
            alert("기업정보가 입력되었습니다.");
            navigate("/CompanyManagePost");
        });
    }

    // 입력 값 변경 처리
    const handleInputChange = (type, value) => {
        setCompanyInfo((prevState) => ({
            ...prevState,
            [type]: value
        }));
    };

    return (
        <Container>
            <EditSection>
                <EditButton onClick={regCompanyInfoButton}>수정</EditButton>
            </EditSection>
            <InputSection>
                {InputArray.map((input, index) => (
                    <InputWithTitle 
                        key={index} 
                        title={input.title} 
                        placeholder={input.placeholder}
                        type={typeof companyInfo[input.type]}
                        value={companyInfo[input.type]}
                        onChange={(e) => handleInputChange(input.type, e.target.value)}
                    />
                ))}
            </InputSection>
            <FileSection>
                <InputTitle>기업 로고 등록</InputTitle>
                <PhotoInputSection>
                    <PhotoInput 
                        imageLength={1} 
                        updateImage={updateImage} 
                        justifyContent={"center"}
                    />
                </PhotoInputSection>
            </FileSection>
        </Container>
    );
};

export default CompanyDetail;

const Container = styled.div`
    margin-top: 40px;
    border: 1px solid #B5B5B5;
    border-radius: 10px;
    padding: 60px;
`;

const EditSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const InputSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
`;

const FileSection = styled.section`
    width: 100%;
`;

const ButtonSection = styled.section`
    display: flex;
    justify-content: center;
`;

const PhotoInputSection = styled.section`
    width: 100%;
    border: 1px solid #B5B5B5;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 20px;
`;

const EditButton = styled.button`
    padding: 5px 10px;
    background-color: white;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
        background-color: #BCBABA;
    }
`;
