import React, { useState, useEffect } from 'react';
import CeoBox from '../../components/yangji/myreview/ceo_box';
import styled from 'styled-components';
import axios from 'axios';
import { waitForSessionId } from '../../context/SessionProvider';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto; /* 가로 중앙 정렬 */
    font-family: 'Nanum Square Neo', sans-serif;
`;

const TestBoxContainer = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center; /* 가운데 정렬 */
`;

const Review2 = () => {
    const [data, setData] = useState([]);
    const [jobPostCounts, setJobPostCounts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sessionId, setSessionId] = useState(null); // sessionId 상태 추가

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await waitForSessionId();
                setSessionId(sessionId); // sessionId 저장
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companiesResponse, jobPostCountsResponse, reviewsResponse] = await Promise.all([
                    axios.get("http://localhost:8080/api/companies"),
                    axios.get("http://localhost:8080/api/jobpost/count"),
                    axios.get("http://localhost:8080/api/ceo-reviews"),
                ]);
    
                console.log("Companies Response:", companiesResponse.data);
                console.log("Job Post Counts Response:", jobPostCountsResponse.data);
                console.log("Reviews Response:", reviewsResponse.data);
    
                setData(companiesResponse.data);
                setJobPostCounts(jobPostCountsResponse.data);
                setReviews(reviewsResponse.data.map((review) => ({
                    ...review,
                    companyId: review.companyId || review.company_id, // 필드 매칭
                })));
            } catch (error) {
                console.error("데이터 가져오는데 실패:", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Session ID:", sessionId); // sessionId 확인
        console.log("Reviews Data:", reviews); // reviews 확인
        console.log("Merged Data Before Filter:", data); // 병합된 데이터 확인
    }, [sessionId, reviews, data]);
    
    

    const mergedData = data
    .map((company) => {
        const review = reviews.find((r) => r.companyId === company.id) || {};
        const jobPostCount = jobPostCounts.find((count) => count.companyId === company.id)?.count || 0;

        return {
            ...company,
            jobPostCount,
            status: review.status || "N/A",
            ceoMent: review.ceoMent || "코멘트 없음",
            ceoJob: review.ceoJob || "미확인",
            ceoRegister: review.ceoRegister || "등록 정보 없음",
            userId: review.userId || null, // userId 추가
        };
    })
    .filter((item) => String(item.userId) === String(sessionId));

    

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
        }
    };

    return (
        <Container>
            <TestBoxContainer>
                {mergedData.map((item) => (
                    <CeoBox key={item.id} data={[item]} onDelete={handleDelete} />
                ))}
            </TestBoxContainer>
        </Container>
    );
};

export default Review2;
