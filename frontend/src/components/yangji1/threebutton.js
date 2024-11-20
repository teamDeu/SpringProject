import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Square Neo", sans-serif;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid blue" : "1px solid rgba(0, 0, 0, 0.4)")};
  color: ${(props) => (props.selected ? "blue" : "rgba(0, 0, 0, 0.8)")};
`;

const ThreeButton = ({ options, selectedIndex, setSelectedIndex }) => {
  const handleClick = (index) => {
    setSelectedIndex(index); // 선택된 인덱스를 부모 컴포넌트로 업데이트
  };

  return (
    <ButtonContainer>
      {options.map((option, index) => (
        <Button
          key={index}
          selected={selectedIndex === index}
          onClick={() => handleClick(index)}
        >
          {option}
        </Button>
      ))}
    </ButtonContainer>
  );
};

export default ThreeButton;
