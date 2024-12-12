import React, { useState, useEffect, useMemo } from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import HorizontalLine from '../../components/yangji/Line';
import TestBox from '../../components/yangji/myreview/test_box';
import styled from 'styled-components';
import axios from 'axios';
import { waitForSessionId } from '../../context/SessionProvider';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    margin: 0 auto;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const InputContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 1042px;
`;

const SelectboxContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 652px;
    width: 190px;
    text-align: left;
`;

const SecondSelectboxContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 802px;
    width: 320px;
    text-align: left;
`;

const LineContainer = styled.div`
    position: absolute;
    top: 80px;
    width: 100%;
`;

const TestBoxContainer = styled.div`
    position: absolute;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Review2 = () => {
    const dropdownOptions1 = ['전체', '합격', '대기중', '불합격'];
    const dropdownOptions2 = [
        "전체",
        '서버/백엔드 개발자',
        '프론트엔드 개발자',
        '데이터 엔지니어',
        '게임 개발자',
        '데이터 사이언티스트',
        '데브옵스 엔지니어',
        '안드로이드 개발자',
        'iOS 개발자',
        'QA 엔지니어',
        'AI/머신러닝 엔지니어',
        '풀스택 개발자',
        '시스템 엔지니어',
        '보안 엔지니어',
        '네트워크 엔지니어',
        'DBA(Database Administrator)',
    ];

    const [selectedStatus, setSelectedStatus] = useState('전체');
    const [selectedJob, setSelectedJob] = useState('전체');
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sessionId, setSessionId] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionId = await waitForSessionId();
                setSessionId(sessionId); // sessionId 설정
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/interview-reviews/with-all-details')
            .then((response) => {
                const transformedData = response.data.map(([interviewReview, company, jobCategory]) => ({
                    ...interviewReview,
                    companyName: company.companyName,
                    jobCategoryName: jobCategory.name,
                }));
                setData(transformedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const statusMatch = selectedStatus === '전체' || item.interviewPassed === selectedStatus;
            const jobMatch = selectedJob === '전체' || item.jobCategoryName === selectedJob;
            const searchMatch =
                searchQuery === '' ||
                item.companyName === searchQuery ||
                item.companyName.includes(searchQuery);
            const sessionMatch = sessionId && String(item.userId) === String(sessionId); // userId와 sessionId 비교
            return statusMatch && jobMatch && searchMatch && sessionMatch; // 모든 조건 만족
        });
    }, [data, selectedStatus, selectedJob, searchQuery, sessionId]);

    return (
        <Container>
            <SelectboxContainer>
                <Selectbox
                    options={dropdownOptions1}
                    defaultOption="합격 유무"
                    onChange={(value) => setSelectedStatus(value)}
                />
            </SelectboxContainer>
            <SecondSelectboxContainer>
                <Selectbox
                    options={dropdownOptions2}
                    defaultOption="직무 · 직업"
                    onChange={(value) => setSelectedJob(value)}
                />
            </SecondSelectboxContainer>
            <InputContainer>
                <Input onSearch={(value) => setSearchQuery(value)} />
            </InputContainer>
            <LineContainer>
                <HorizontalLine />
            </LineContainer>
            <TestBoxContainer>
                {filteredData.map((item) => (
                    <TestBox 
                        key={item.id} 
                        data={[item]} 
                        onDelete={handleDelete} 
                    />
                ))}
            </TestBoxContainer>
        </Container>
    );
};

export default Review2;
