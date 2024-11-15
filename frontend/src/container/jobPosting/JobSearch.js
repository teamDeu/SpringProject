import React from 'react';
import styled from 'styled-components';
import Barrow2 from './img/barrow2.png';
import Location from './img/location.png';
import Pjob from './img/pjob.png';
import Search from './img/search.png';



const JobSearch = () => {
    return (
        <Container>
            <Title>지역 & 직무 선택</Title>
            <Options>
                <Dropdown>
                    경력 선택
                    <img src={Barrow2} alt="아래 화살표 아이콘" />
                </Dropdown>
                <Dropdown>
                    학력 선택
                    <img src={Barrow2} alt="아래 화살표 아이콘" />
                </Dropdown>
            </Options>
            <SearchBar>
                <SelectBox>
                    <img src={Location} alt="지역 검색 아이콘" />
                    지역 선택
                </SelectBox>
                <SelectBox>
                    <img src={Pjob} alt="직업 검색 아이콘" />
                    직무 & 기술 스택 선택
                </SelectBox>
                <SearchInput placeholder="검색어를 입력해 주세요" />
                <SearchButton>
                    검색
                    <img src={Search} alt="검색 아이콘" />
                </SearchButton>
            </SearchBar>
            <Message>검색 조건을 설정해 주세요.</Message>
        </Container>
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



const SearchBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #f9f9fb;
    border: 1.2px solid #CDD1DD;
    gap: 10px;
    padding: 10px;
`;

const SelectBox = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1.2px solid #CDD1DD;
    border-radius: 4px;
    background-color: #fff;
    font-size: 22px;
    color: #cdd1dd;
    min-width: 200px;
    gap: 5px;
    cursor: pointer;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 22px;
    color: #cdd1dd;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 26px;
    color: #000;
    background-color: #fff;
    border: 1px solid #7a6e6e;
    border-radius: 4px;
    cursor: pointer;
    gap: 5px;
`;

const SearchIcon = styled.div`
    width: 27px;
    height: 26px;
    background-image: url('/jobPosting/img/search.png');
    background-size: cover;
`;

const Message = styled.p`
    width: 476px;
    font-size: 25px;
    color: #746e6e;
    position: absolute;
    left: 786px;
    top: 455px;
    text-align: left;
`;