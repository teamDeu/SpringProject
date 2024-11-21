import React, { useState } from "react";
import styled from "styled-components";

// SelectBox 컨테이너 스타일
const SelectContainer = styled.div`
  position: relative;
  width: 150px; /* SelectBox의 너비 */
`;

const SelectedValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  
`;

const Arrow = styled.span`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid black;
  margin: 5px 0 0 0;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #00257A;
    color : white;
  }

`;

const SelectBox = ({ options, onChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selected, setSelected] = useState(defaultValue || options[0]); // 현재 선택된 값

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option); // 선택된 값을 부모 컴포넌트로 전달
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <SelectContainer>
      <SelectedValue onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <Arrow isOpen={isOpen} />
      </SelectedValue>
      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <DropdownItem
              key={option}
              isSelected={option === selected}
              onClick={() => handleSelect(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SelectContainer>
  );
};

export default SelectBox;
