import React from 'react';
import HorizontalLine from './Line';
import HiddenIcon from './hiddenicon';
import styled from 'styled-components';

const Container = styled.div`
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 100%;
    padding: 20px;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    box-sizing: border-box;
    position: relative;
    border-top: none;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px; /* 아이콘 간의 간격 */
    margin-left:50px;
    margin-bottom: 20px; /* 아래 콘텐츠와의 간격 */
`;

const LineContainer = styled.div`
    width: 93%; /* 선의 너비 조정 */
    margin-top: 20px; /* 선 아래 간격 */
    margin-left:46px;
`;

const Section = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    position: relative;
`;

const Label = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #000000;
    width: 150px;
    margin-left: 50px;
    margin-top: 24px;
    text-align: left;
`;

const Value = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    line-height: 1.5;
    position: relative;
    text-align: center;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    border-radius: 30px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-left: 30px;
`;

const QMark = styled.div`
    color: #1a28f4;
    font-size: 18px;
    font-weight: 700;
    margin-left: 40px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Paragraph = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin-left: 40px;
    margin-top: 18px;
    color: #000000;
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: left;
`;

const HiddenBox = ({
    isVisible, // 표시 여부
    interviewType, // 면접 유형
    interviewNumtype, // 면접 인원
    interviewQuestion, // 면접 질문 (긴 문장)
    interviewDetail, // TIP 및 특이사항
    interviewEvaluation,
    interviewPassed,
    interviewDifficulty
}) => {
    // 면접 질문을 '.' 기준으로 분리하여 배열 생성
    const splitQuestions = interviewQuestion
        ? interviewQuestion.split('.').filter((sentence) => sentence.trim() !== '') // 빈 문자열 제거
        : [];

    const evaluationIconSrc = () => {
        if (interviewEvaluation === "긍정적") {
            return "/img/positive.png"; // 긍정적 이미지
        } else if (interviewEvaluation === "부정적") {
            return "/img/negative.png"; // 부정적 이미지
        } else if (interviewEvaluation === "보통") {
            return "/img/neutral.png"; // 보통 이미지
        }
        return "/img/default.png"; // 기본 이미지
    };

    return (
        <Container isVisible={isVisible}>
            <IconContainer>
                <HiddenIcon 
                    label="전반적 평가" 
                    value={interviewEvaluation}
                    iconSrc={evaluationIconSrc()}
                />
                <HiddenIcon 
                    label="난이도" 
                    value={interviewDifficulty}
                    iconSrc="/img/hard.png" 
                />
                <HiddenIcon 
                    label="결과" 
                    value={interviewPassed}
                    iconSrc="/img/result.png" 
                />
            </IconContainer>
            <LineContainer>
                <HorizontalLine />
            </LineContainer>
            <Section>
                <Label>면접 유형</Label>
                <Value>{interviewType}</Value>
            </Section>
            <Section>
                <Label>면접 인원</Label>
                <Value>{interviewNumtype}</Value>
            </Section>
            <Section>
                <Label>면접 질문</Label>
                <QMark>
                    {splitQuestions.map((_, idx) => (
                        <div key={idx}>Q{idx + 1}</div> // Q1, Q2, Q3 형태로 출력
                    ))}
                </QMark>
                <Paragraph>
                    {splitQuestions.map((question, idx) => (
                        <div key={idx}>{question.trim()}</div> // 공백 제거 후 출력
                    ))}
                </Paragraph>
            </Section>
            <Section>
                <Label>TIP 및 특이사항</Label>
                <Paragraph>{interviewDetail}</Paragraph>
            </Section>
        </Container>
    );
};

export default HiddenBox;