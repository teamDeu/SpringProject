import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { waitForSessionId } from "../../context/SessionProvider";
import axios from "axios"; // axios import 추가

const Container = styled.div`
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

const CeoBox = ({ data }) => {
    const [favorites, setFavorites] = useState({}); // 각 회사의 관심 상태를 저장
    const [sessionId, setSessionId] = useState(null); // 세션 ID 상태 추가
    const BACKEND_URL = "http://localhost:8080/uploads";

    // 초기 좋아요 상태 가져오기
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (!sessionId) return;

                const updatedFavorites = {};
                for (const item of data) {
                    const response = await axios.get("http://localhost:8080/api/favorites/is-favorite", {
                        params: { userId: sessionId, companyId: item.id },
                    });
                    updatedFavorites[item.id] = response.data; // true or false 반환
                }
                setFavorites(updatedFavorites);
            } catch (error) {
                console.error("Failed to fetch favorite statuses:", error);
            }
        };

        fetchFavorites();
    }, [data, sessionId]);

    // 좋아요 상태 토글 및 UI 즉시 업데이트
    const toggleFavorite = async (companyId, currentFavoriteCount, index) => {
        if (!sessionId) {
            alert("로그인 상태를 확인하세요.");
            return;
        }

        if (!companyId) {
            alert("회사 정보를 확인하세요.");
            return;
        }

        try {
            const isFavorite = favorites[companyId];

            // 상태 업데이트 (UI에서 임시로 +1/-1 반영)
            setFavorites((prev) => ({
                ...prev,
                [companyId]: !isFavorite,
            }));

            data[index].favoriteCount = isFavorite
                ? currentFavoriteCount - 1 // 좋아요 제거 -> -1
                : currentFavoriteCount + 1; // 좋아요 추가 -> +1

            if (!isFavorite) {
                // 좋아요 추가
                await axios.post("http://localhost:8080/api/favorites", {
                    userId: String(sessionId),
                    companyId: String(companyId),
                });
            } else {
                // 좋아요 제거
                await axios.delete("http://localhost:8080/api/favorites", {
                    params: {
                        userId: String(sessionId),
                        companyId: String(companyId),
                    },
                });
            }
        } catch (error) {
            console.error("관심 상태 업데이트 실패:", error.response || error.message);
            alert("오류가 발생했습니다.");
        }
    };

    // 세션 ID 가져오기
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await waitForSessionId();
                setSessionId(sessionId); // 상태에 저장
                console.log("Fetched sessionId:", sessionId);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };
        fetchSession();
    }, []);

    return (
        <>
            {data.map((item, index) => (
                <Container key={item.id}>
                    <Image src={`${BACKEND_URL}/${item.logoUrl}`} alt="No Image" />
                    <InfoContainer>
                        <CompanyName>{item.companyName}</CompanyName>
                        <HiringInfo>현재 채용중 {item.jobPostCount || 0}건</HiringInfo>
                    </InfoContainer>
                    <RightContainer>
                        <EyeIconContainer1>
                            <EyeIcon1 src="/img/heart-filled.png" alt="heart Icon" />
                            <ViewCount1>{item.favoriteCount || 0}</ViewCount1>
                        </EyeIconContainer1>
                        <InterestButtonContainer
                            onClick={() =>
                                toggleFavorite(item.id, item.favoriteCount || 0, index)
                            }
                        >
                            <InterestBackground />
                            <InterestText>관심기업</InterestText>
                            <InterestIcon
                                src={
                                    favorites[item.id]
                                        ? "/img/heart-filled.png" // 좋아요 상태
                                        : "/img/heart-empty.png" // 좋아요 없음 상태
                                }
                                alt="Favorite Icon"
                            />
                        </InterestButtonContainer>
                    </RightContainer>
                </Container>
            ))}
        </>
    );
};

export default CeoBox;
