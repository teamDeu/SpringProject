import React, { useState, useRef } from 'react';
import ReviewButton from '../../components/yangji/review_button';
import JobTopBar from '../../components/JobTopBar';
import styled from 'styled-components';
import ThreeButton from '../../components/yangji1/threebutton';
import RadioButton from '../../components/yangji1/radiobutton';
import HorizontalLine from '../../components/yangji/Line';
import Selectbox from '../../components/yangji/selectbox';
import InputBox from '../../components/yangji1/inputbox';
import FontControlBox from '../../components/yangji1/text';
import FileUploadComponent from '../../components/yangji1/picture';


const Container = styled.div`
    position: relative;
    width: 69%;
    height: 2000px;
    background: #ffffff;
    margin: 0 auto;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const Title = styled.h2`
    position: absolute;
    top: 20px;
    color: #000000;
  text-align: left;
  font-size: 30px;
  font-weight: 400;
  position: relative;
  height: 126px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -webkit-text-stroke: 0.699999988079071px #000000;
`;

const SubtitleContainer = styled.div`
  position: absolute;
  top: -40px;
  left: 0px; /* 제목의 위치 설정 */
  text-align: left;
  font-family: "-", sans-serif;
  font-size: 17px;
  font-weight: 400;
  position: relative;
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SubtitleText = styled.span`
  color: #8a8a8a;
  font-size: 17px;
  font-weight: 400;
`;

const SubtitleHighlight = styled.span`
  color: #060606;
  font-size: 17px;
  font-weight: 700;
`;

const LineContainer = styled.div`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    width: 100%; /* 선의 너비 조정 */
`;

const StyledSection = styled.div`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 1800px; /* 버튼 위치 설정 */
    right: 60%;
`;

const WowTitle = styled.div`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    color: #060606;
    font-size: 18px;
    font-weight: 700;
`;

const Nemo = styled.div`
    background: rgba(0, 0, 0, 0.07);
    width: ${(props) => props.width || '0px'};
    height: ${(props) => props.height || '0px'};
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
`;

const SelectboxContainer = styled.div`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    width: 190px;
`;

