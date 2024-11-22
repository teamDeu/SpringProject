import React, { useState, useEffect, useMemo } from 'react';
import Selectbox from '../../components/yangji/selectbox';
import Input from '../../components/yangji/input';
import HorizontalLine from '../../components/yangji/Line';
import TestBox from '../../components/yangji/myreview/test_box';
import styled from 'styled-components';
import axios from 'axios';

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
`;

const SecondSelectboxContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 802px;
    width: 320px;
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
        '서버/백엔드 개발자',
        '프론트엔드 개발자',
        '웹 풀스택 개발자',
        '게임 클라이언트 개발자',
        'DBA',
        '개발 PM',
        '안드로이드 개발자',
        'iOS 개발자',
        '크로스플랫폼 앱개발자',
        '빅데이터 엔지니어',
        '인공지능/머신러닝',
    ];

    const [selectedStatus, setSelectedStatus] = useState('전체');
    const [selectedJob, setSelectedJob] = useState('전체');
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
        }
    };

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
            return statusMatch && jobMatch && searchMatch;
        });
    }, [data, selectedStatus, selectedJob, searchQuery]);

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
                    <TestBox key={item.id} data={[item]} onDelete={handleDelete} />
                ))}
            </TestBoxContainer>
        </Container>
    );
};

export default Review2;
