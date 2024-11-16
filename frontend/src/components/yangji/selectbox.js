import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    width: 70%; /* 부모 컨테이너의 너비를 상속 */
    position: relative;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const SelectBox = styled.div`
    background: #ffffff;
    border: 1px solid #000000;
    width: 100%; /* DropdownContainer와 동일한 너비 */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box; /* 패딩과 보더 포함 */
    cursor: pointer;
`;

const OptionList = styled.div`
    background: #ffffff;
    border: 1px solid #000000;
    width: 100%; /* SelectBox와 동일한 너비 */
    position: absolute;
    top: 40px;
    left: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    z-index: 1;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ArrowIcon = styled.img`
    width: 30px;
    height: 18px;
    margin-left: 8px;
    transition: transform 0.3s ease;
`;

const Option = styled.div`
    padding: 10px 12px;
    font-size: 16px;
    color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
    background-color: ${({ selected }) => (selected ? '#1a28f4' : '#ffffff')};
    cursor: pointer;

    &:hover {
        background-color: #1a28f4;
        color: #ffffff;
    }
`;

const DropdownSelect = ({ options, defaultOption, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption || "정렬");

    const toggleOpen = () => setIsOpen((prev) => !prev);
    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option); // 상위 컴포넌트에 선택값 전달
    };

    return (
        <DropdownContainer>
            <SelectBox onClick={toggleOpen}>
                <span>{selectedOption}</span>
                <ArrowIcon
                    src={isOpen ? "/img/arrow2.png" : "/img/arrow1.png"}
                    alt="Arrow Icon"
                />
            </SelectBox>
            <OptionList isOpen={isOpen}>
                {options.map((option) => (
                    <Option
                        key={option}
                        selected={option === selectedOption}
                        onClick={() => selectOption(option)}
                    >
                        {option}
                    </Option>
                ))}
            </OptionList>
        </DropdownContainer>
    );
};

export default DropdownSelect;