const Write1 = () => {
    const fileUploaderRef = useRef(null);
    const dropdownOptions1 = Array.from({ length: 2024 - 2015 + 1 }, (_, i) => (2015 + i).toString());
    const dropdownOptions2 = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const [companyName1, setCompanyName1] = useState('');
    const [companyName2, setCompanyName2] = useState('');
    const [companyName3, setCompanyName3] = useState('');
    const [companyName4, setCompanyName4] = useState('');
    const [companyName5, setCompanyName5] = useState('');
    const [companyName6, setCompanyName6] = useState('');
    const [selectedYear, setSelectedYear] = useState("연도 선택");
    const [selectedMonth, setSelectedMonth] = useState("월 선택");
    const [selectedFeedback, setSelectedFeedback] = useState(null); // 긍정적/보통/부정적
    const [selectedDifficulty, setSelectedDifficulty] = useState(null); // 쉬움/보통/어려움
    const [selectedResult, setSelectedResult] = useState(null); // 합격/대기중/불합격
    const [selectedExperience, setSelectedExperience] = useState(null); // 신입/경력
    const [selectedInterviewType, setSelectedInterviewType] = useState(null); // 직무 유형
    const [selectedInterviewStyle, setSelectedInterviewStyle] = useState(null); // 면접 스타일

    const handleButtonClick = () => {
        if (fileUploaderRef.current) {
            fileUploaderRef.current.upload(); // FileUploadComponent의 handleUpload 실행
        }
        
        if (
            companyName1.trim() === '' ||
            companyName2.trim() === '' ||
            companyName3.trim() === '' ||
            companyName4.trim() === '' ||
            companyName5.trim() === '' ||
            companyName6.trim() === '' ||
            selectedFeedback === null ||
            selectedDifficulty === null ||
            selectedResult === null ||
            selectedExperience === null ||
            selectedInterviewType === null ||
            selectedInterviewStyle === null ||
            selectedYear === "연도 선택" ||
            selectedMonth === "월 선택"
        ) {
            alert('모든 항목을 선택해주세요.');
            return;
        }

        const feedbackOptions = ['긍정적', '보통', '부정적'];
        const difficultyOptions = ['쉬움', '보통', '어려움'];
        const resultOptions = ['합격', '대기중', '불합격'];

        alert(
            `등록 요청됨:\n전반적 평가: ${feedbackOptions[selectedFeedback]}\n난이도: ${difficultyOptions[selectedDifficulty]}\n합격 여부: ${resultOptions[selectedResult]}\n경력 상태: ${selectedExperience}\n면접 유형: ${selectedInterviewType}\n면접 스타일: ${selectedInterviewStyle}\n면접 일자: ${selectedYear}년 ${selectedMonth}월\n기업명: ${companyName1}\n직무직업: ${companyName2}\n면접질문1: ${companyName3}\n면접질문2: ${companyName4}\n면접질문3: ${companyName5}\n면접tip: ${companyName6}`
        );
        // TODO: 데이터베이스 저장 로직 추가
    };

    return (
        <>
            <JobTopBar />
            <Container>
                <Title>면접 후기 작성</Title>
                <SubtitleContainer>
                    <SubtitleText>작성해주신 면접 후기는 </SubtitleText>
                    <SubtitleHighlight>익명</SubtitleHighlight>
                    <SubtitleText>으로 작성됩니다.</SubtitleText>
                </SubtitleContainer>

                {/* 첫번째 */}
                <WowTitle top="170px" left="0px">기본 정보 입력</WowTitle>
                <Nemo top="200px" left="0px" width="300px" height="320px"></Nemo>
                <LineContainer top="200px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="232px" left="90px">기업명</WowTitle>
                <InputBox top="222px"left="320px"width="300px"height="40px"placeholder="기업명 입력"
                    value={companyName1} onChange={(value) => setCompanyName1(value)}
                />
                <LineContainer top="280px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="312px" left="90px">직무·직업</WowTitle>
                <InputBox top="302px"left="320px"width="300px"height="40px"placeholder="직무·직업 선택"
                    value={companyName2} onChange={(value) => setCompanyName2(value)}
                />
                <LineContainer top="360px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="392px" left="90px">면접 당시 경력</WowTitle>
                <StyledSection top="392px" left="320px">
                    <RadioButton
                        groupName="experience"
                        options={['신입', '경력']}
                        selectedValue={selectedExperience}
                        onChange={setSelectedExperience}
                    />
                </StyledSection>
                <LineContainer top="440px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="472px" left="90px">면접 일자</WowTitle>
                <SelectboxContainer top="462px" left="320px">
                    <Selectbox
                        options={dropdownOptions1}
                        defaultOption="연도 선택"
                        onChange={(value) => setSelectedYear(value)}
                    />
                </SelectboxContainer>
                <SelectboxContainer top="462px" left="470px">
                    <Selectbox
                        options={dropdownOptions2}
                        defaultOption="월 선택"
                        onChange={(value) => setSelectedMonth(value)}
                    />
                </SelectboxContainer>
                <LineContainer top="520px" left="0px"><HorizontalLine /></LineContainer>

                {/* 두번째 */}
                <WowTitle top="650px" left="0px">면접 정보 입력</WowTitle>
                <Nemo top="680px" left="0px" width="300px" height="320px"></Nemo>
                <LineContainer top="680px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="712px" left="90px">전반적 평가</WowTitle>
                <StyledSection top="702px" left="320px">
                    <ThreeButton
                        options={['긍정적', '보통', '부정적']}
                        selectedIndex={selectedFeedback}
                        setSelectedIndex={setSelectedFeedback}
                    />
                </StyledSection>
                <LineContainer top="760px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="792px" left="90px">난이도</WowTitle>
                <StyledSection top="782px" left="320px">
                    <ThreeButton
                        options={['쉬움', '보통', '어려움']}
                        selectedIndex={selectedDifficulty}
                        setSelectedIndex={setSelectedDifficulty}
                    />
                </StyledSection>
                <LineContainer top="840px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="872px" left="90px">면접 및 전형 유형</WowTitle>
                <StyledSection top="872px" left="320px">
                    <RadioButton
                        groupName="interviewType"
                        options={['직무·인성 면접', 'PPT 면접', '토론 면접', '실무 과제 및 시험', '인적성 검사', '기타']}
                        selectedValue={selectedInterviewType}
                        onChange={setSelectedInterviewType}
                    />
                </StyledSection>
                <LineContainer top="920px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="952px" left="90px">면접 인원</WowTitle>
                <StyledSection top="952px" left="320px">
                    <RadioButton
                        groupName="interviewStyle"
                        options={['1:1 면접', '지원자 1명, 면접관 다수', '그룹 면접']}
                        selectedValue={selectedInterviewStyle}
                        onChange={setSelectedInterviewStyle}
                    />
                </StyledSection>
                <LineContainer top="1000px" left="0px"><HorizontalLine /></LineContainer>

                {/* 세번째 */}
                <WowTitle top="1130px" left="0px">기본 정보 입력</WowTitle>
                <Nemo top="1160px" left="0px" width="300px" height="500px"></Nemo>
                <LineContainer top="1160px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="1232px" left="90px">면접 질문</WowTitle>
                <InputBox top="1172px"left="320px"width="500px"height="40px"placeholder="Q   ex)경력 사항에 대한 상세한 질문"placeholderColor="#1A28F4"
                    value={companyName3} onChange={(value) => setCompanyName3(value)}
                />
                <InputBox top="1222px"left="320px"width="500px"height="40px"placeholder="Q   ex)우리 회사의 강점은?"placeholderColor="#1A28F4"
                    value={companyName4} onChange={(value) => setCompanyName4(value)}
                />
                <InputBox top="1272px"left="320px"width="500px"height="40px"placeholder="Q   ex)회사를 선택한 이유"placeholderColor="#1A28F4"
                    value={companyName5} onChange={(value) => setCompanyName5(value)}
                />
                <LineContainer top="1320px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="1392px" left="90px">면접 TIP</WowTitle>
                <InputBox top="1332px"left="320px"width="500px"height="140px"placeholder="분위기, 준비 tip을 공유해주세요."placeholderColor="#888"resize="both"
                    value={companyName6} onChange={(value) => setCompanyName6(value)}
                />
                <LineContainer top="1480px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="1512px" left="90px">합격 여부</WowTitle>
                <StyledSection top="1502px" left="320px">
                    <ThreeButton
                        options={['합격', '대기중', '불합격']}
                        selectedIndex={selectedResult}
                        setSelectedIndex={setSelectedResult}
                    />
                </StyledSection>
                <LineContainer top="1560px" left="0px"><HorizontalLine /></LineContainer>
                <WowTitle top="1602px" left="90px">면접 참여 증빙</WowTitle>
                <FontControlBox fontWeight="bold" fontSize="16px" color="#333" top="1567px" left="320px">기업명이 포함된 증빙 사진 또는 캡처를 첨부해주세요.</FontControlBox>
                <FontControlBox fontWeight="regular" fontSize="16px" color="#333" top="1592px" left="320px">면접 안내 문자, 이메일, 명함 등  |  (x)회사 건물, 본인 사진 등</FontControlBox>
                <FileUploadComponent top="1620px" left="320px" ref={fileUploaderRef} />
                <LineContainer top="1660px" left="0px"><HorizontalLine /></LineContainer>
                <ButtonContainer>
                    <ReviewButton text="등록 요청" onClick={handleButtonClick} />
                </ButtonContainer>
            </Container>
        </>
    );
};

export default Write1;
