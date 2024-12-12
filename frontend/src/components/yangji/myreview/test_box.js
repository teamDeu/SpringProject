import React from 'react';
import HiddenBox from '../hiddenbox';
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
    border-bottom: none;
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
    top: 72px;
`;

const RegistrationStatus = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${({ status }) =>
        status === '등록 대기중'
            ? '#1a28f4'
            : status === '등록 완료'
            ? '#28a745'
            : '#dc3545'};
    position: absolute;
    left: 1050px;
    top: 58px;
`;

const StatusImage = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 1180px;
    top: 68px;
    cursor: pointer;
`;

const TestBox = ({ data, onDelete }) => {
    const handleDeleteClick = async (id) => {
        try {
            // 백엔드 삭제 요청
            await axios.delete(`http://localhost:8080/api/interview-reviews/${id}`);
            // 삭제 성공 시 부모 컴포넌트로 알림
            onDelete(id);
            alert('삭제되었습니다.');
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
            alert('삭제하는 데 실패했습니다.');
        }
    };
    

    return (
        <Container>
            {data.map((item) => (
                <div key={item.id}>
                    <OuterBox>
                        <CompanyName>{item.companyName}</CompanyName>
                        <JobDetails>
                            {item.jobCategoryName} | {item.interviewDate} | {item.experience}
                        </JobDetails>
                        <StatusBox>
                            <StatusText status={item.interviewPassed}>{item.interviewPassed}</StatusText>
                        </StatusBox>
                        <DateText>{item.interviewRegister}</DateText>
                    </OuterBox>
                    <StatusImage
                        src="/img/trashcan.png"
                        alt="Delete Icon"
                        onClick={() => handleDeleteClick(item.id)} // 수정된 삭제 핸들러
                    />
                    <RegistrationStatus status={item.status}>{item.status}</RegistrationStatus>
                    <HiddenBox
                        isVisible={true}
                        interviewType={item.interviewType}
                        interviewNumtype={item.interviewNumtype}
                        interviewQuestion={item.interviewQuestion}
                        interviewDetail={item.interviewDetail}
                        interviewEvaluation={item.interviewEvaluation}
                        interviewPassed={item.interviewPassed}
                        interviewDifficulty={item.interviewDifficulty}
                    />
                </div>
            ))}
        </Container>
    );
};



export default TestBox;
