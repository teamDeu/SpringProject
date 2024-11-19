import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 240px;
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
    position: absolute;
    left: 50px;
    top: 20px;
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
    position: absolute;
    left: 250px;
    top: 48px;
`;

const HiringInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #000000;
    position: absolute;
    left: 250px;
    top: 78px;
`;

const RightContainer = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const DateText = styled.div`
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    position: absolute;
    left: 1050px;
    top: 78px;
`;

const RegistrationStatus = styled.div`
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: ${({ status }) =>
        status === '등록대기중'
            ? '#1a28f4'
            : status === '등록완료'
            ? '#28a745'
            : '#dc3545'}; /* 파랑, 초록, 빨강 */
    position: absolute;
    left: 1050px;
    top: 50px;
`;

const StatusImage = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 1180px;
    top: 58px;
    cursor: pointer;
`;
const LargeBox = styled.div`
    width: 1170px;
    height: 90px;
    position: absolute;
    left: 50px;
    top: 128px;
    background: #F5F7FA;
`;

const LargeText = styled.div`
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    top: 20px;
    left: 50px;
    color: ${({ textType }) =>
        textType === '현직원'
            ? '#92D2D4'
            : textType === '전직원'
            ? '#788AEC'
            : '#333'}; /* 텍스트 색상 */
`;

const SmallText = styled.div`
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 50px;
    left: 50px;
    color: #666;
`;

const BoxImage = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 29px;
    left: 120px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
`;

const CeoBox = ({ companyImage, companyName, hiringCount, date, onDelete, registrationStatus,textType ,textType1}) => {
    const boxImageSrc = textType === '현직원' ? '/img/realceo.png' : '/img/beforeceo.png';
    return (
        <Container>
            <Image src={companyImage} alt="No Image" />
            <InfoContainer>
                <CompanyName>{companyName}</CompanyName>
                <HiringInfo>현재 채용중 {hiringCount}건</HiringInfo>
            </InfoContainer>
            <RightContainer></RightContainer>
            <DateText>{date}</DateText>
            <StatusImage
                src="/img/trashcan.png"
                alt="Delete Icon"
                onClick={onDelete}
            />
            <RegistrationStatus status={registrationStatus}>
                {registrationStatus}
            </RegistrationStatus>
            <LargeBox>
                <LargeText textType={textType}>{textType}</LargeText>
                <BoxImage src={boxImageSrc} alt="Box Image" />
                <SmallText textType1={textType1}>{textType1}</SmallText>
            </LargeBox>
        </Container>
    );
};

export default CeoBox;
