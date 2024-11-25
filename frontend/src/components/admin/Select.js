// Select.js

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트들을 export하여 외부에서 참조 가능하게 합니다.
export const DropdownContainer = styled.div`
    width: ${({ width }) => width || '130px'};
    margin: ${({ margin }) => margin || '0'};
    position: relative;
    font-family: 'Nanum Square Neo', sans-serif;
`;

export const SelectBox = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    font-weight: bold;
    background: #ffffff;
    border: 1px solid #959595;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
`;

export const OptionList = styled.div.attrs((props) => ({
    style: {
      display: props.isOpen ? 'block' : 'none',
    },
  }))`
    font-family: 'Nanum Square Neo', sans-serif;
    background: #ffffff;
    border: 1px solid #959595;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;
  `;

export const ArrowIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
`;

export const Option = styled.div`
    padding: 10px 12px;
    font-size: 16px;
    color: #000000;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        background-color: #D1D8E7;
    }
`;

export const DeleteButton = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    color: #ff2828;
    font-size: 13px;
    cursor: pointer;
`;

export const PlusIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 15px;
    cursor: pointer;
`;

export const InputContainer = styled.div`
    display: flex;
    padding: 10px 12px;
    border-top: 1px solid #959595;
    background-color: #f9f9f9;
`;

export const Input = styled.input`
    height:25px;
    flex: 1;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #959595;
    border-radius: 4px;
    margin-right: 10px;
`;

export const ConfirmButton = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    padding: 5px 10px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #8A8A8A;
    background-color: #E8E8E8;
    border-radius: 4px;
    margin-right: 8px;
`;

export const CancelButtonStyled = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    padding: 5px 10px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #8A8A8A;
    background-color: #ffffff;
    border-radius: 4px;
`;

const DropdownSelect = ({
    className, // className prop 추가
    initialOptions = [],
    defaultOption,
    onChange,
    showPlusButton = false, // 기본값 false
    showDeleteButton = false, // 기본값 false
    width,
    margin
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newOptionName, setNewOptionName] = useState('');
    const [selectedOption, setSelectedOption] = useState(defaultOption || (initialOptions.length > 0 ? initialOptions[0] : ""));
    const [options, setOptions] = useState(initialOptions);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setOptions(initialOptions); // initialOptions가 변경될 때 옵션 업데이트
        console.log("DropdownSelect - options updated:", initialOptions); // 디버깅용 로그
    }, [initialOptions]);

    useEffect(() => {
        setSelectedOption(defaultOption || (initialOptions.length > 0 ? initialOptions[0] : ""));
        console.log("DropdownSelect - selectedOption updated:", defaultOption || (initialOptions.length > 0 ? initialOptions[0] : "")); // 디버깅용 로그
    }, [defaultOption, initialOptions]);

    // 클릭 외부 감지하여 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setIsAdding(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setIsAdding(false); // 옵션 선택 시 추가 모드 종료
        console.log("DropdownSelect - option selected:", option); // 디버깅용 로그
        if (onChange) onChange(option);
    };

    const handleAddOption = () => {
        if (newOptionName.trim()) {
            if (!options.includes(newOptionName.trim())) {
                setOptions([...options, newOptionName.trim()]);
                setSelectedOption(newOptionName.trim());
                console.log("DropdownSelect - new option added:", newOptionName.trim()); // 디버깅용 로그
                if (onChange) onChange(newOptionName.trim());
            }
            setNewOptionName('');
            setIsAdding(false);
        }
    };

    const handleCancel = () => {
        setNewOptionName('');
        setIsAdding(false);
    };

    const handleDeleteOption = (option) => {
        setOptions((prevOptions) => prevOptions.filter((opt) => opt !== option));
        console.log("DropdownSelect - option deleted:", option); // 디버깅용 로그
        // 만약 삭제된 옵션이 현재 선택된 옵션이라면 선택 초기화
        if (selectedOption === option) {
            const newSelected = options.length > 1 ? options[0] : "";
            setSelectedOption(newSelected);
            console.log("DropdownSelect - selectedOption reset to:", newSelected); // 디버깅용 로그
            if (onChange) onChange(newSelected);
        }
    };

    return (
        <DropdownContainer
            className={className} // className 전달
            width={width}
            margin={margin}
            ref={dropdownRef}
        >
            <SelectBox onClick={toggleOpen}>
                <span>{selectedOption || "선택해주세요"}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowIcon
                        src="/icons/sbtn.png"
                        alt="Arrow Icon"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                    {showPlusButton && (
                        <PlusIcon
                            src="/icons/plusbtn.png"
                            alt="Plus Icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAdding(true); // PlusIcon 클릭 시 추가 모드 활성화
                                setIsOpen(true); // 드롭다운 열림
                            }}
                        />
                    )}
                </div>
            </SelectBox>
            <OptionList isOpen={isOpen}>
                {options.map((option) => (
                    <Option key={option} onClick={() => selectOption(option)}>
                        {option}
                        {showDeleteButton && option !== "개인회원" && option !== "기업회원" && (
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation(); // 부모의 클릭 이벤트 방지
                                handleDeleteOption(option); // 삭제 버튼 클릭 시 옵션 삭제
                            }}>
                                삭제
                            </DeleteButton>
                        )}
                    </Option>
                ))}
                {showPlusButton && isAdding && (
                    <InputContainer>
                        <Input
                            type="text"
                            value={newOptionName}
                            placeholder="새 항목 이름 입력"
                            onChange={(e) => setNewOptionName(e.target.value)}
                        />
                        <ConfirmButton onClick={handleAddOption}>추가</ConfirmButton>
                        <CancelButtonStyled onClick={handleCancel}>취소</CancelButtonStyled>
                    </InputContainer>
                )}
            </OptionList>
        </DropdownContainer>
    );
};

export default DropdownSelect;
