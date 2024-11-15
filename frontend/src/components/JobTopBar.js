import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import searchIcon from '../assets/Img/searchIcon.png'; 

const JobTopBar = ({ onResumeClick, onMyResumeClick, onJobSearchClick }) => {
    const location = useLocation();

    return (
        <Container>
            <Navbar>
                <NavbarLeft>
                    <LogoSearch>
                        <Logo>구인구직</Logo>
                        <SearchContainer>
                            <SearchInput type="text" placeholder="검색어를 입력하세요." />
                            <SearchIcon src={searchIcon} alt="검색 아이콘" />
                        </SearchContainer>
                    </LogoSearch>
                    <NavLinks>
                        <NavItem>
                            <NavButton>채용 정보</NavButton>
                            <DropdownContent>
                                <DropdownButton onClick={onJobSearchClick}>지역/산업별 채용 정보</DropdownButton>
                                <DropdownButton>관심 채용 정보 보기</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                        <NavItem>
                            <NavButton isActive={location.pathname === '/resume'}>이력서</NavButton>
                            <DropdownContent>
                                <DropdownButton onClick={onResumeClick}>이력서 작성</DropdownButton>
                                <DropdownButton onClick={onMyResumeClick}>My 이력서</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                        <NavItem>
                            <NavButton>합격 후기</NavButton>
                            <DropdownContent>
                                <DropdownButton>면접 후기</DropdownButton>
                                <DropdownButton>기업 리뷰</DropdownButton>
                                <DropdownButton>My 리뷰</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                        <NavItem>
                            <NavButton>고객센터</NavButton>
                            <DropdownContent>
                                <DropdownButton>공지사항</DropdownButton>
                                <DropdownButton>FAQ</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                        <NavItem>
                            <NavButton>마이페이지</NavButton>
                            <DropdownContent>
                                <DropdownButton>스크랩/관심기업</DropdownButton>
                                <DropdownButton>지원내역</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                    </NavLinks>
                </NavbarLeft>
                <NavbarRight>
                    <AuthLink>회원가입</AuthLink>
                    <AuthLink>로그인</AuthLink>
                </NavbarRight>
            </Navbar>
        </Container>
    );
};

export default JobTopBar;

const Container = styled.div`
    width: 100%;
    font-weight: 400;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 300px;
    border-bottom: 1.2px solid #B5B5B5;
    background-color: #FFFFFF;
`;

const NavbarLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LogoSearch = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
`;

const Logo = styled.span`
    font-size: 45px;
    font-weight: 800;
    color: #000000;
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
`;

const SearchInput = styled.input`
    width: 380px;
    height: 25px;
    padding: 6px 15px;
    border: 1.2px solid #7A6E6E;
    border-radius: 50px;
    font-size: 15px;
    color: #4D4D4D;
    outline: none;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const SearchIcon = styled.img`
    position: absolute;
    right: 12px;
    width: 26px;  
    height: 24px; 
    cursor: pointer;
`;

const NavLinks = styled.ul`
    display: flex;
    gap: 25px;
    list-style: none;
    padding: 0;
    margin: 40px 0 0 0;
`;

const NavItem = styled.li`
    position: relative;
`;

const NavButton = styled.button`
    background: none;
    border: none;
    font-size: 17px;
    color: ${(props) => (props.isActive ? '#00257A' : '#000000')};
    font-weight: ${(props) => (props.isActive ? '700' : '400')};
    cursor: pointer;
    padding: 0;
    font-family: 'Nanum Square Neo', sans-serif;

    &:hover {
        color: #00257A;
        font-weight: 700;
    }
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 10px;
    z-index: 1;
    min-width: 160px;
    ${NavItem}:hover & {
        display: block;
    }
`;

const DropdownButton = styled.button`
    background: none;
    border: none;
    color: black;
    padding: 8px 12px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;

    &:hover {
        background-color: #F0F4FF;
        color: #00257A;
        font-weight: 700;
    }
`;

const NavbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
`;

const AuthLink = styled.button`
    font-size: 18px;
    color: #000000;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Nanum Square Neo', sans-serif;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;
