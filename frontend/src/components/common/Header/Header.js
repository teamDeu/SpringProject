import React from 'react';
import styled from 'styled-components';
import SearchIconImg from '../../../assets/Img/searchIcon.png';
import HeaderUserSection from './HeaderUserSection';
const Header = () => {
    return (
        <Container>
            <HeaderMain>
                <Logo>구인구직</Logo>
                <SearchBox>
                <Search placeholder='검색어를 입력하세요'/>
                <SearchIcon src = {SearchIconImg}/>
                </SearchBox>
            </HeaderMain>
            <HeaderUserSection isLogin/>
        </Container>
    );
};

export default Header;


const Container = styled.header`
    padding : 40px 200px;
    display:flex;
    justify-content : space-between;
    align-items : center;
`

const Logo = styled.div`
    font-size : 45px;
    font-weight : bold;
`

const HeaderMain = styled.div`
    display:flex;
    gap : 20px;
    width : 80%;
`

const SearchBox = styled.div`
    position : relative;
    width : 50%;
    display : flex;
    align-items : center;
`
const Search = styled.input`
    border-radius : 50px;
    width : 100%;
    height : 50px;
    padding : 0px 60px 0px 30px;
    box-sizing : border-box;
`

const SearchIcon = styled.img`
    width : 30px;
    position : absolute;
    right : 30px;
    object-fit : contain;
`