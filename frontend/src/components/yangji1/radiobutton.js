import React from "react";
import styled from "styled-components";

const RadioButtonContainer = styled.div`
  display: flex; /* 가로 정렬 */
  gap: 20px; /* 항목 간 간격 */
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Nanum Square Neo', sans-serif;
  font-size: 18px;
  color: ${(props) => (props.selected ? "blue" : "black")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  input {
    margin-right: 10px;
    accent-color: blue; /* 라디오 버튼 색상 */
  }
`;

const RadioButton = ({ options, selectedValue, onChange, groupName }) => {
  return (
    <RadioButtonContainer>
      {options.map((option, index) => (
        <RadioOption key={index} selected={selectedValue === option}>
          <input
            id={`${groupName}-${index}`} // 고유 ID
            type="radio"
            name={groupName} // 그룹 이름
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
          />
          <label htmlFor={`${groupName}-${index}`}>{option}</label>
        </RadioOption>
      ))}
    </RadioButtonContainer>
  );
};

export default RadioButton;
