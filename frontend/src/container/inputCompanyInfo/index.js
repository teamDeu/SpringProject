import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header/Header';
import JobTopBar from '../../components/JobTopBar';
import InputWithTitle from '../../components/company/InputWithTitle';
import ContentTitle from '../../components/common/ContentTitle';

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


const Index = () => {
    return (
        <Container>
            <JobTopBar/>
            <MainContent>
                <ContentTitle>서비스 이용을 위해 기업정보를 등록해주세요.</ContentTitle>
                <InputSection>
                    {InputArray.map((input, index) => (
                    <InputWithTitle 
                        key={index} 
                        title={input.title} 
                        placeholder={input.placeholder} 
                    />
                ))}
                </InputSection>
            </MainContent>
        </Container>
    );
};

export default Index;

const Container = styled.div`

`
const MainContent = styled.main`
    padding: 20px 300px;
    
`

const InputSection = styled.section`
    display:flex;
    flex-wrap : wrap;
    gap : 40px;
`