

import React from 'react';
import styled from 'styled-components';
import InputWithTitle from '../../components/company/InputWithTitle';
import ContentTitle from '../../components/common/ContentTitle';
import InputTitle from '../../components/company/InputTitle';
import FilledButton from '../../components/FilledButton';
import MainContent from '../../components/common/MainContent';
import EditButton from '../mypage/EditButton';

const InputArray = [
    { 
        title : "기업명",
        placeholder : "기업명을 입력해주세요"
    },
    { 
        title : "기업업종",
        placeholder : "기업 업종을 입력해주세요"
    },
    { 
        title : "주소",
        placeholder : "서울시 구로 디지털로 34길 코오롱싸이언스벨리 1차 6층"
    },
    { 
        title : "사업자번호",
        placeholder : "‘-’을 제외하고 10자리로 입력해주세요."
    },
    { 
        title : "설립연도",
        placeholder : "예) 2020"
    },
    { 
        title : "직원수",
        placeholder : "예) 100"
    },
    { 
        title : "담당자 이름",
        placeholder : "예) 홍길동"
    },
    { 
        title : "담당자 연락처",
        placeholder : "예) 01012341234"
    },
    
]


const CompanyDetail = () => {
    return (
        <Container>
                <EditSection>
                    <EditButton>수정</EditButton>
                </EditSection>
                <InputSection>
                    {InputArray.map((input, index) => (
                    <InputWithTitle 
                        key={index} 
                        title={input.title} 
                        placeholder={input.placeholder} 
                    />
                ))}
                </InputSection>
                <FileSection>
                    <InputTitle>기업 로고 등록</InputTitle>
                </FileSection>
        </Container>
    );
};

export default CompanyDetail;

const Container = styled.div`
    margin-top : 40px;
    border : 1px solid #B5B5B5;
    border-radius : 10px;
    padding : 60px;
`
const EditSection = styled.section`
    width : 100%;
    display:flex;
    justify-content : flex-end;
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