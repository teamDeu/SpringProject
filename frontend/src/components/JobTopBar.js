import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/Img/searchIcon.png'; 
import { waitForSessionId } from '../context/SessionProvider';
import { GetInfoBySession, LogoutSession } from '../api/api';
import { FaUserCircle } from 'react-icons/fa';
const JobTopBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState(null);
    const [object,setObject] = useState();
    const [objectType,setObjectType] = useState();
    const [objectData,setObjectData] = useState();
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 상태

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleDropdownClose = () => {
        setShowDropdown(false);
    };
    const handleLogout =() => {
        LogoutSession();
        alert("로그아웃 되었습니다.")
        navigate("/login");
    }
    const TopNavLinks = () => {
        

        if(objectType =="user") 
            return (
                <NavLinks>
                            <NavItem>
                                <NavButton>채용 정보</NavButton>
                                <DropdownContent>
                                    <Link to="/jobsearch">
                                        <DropdownButton>지역/산업별 채용 정보</DropdownButton>
                                    </Link>
                                </DropdownContent>
                            </NavItem>
                            <NavItem>
                                <NavButton $isActive={location.pathname === '/resume'}>이력서</NavButton>
                                <DropdownContent>
                                    <Link to="/resumeform">
                                        <DropdownButton>이력서 작성</DropdownButton>
                                    </Link>
                                    <Link to="/myresume">
                                        <DropdownButton>My 이력서</DropdownButton>
                                    </Link>
                                </DropdownContent>
                            </NavItem>
                            <NavItem>
                                <NavButton>합격 후기</NavButton>
                                <DropdownContent>
                                    <Link to="/test_review_home1">
                                    <DropdownButton>면접 후기</DropdownButton>
                                    </Link>
                                    <Link to="/test_review_home2">
                                    <DropdownButton>기업 리뷰</DropdownButton>
                                    </Link>
                                    <Link to="/myreview">
                                        <DropdownButton>My 리뷰</DropdownButton>
                                    </Link>
                                </DropdownContent>
                            </NavItem>
                            <NavItem>
                                <NavButton>고객센터</NavButton>
                                <DropdownContent>
                                    <Link to="/sannouncements">
                                        <DropdownButton>공지사항</DropdownButton>
                                    </Link>
                                    <Link to="/sfaq">
                                        <DropdownButton>FAQ</DropdownButton>
                                    </Link>
                                </DropdownContent>
                            </NavItem>
                            <NavItem>
                                <NavButton>마이페이지</NavButton>
                                <DropdownContent>
                                    <Link to="/mp5">
                                    <DropdownButton>스크랩/관심기업</DropdownButton>
                                    </Link>
                                    <Link to="/mp6">
                                    <DropdownButton>지원내역</DropdownButton>
                                    </Link>
                                </DropdownContent>
                            </NavItem>
                        </NavLinks>
        );
        else if(objectType === "company")
            return (
                <NavLinks>
                                <NavItem>
                                    <NavButton>채용 공고 작성</NavButton>
                                    <DropdownContent>
                                        <Link to="/companyregpost">
                                            <DropdownButton>채용 공고 작성</DropdownButton>
                                        </Link>
                                    </DropdownContent>
                                </NavItem>
                                <NavItem>
                                    <NavButton>공고 ·지원자 관리</NavButton>
                                    <DropdownContent>
                                        <Link to="/companymanagepost">
                                            <DropdownButton>공고 관리</DropdownButton>
                                        </Link>
                                        <Link to="/usersearch">
                                            <DropdownButton>지원자 관리</DropdownButton>
                                        </Link>
                                    </DropdownContent>
                                </NavItem>
                                <NavItem>
                                    <NavButton>합격 후기</NavButton>
                                    <DropdownContent>
                                        <Link to="/test_review_home1">
                                        <DropdownButton>면접 후기</DropdownButton>
                                        </Link>
                                        <Link to="/test_review_home2">
                                        <DropdownButton>기업 리뷰</DropdownButton>
                                        </Link>
                                        <Link to="/myreview">
                                            <DropdownButton>My 리뷰</DropdownButton>
                                        </Link>
                                    </DropdownContent>
                                </NavItem>
                                <NavItem>
                                    <NavButton>고객센터</NavButton>
                                    <DropdownContent>
                                        <Link to="/sannouncements">
                                            <DropdownButton>공지사항</DropdownButton>
                                        </Link>
                                        <Link to="/sfaq">
                                            <DropdownButton>FAQ</DropdownButton>
                                        </Link>
                                    </DropdownContent>
                                </NavItem>
                            </NavLinks>
            );
        else return (<></>)
    }
    const NavRight = () => {
        if( objectType === "user")
            return (
                <NavbarRight>
                    <UserMenu>
                        <UserIcon onClick={handleDropdownToggle}>
                            <FaUserCircle />
                            <UserName>{objectData.name}</UserName>
                        </UserIcon>
                        {showDropdown && (
                            <DropdownMenu>
                                <DropdownLink to="/mp1" onClick={handleDropdownClose}>개인정보 관리</DropdownLink>
                                <DropdownOption onClick={handleLogout}>로그아웃</DropdownOption>
                            </DropdownMenu>
                        )}
                    </UserMenu>
                </NavbarRight>
                )
        else if(objectType === "company")
            return (
                <NavbarRight>
                    <UserMenu>
                        <UserIcon onClick={handleDropdownToggle}>
                            <FaUserCircle />
                            <UserName>{objectData.companyName}</UserName>
                        </UserIcon>
                        {showDropdown && (
                            <DropdownMenu>
                                <DropdownLink to="/ManageCompanyInfo" onClick={handleDropdownClose}>회사정보 관리</DropdownLink>
                                <DropdownOption onClick={handleLogout}>로그아웃</DropdownOption>
                            </DropdownMenu>
                        )}
                    </UserMenu>
                </NavbarRight>
            )
        else 
            return (
            <NavbarRight>
                <CustomLink href ="/member">
                    <AuthLink>회원가입</AuthLink>
                </CustomLink>
                <CustomLink href ="/login">
                    <AuthLink>로그인</AuthLink>
                </CustomLink>
            </NavbarRight>
        )
    }
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await waitForSessionId();
                setSessionId(sessionId);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        const fetchObject = async () => {
            try {
                if(sessionId){
                    const getObject = await GetInfoBySession(sessionId);
                    setObject(getObject);
                }
            } catch (error) {
                console.error("Failed to fecth object: " , error)
            }
        }
        fetchObject();
        
    },[sessionId])

    useEffect(() => {
        if(object){
            setObjectData(object.data);
            setObjectType(object.type);
        }
    },[object])
    return (
        <Container>
            <Navbar>
                <NavbarLeft>
                    <LogoSearch>
                        <StyledLink to="/main">
                            <Logo>구인구직</Logo>
                        </StyledLink>
                        <SearchContainer>
                            <SearchInput type="text" placeholder="검색어를 입력하세요." />
                            <SearchIcon src={searchIcon} alt="검색 아이콘" />
                        </SearchContainer>
                    </LogoSearch>
                    <TopNavLinks/>
                </NavbarLeft>
                <NavRight/>
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
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none; 
    &:hover {
        text-decoration: none; 
    }
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
    color: ${(props) => (props.$isActive ? '#00257A' : '#000000')};
    font-weight: ${(props) => (props.$isActive ? '700' : '400')};
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
    padding : 8px 12px;
    margin-bottom: 40px;
    text-decoration : none;
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

const CustomLink = styled.a`
    text-decoration:none;
    &:hover > button{
        font-weight:bold;
    }
`
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