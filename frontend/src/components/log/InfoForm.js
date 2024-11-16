// InfoForm.js
import React from 'react';
import styled from 'styled-components';
import EmailAndCareerInput from './EmailAndCareerInput';
import GenderSelect from './GenderSelect';
import EducationSelect from './EducationSelect';

const InfoForm = () => {
    return (
        <FormContainer>
            <Title>기본 정보</Title>
            <EmailAndCareerInput label="이메일" placeholder="예) 1234@naver.com" />
            <GenderSelect label="성별" />
            <EmailAndCareerInput label="경력" placeholder="예) 신입" />
            <EducationSelect label="최종 학력" />
            <SubmitButton>등록</SubmitButton>
        </FormContainer>
    );
};

export default InfoForm;

const FormContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #B5B5B5;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SubmitButton = styled.button`
    width: 100px;
    padding: 10px;
    background-color: #003366;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-top: 20px;
`;
