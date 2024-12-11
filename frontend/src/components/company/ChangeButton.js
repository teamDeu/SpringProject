import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostCandidate } from '../../api/api';

const triangleBottomIcon = process.env.PUBLIC_URL + '/icons/triangle-bottom.png';

const ChangeButton = ({ fontSize = 17, options, defaultValue, title = "title" , data}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Container>
      <NavButton
        fontSize={fontSize}
        color={value.color}
        onClick={toggleDropdown}
      >
        {value.title}
        <Icon src={triangleBottomIcon} isOpen={isDropdownOpen} />
      </NavButton>
      {isDropdownOpen && (
        <DropdownContent>
          <DropdownTitle fontSize={fontSize}>{title}</DropdownTitle>
          {options.map((option) => (
            <DropdownButton
              key={option.title}
              onClick={() => {
                const check= confirm(`${option.title}으로 변경하시겠습니까?`) // eslint-disable-line no-restricted-globals
                if(check){
                  setValue(option);
                  data.passType = option.title;
                  console.log(data);
                  PostCandidate(data);
                  alert("변경이 완료되었습니다.")
                }
                closeDropdown();
              }}
              fontSize={fontSize}
              color={option.color}
            >
              {option.title}
            </DropdownButton>
          ))}
        </DropdownContent>
      )}
    </Container>
  );
};

export default ChangeButton;

const Container = styled.div`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  position: relative;
  border: none;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize + "px"};
  font-weight: ${(props) => (props.isActive ? "700" : "400")};
  cursor: pointer;
  padding: 0;
  justify-content: center;
  font-family: 'Nanum Square Neo', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    font-weight: 700;
  }
`;

const Icon = styled.img`
  width: 16px;
  transition: transform 0.3s ease;
  position:absolute;
  right : -20px;
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
`;

const DropdownContent = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
  min-width: 160px;
`;

const DropdownTitle = styled.div`
  background: none;
  border: none;
  padding: 8px 12px;
  text-align: center;
  width: 100%;
  box-sizing : border-box;
  font-size: ${(props) => props.fontSize - 3 + "px"};
  font-family: 'Nanum Square Neo', sans-serif;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.color};
  padding: 8px 12px;
  text-align: center;
  width: 100%;
  font-size: ${(props) => props.fontSize - 3 + "px"};
  cursor: pointer;
  font-family: 'Nanum Square Neo', sans-serif;

  &:hover {
    background-color: #f0f4ff;
    font-weight: 700;
  }
`;
