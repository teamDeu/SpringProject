import React from 'react';
import styled from 'styled-components';
import emailIcon from './img/emailIcon.png';
import workIcon from './img/workIcon.png';
import pnumberIcon from './img/pnumberIcon.png';
import birthIcon from './img/birthIcon.png';
import addPhotoIcon from './img/addPhotoIcon.png'; 


const ResumeForm = () => {
    return (
        <FormContainer>
            <Title>이력서 작성</Title>
            <Form>
                <InputGroup>
                    <Input type="text" placeholder="이력서 제목을 입력해주세요." />
                    <Input type="text" placeholder="이력서에 대한 간단한 설명을 입력해주세요." />
                </InputGroup>

                <Divider />

                <ContactRow>
                    <ContactInfo>
                        <UserNameDisplay>김세영</UserNameDisplay>
                        <InfoField>
                            <Icon src={emailIcon} alt="이메일 아이콘" />
                            <InfoFieldInput type="text" placeholder="이메일을 입력해주세요." />
                        </InfoField>
                        <InfoField>
                            <Icon src={birthIcon} alt="생년월일 아이콘" />
                            <InfoFieldInput type="text" placeholder="생년월일을 입력해주세요." />
                        </InfoField>
                        <InfoField>
                            <Icon src={workIcon} alt="경력 아이콘" />
                            <InfoFieldInput type="text" placeholder="총 경력을 입력해주세요." />
                        </InfoField>
                        <InfoField>
                            <Icon src={pnumberIcon} alt="전화번호 아이콘" />
                            <InfoFieldInput type="text" placeholder="전화번호를 입력해주세요." />
                        </InfoField>
                        

                    </ContactInfo>
                    
                    <PhotoUpload>
                        <img src={addPhotoIcon} alt="사진 추가 아이콘" />
                        <p>사진 추가</p>
                    </PhotoUpload>
                </ContactRow>

                <SelectContainer>
                    <Label>희망 근무 지역</Label>
                    <SelectRow>
                        <Select>
                            <option value="">지역</option>
                            <option value="서울">서울</option>
                            <option value="부산">부산</option>
                            <option value="대구">대구</option>
                            <option value="인천">인천</option>
                            
                        </Select>
                        <Select>
                            <option value="">행정구역</option>
                            <option value="강남구">강남구</option>
                            <option value="서초구">서초구</option>
                            <option value="송파구">송파구</option>
                            <option value="용산구">용산구</option>
                            
                        </Select>
                    </SelectRow>
                </SelectContainer>

                <InputContainer>
                    <Label>간단 소개</Label>
                    <InputContainerInput type="text" placeholder="간략하게 요약해서 3~5줄의 읽기 쉬운 내용으로 작성해주세요." />
                </InputContainer>

                <InputContainer>
                    <Label>개발 직무</Label>
                    <InputContainerInput type="text" placeholder="직무를 입력해주세요." />
                </InputContainer>
            </Form>
            <ButtonContainer>
                <SaveButton>저장하기</SaveButton>
            </ButtonContainer>
        </FormContainer>
    );
};

export default ResumeForm;

const FormContainer = styled.div`
    padding: 20px;
    width: 69%;
    margin: 20px auto;
    background-color: none;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
`;

const Title = styled.h2`
    text-align: left;
    font-size: 28px;
    margin-bottom: 30px;
`;

const Form = styled.div`
    border: 1px solid #B5B5B5;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    padding: 30px 0;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px; 
    width: 90%;
    margin-bottom: 30px; 
`;

const Divider = styled.div`
    width: 90%;
    border-bottom: 1.2px solid #B5B5B5;
    margin-bottom: 10px;
`;

const UserNameDisplay = styled.div`
    font-size: 20px;
    color: #000000;
    width: 100%;
    margin-bottom: 5px;
    text-align: left;
    margin-top: 10px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
`;

const Input = styled.input`
    margin-bottom: 5px;
    width: 98.3%;
    height: 30px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    padding: 10px;
    font-size: 15px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;

    &::placeholder {
        color: #BABABA; 
    }
`;

const ContactRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    
`;

const ContactInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 15px;
    
    
`;

const InfoField = styled.div`
    display: flex;
    align-items: left;
    gap: 0px;
    border: none;
    width: 34%;
    margin-top: 10px;


    p {
        color: #000000;
        font-weight: 700; 
    }
`;

const InfoFieldInput = styled.input`
    width: 330px;  
    height: 22px;
    padding: 4px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    &::placeholder {
        color: #BABABA;
    }
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;



const PhotoUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 260px;
    border: none;
    border-radius: 10px;
    background: #F6F6F6;
    text-align: center;
    color: #BABABA;
    font-size: 14px;

    img {
        width: 30px;
        height: 30px;
        margin-bottom: 8px;
    }

    p {
        color: #00257A;
        font-weight: 700; 
    }
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: flex-start;

`;

const SelectRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: flex-start;
`;

const Select = styled.select`
    width: 160px;
    height: 40px;
    padding: 5px;
    border: 1.2px solid #B5B5B5;
    border-radius: 5px;
    font-size: 15px;
    font-family: 'Nanum Square Neo', sans-serif;
    color: #BABABA;
    font-weight: 700;
    background-color: #FFFFFF;

    &:focus {
        outline: none;
        border-color: #B5B5B5;
    }

    option {
        color: #000000; 
        font-weight: 500; 
    }
`;

const InputContainer = styled.div`
    width: 90%;
    margin-top: 30px;
`;

const InputContainerInput = styled.input`
    margin-bottom: 5px;
    width: 98.3%;
    height: 25px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;
    padding: 10px;
    font-size: 14px;
    border: 1.2px solid #B5B5B5;
    border-radius: 10px;
    outline: none;

    &::placeholder {
        color: #BABABA; 
    }
`;

const Label = styled.p`
    font-size: 20px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SaveButton = styled.button`
    background-color: #00257A;
    color: white;
    padding: 17px 70px;
    border: none;
    margin-top: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: 700;

    &:hover {
        background-color: #001A5A;
    }
`;
