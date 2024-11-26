import React from 'react';
import styled from 'styled-components';

const EducationSelect = ({ label, value = {}, onChange }) => {
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (onChange) {
            onChange(name, value); // 이름과 값을 상위 컴포넌트로 전달
        }
    };

    return (
        <Container>
            <LabelWrapper>
                <Label htmlFor="educationLevel">{label}</Label>
                <Divider>|</Divider>
            </LabelWrapper>
            <SelectWrapper>
                {/* 학력 선택 */}
                <Select
                    id="educationLevel"
                    name="educationLevel"
                    value={value.educationLevel || ''}
                    onChange={handleSelectChange}
                >
                    <option value="">학력</option>
                    <option value="고등학교">고등학교</option>
                    <option value="대학교">대학교</option>
                    <option value="대학원">대학원</option>
                </Select>

                {/* 학력 상태 선택 */}
                <Select
                    id="educationStatus"
                    name="educationStatus"
                    value={value.educationStatus || ''}
                    onChange={handleSelectChange}
                >
                    <option value="">상태</option>
                    <option value="졸업">졸업</option>
                    <option value="중퇴">중퇴</option>
                    <option value="재학">재학</option>
                </Select>
            </SelectWrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 1060px;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #B5B5B5;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 15px;
`;

const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    width: 80px;
    font-size: 16px;
    color: #333;
`;

const Divider = styled.span`
    margin: 0 10px;
    color: #ddd;
`;

const SelectWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const Select = styled.select`
    width: 100px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    appearance: none;
`;

export default EducationSelect;
