import React, { useEffect, useState } from 'react';
import HiddenBox from './hiddenbox'; // HiddenBox 컴포넌트를 가져옵니다.
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 1px;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const OuterBox = styled.div`
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 153px;
    position: relative;
    border-bottom: ${({ $isHiddenBoxVisible }) => ($isHiddenBoxVisible ? 'none' : '1px solid rgba(0, 0, 0, 0.3)')};
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
`;

const CompanyName = styled.div`
    color: #000000;
    font-size: 24px;
    font-weight: 700;
    margin-right: 30px;
    margin-left: 50px;
    margin-top: -30px;
`;

const JobDetails = styled.div`
    color: #000000;
    font-size: 18px;
    position: absolute;
    left: 70px;
    top: 100px;
`;

const StatusBox = styled.div`
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
`;

const StatusText = styled.div`
    color: ${({ status }) => (status === '합격' ? '#1a28f4' : status === '대기중' ? '#ffaa00' : '#ff0000')};
    font-size: 16px;
    font-weight: 400;
`;

const DateText = styled.div`
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    position: absolute;
    left: 1050px;
    top: 68px;
`;

const ArrowIcon = styled.img`
    width: 40px;
    height: 37px;
    position: absolute;
    left: 1200px;
    top: 62px;
    cursor: pointer;
    transform: ${({ $isRotated }) => ($isRotated ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const TestBox = () => {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터
    const [visibleItems, setVisibleItems] = useState({}); // 각 아이템별로 HiddenBox 상태를 관리

    const toggleHiddenBox = (id) => {
        setVisibleItems((prev) => ({
            ...prev,
            [id]: !prev[id], // 아이템별로 상태를 토글
        }));
    };

    useEffect(() => {
        // 서버에서 데이터를 가져오는 GET 요청
        axios.get('http://localhost:8080/api/interview-reviews')
            .then((response) => setData(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            {data.map((item) => (
                <div key={item.id}>
                    <OuterBox $isHiddenBoxVisible={visibleItems[item.id]}>
                        <CompanyName>{item.companyId}</CompanyName>
                        <JobDetails>
                            {item.jobCategoryId} | {item.interviewDate} | {item.experience}
                        </JobDetails>
                        <StatusBox>
                            <StatusText status={item.interviewPassFail}>{item.interviewPassFail}</StatusText>
                        </StatusBox>
                        <DateText>{item.interviewRegisterDate}</DateText>
                        <ArrowIcon
                            src="/img/arrow_bot.png"
                            alt="Toggle Arrow"
                            onClick={() => toggleHiddenBox(item.id)}
                            $isRotated={visibleItems[item.id]}
                        />
                    </OuterBox>
                    {visibleItems[item.id] && (
                        <HiddenBox
                            isVisible={visibleItems[item.id]}
                            interviewType={item.interviewType}
                            interviewPeople={item.interviewNum}
                            interviewQuestions={item.interviewQuestion}
                            tips={item.interviewDetail}
                        />
                    )}
                </div>
            ))}
        </Container>
    );
};

export default TestBox;
