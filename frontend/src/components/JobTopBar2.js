import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import searchIcon from '../assets/Img/searchIcon.png';
import { FaUserCircle } from 'react-icons/fa'; // 사용자 아이콘 추가
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가

const JobTopBar2 = ({ onResumeClick, onMyResumeClick, onJobSearchClick }) => {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 상태

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleDropdownClose = () => {
        setShowDropdown(false);
    };

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
                                <DropdownButton to="/mp5">스크랩/관심기업</DropdownButton>
                                <DropdownButton>지원내역</DropdownButton>
                            </DropdownContent>
                        </NavItem>
                    </NavLinks>
                </NavbarLeft>
                <NavbarRight>
                    <UserMenu>
                        <UserIcon onClick={handleDropdownToggle}>
                            <FaUserCircle />
                            <UserName>박정현</UserName>
                        </UserIcon>
                        {showDropdown && (
                            <DropdownMenu>
                                <DropdownLink to="/mp1" onClick={handleDropdownClose}>개인정보 관리</DropdownLink>
                                <DropdownOption onClick={handleDropdownClose}>로그아웃</DropdownOption>
                            </DropdownMenu>
                        )}
                    </UserMenu>
                </NavbarRight>
            </Navbar>
        </Container>
    );
};

export default JobTopBar2;

// Styled Components
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
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;
    min-width: 160px;
    ${NavItem}:hover & {
        display: block;
    }
`;

const DropdownButton = styled(Link)`
    background: none;
    border: none;
    color: black;
    padding: 8px 12px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    display: block; /* 열마다 하나씩 배치되도록 수정 */
    text-decoration: none; /* 밑줄 제거 */

    &:hover {
        background-color: #F0F4FF;
        color: #00257A;
        font-weight: 700;
    }
`;

const NavbarRight = styled.div`
    display: flex;
    align-items: center;
`;

const UserMenu = styled.div`
    position: relative;
`;

const UserIcon = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    font-size: 18px;
    color: #000000;

    &:hover {
        color: #00257A;
    }
`;

const UserName = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    z-index: 10;
    width: 150px;
`;

const DropdownLink = styled(Link)`
    padding: 10px 15px;
    font-size: 14px;
    text-decoration: none;
    color: #000;
    display: block;

    &:hover {
        background-color: #f0f4ff;
        color: #00257A;
        font-weight: 700;
    }
`;

const DropdownOption = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;

    &:hover {
        background-color: #f0f4ff;
        color: #00257A;
    }
`;
