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
    interviewPeople, // 면접 인원
    interviewQuestions, // 면접 질문 배열
    tips, // TIP 및 특이사항
}) => {
    return (
        <Container isVisible={isVisible}>
            <IconContainer>
                <HiddenIcon 
                    label="전반적 평가" 
                    value="긍정적" 
                    iconSrc="/img/smile.png" 
                />
                <HiddenIcon 
                    label="난이도" 
                    value="보통" 
                    iconSrc="/img/hard.png" 
                />
                <HiddenIcon 
                    label="결과" 
                    value="합격" 
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
                <Value>{interviewPeople}</Value>
            </Section>
            <Section>
                <Label>면접 질문</Label>
                <QMark>
                    {interviewQuestions.map((_, idx) => (
                        <div key={idx}>Q</div>
                    ))}
                </QMark>
                <Paragraph>
                    {interviewQuestions.map((question, idx) => (
                        <div key={idx}>{question}</div>
                    ))}
                </Paragraph>
            </Section>
            <Section>
                <Label>TIP 및 특이사항</Label>
                <Paragraph>{tips}</Paragraph>
            </Section>
        </Container>
    );
};

export default HiddenBox;
