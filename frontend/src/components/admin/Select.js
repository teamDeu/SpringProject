import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    width: ${({ width }) => width || '130px'};
    margin: ${({ margin }) => margin || '0'};
    position: relative;
    font-family: 'Nanum Square Neo';
`;

const SelectBox = styled.div`
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
    cursor: default;
`;

const OptionList = styled.div`
    font-family: 'Nanum Square Neo', sans-serif;
    background: #ffffff;
    border: 1px solid #959595;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    max-height: 300px;
    overflow-y: auto;
`;

const ArrowIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 8px;
    transition: transform 0.3s ease;
    cursor: pointer;
`;

const Option = styled.div`
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

const DeleteButton = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    color: #ff2828;
    font-size: 13px;
    cursor: pointer;
`;

const PlusIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 15px;
    cursor: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px 12px;
    border-top: 1px solid #959595;
    background-color: #f9f9f9;
`;

const Input = styled.input`
    height:25px;
    flex: 1;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #959595;
    border-radius: 4px;
    margin-right: 10px;
`;

const ConfirmButton = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    padding: 5px 10px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #8A8A8A;
    background-color: #E8E8E8;
    border-radius: 4px;
    margin-right: 8px;
`;

const CancelButton = styled.button`
    font-family: 'Nanum Square Neo', sans-serif;
    padding: 5px 10px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #8A8A8A;
    background-color: #ffffff;
    border-radius: 4px;
`;

const DropdownSelect = ({ initialOptions = ["개인회원", "기업회원"], defaultOption, onChange, showPlusButton, showDeleteButton = false, width, margin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newOptionName, setNewOptionName] = useState('');
    const [selectedOption, setSelectedOption] = useState(defaultOption || "이력서 등록 / 관리");
    const [options, setOptions] = useState(initialOptions);

    useEffect(() => {
        setOptions(initialOptions); // initialOptions가 변경될 때 options 상태를 업데이트
    }, [initialOptions]);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setIsAdding(false); // 옵션 선택 시 추가 모드 종료
        if (onChange) onChange(option);
    };

    const handleAddOption = () => {
        if (newOptionName.trim()) {
            setOptions([...options, newOptionName]);
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
    };

    return (
        <DropdownContainer width={width} margin={margin}>
            <SelectBox>
                <span>{selectedOption}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowIcon src="/icons/sbtn.png" alt="Arrow Icon" onClick={(e) => {
                        e.stopPropagation(); // 부모의 클릭 이벤트 방지
                        toggleOpen(); // ArrowIcon 클릭 시 드롭다운 창 열림
                    }} />
                    {showPlusButton && (
                        <PlusIcon src="/icons/plusbtn.png" alt="Plus Icon" onClick={(e) => {
                            e.stopPropagation();
                            setIsAdding(true); // PlusIcon 클릭 시 추가 모드 활성화
                            setIsOpen(true); // 드롭다운 열림
                        }} />
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
                        <CancelButton onClick={handleCancel}>취소</CancelButton>
                    </InputContainer>
                )}
            </OptionList>
        </DropdownContainer>
    );
};

export default DropdownSelect;
