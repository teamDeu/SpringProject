import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 143px;
    box-sizing: border-box;
    display: flex;
    font-family: 'Nanum Square Neo', sans-serif;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    position: relative;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #AFE7E5;
        border-width: 4px;
    }
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

const RightContainer = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const EyeIconContainer1 = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100px;
`;

const EyeIcon1 = styled.img`
    width: 29px;
    height: 25px;
    object-fit: cover;
    margin-right: 5px;
`;

const ViewCount1 = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
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
    width: 143px;
    height: 49px;
    position: absolute;
    top: 19px;
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

const CeoBox = ({ companyImage, companyName, hiringCount, viewCount, heartCount }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentHeartCount, setCurrentHeartCount] = useState(heartCount);

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
        setCurrentHeartCount((prev) => (isFavorite ? prev - 1 : prev + 1));
    };

    return (
        <Container>
            <Image src={companyImage} alt="No Image" />
            <InfoContainer>
                <CompanyName>{companyName}</CompanyName>
                <HiringInfo>현재 채용중 {hiringCount}건</HiringInfo>
            </InfoContainer>
            <RightContainer>
                <EyeIconContainer1>
                    <EyeIcon1 src="/img/heart-filled.png" alt="heart Icon" />
                    <ViewCount1>{currentHeartCount}</ViewCount1>
                </EyeIconContainer1>
                <InterestButtonContainer onClick={toggleFavorite}>
                    <InterestBackground />
                    <InterestText>관심기업</InterestText>
                    <InterestIcon
                        src={
                            isFavorite
                                ? "/img/heart-filled.png"
                                : "/img/heart-empty.png"
                        }
                        alt="Favorite Icon"
                    />
                </InterestButtonContainer>
            </RightContainer>
        </Container>
    );
};

export default CeoBox;
