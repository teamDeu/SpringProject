import { useLocation } from "react-router-dom";
import styled from "styled-components";
import JobTopBar from "../../components/JobTopBar";


const Container = styled.div`
    position: relative;
    width: 69%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto;
    font-family: "Nanum Square Neo", sans-serif;
`;

const StyledBox = styled.div`
    height: 143px;
    box-sizing: border-box;
    display: flex;
    font-family: "Nanum Square Neo", sans-serif;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    position: relative;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-left: 30px;
`;

const InfoContainer = styled.div`
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

const InterestButtonContainer = styled.div`
    width: 143px;
    height: 89px;
    position: relative;
    cursor: pointer;
`;

const InterestBackground = styled.div`
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 243px;
    height: 49px;
    position: absolute;
    top: 19px;
`;

const CompanyName = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 20px;
    margin-left: 100px;
`;

const HiringInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #000000;
    margin-left: 100px;
    margin-bottom: -10px;
`;

const InterestText = styled.div`
    color: #000000;
    font-size: 20px;
    font-weight: 400;
    position: absolute;
    left: 21px;
    top: 10px;
    width: 101px;
    height: 69px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const InterestIcon = styled.img`
    width: 21px;
    height: 20px;
    position: absolute;
    left: 107px;
    top: 37px;
    object-fit: cover;
`;

const CompanyDetail = () => {
    const location = useLocation();
    const company = location.state?.company; // 전달된 회사 정보
    const BACKEND_URL = "http://localhost:8080/uploads";

    if (!company) {
        return <div>회사 정보를 불러올 수 없습니다.</div>;
    }

    return (
       <>
        <JobTopBar />
        <Container>
        <StyledBox>
            <Image src={`${BACKEND_URL}/${company.logoUrl}`} alt="No Image" />
            <InfoContainer>
                <CompanyName>{company.companyName}</CompanyName>
                <HiringInfo>현재 채용중 {company.jobPostCount || 0}건</HiringInfo>
            </InfoContainer>
            <InterestButtonContainer>
                <InterestBackground />
                <InterestText>관심기업 등록 {company.favoriteCount}+</InterestText>
                <InterestIcon
                    src={"/img/heart-empty.png" }
                    alt="Favorite Icon"
                />
            </InterestButtonContainer>
        </StyledBox>
        </Container>
       </>
    );
};

export default CompanyDetail;
