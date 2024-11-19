import React, { useState } from 'react'
import styled from 'styled-components'
import TextButton from '../common/TextButton'

const triangleRightIcon = process.env.PUBLIC_URL + '/icons/triangle-right.png';

const Table = styled.table`
    border : 1px solid black;
    width : 100%;
`

const HeaderRow = styled.tr`
    border : 1px solid black;
    text-align : center;
    height : 5vh;
`

const ContentRow = styled.tr`
    border-bottom : 1px solid black;
`
const HeaderCell = styled.td`
    height : 5vh;
    background-color : #F9F9F9;
    color : #B5B5B5;
`
const ContentCell = styled.td`
    vertical-align : middle;
    width : 18%;
    height : 25vh;
`

const ButtonArticle = styled.div`
    display : flex;
    flex-direction : column;
    gap : 15px;
    align-items :center;
    justify-content : center;
    width : 100%;
    height : 100%;
`

const ContentBox = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content :center;
    align-items:center;
    font-size : 20px;
`
const CheckboxBox = styled.div`
    border-right : 1px solid black;
    width : 100%;
    height : 100%;
    display : flex;
    justify-content :center;
    align-items:center;
`

const CheckboxCell = styled.td`
    width : 10%;
    vertical-align : middle;
    height : 25vh;
`

const Button = styled.button`
    width : 220px;
    padding : 10px;
    font-size : 20px;
    position : relative;
    display:flex;
    background-color : #FFFEFE;
    align-items :center;
    border : 1px solid #B5B5B5;
    border-radius : 10px;
    justify-content : center;
    cursor : pointer;
    & > img{
        position : absolute;
        right : 10px;
    };
    &:hover{
        background-color : #B5B5B5;
    }
`

const Checkbox = styled.input`
    padding : 10px;
`
const tempData = Array(10).fill({
    지원자명: '김세영',
    경력: '신입',
    최종학력: '대학교(4년제) 졸업',
    지원일: '2024-11-02',
    평가내용 : <ButtonArticle>
        <TextButton>서류 합격</TextButton>
        <Button>이력서 보기 <img src ={triangleRightIcon}/></Button>
        <Button>포트폴리오 보기 <img src ={triangleRightIcon}/></Button>
    </ButtonArticle>
  });

  const DataTable = () => {
    // 체크 상태 관리
    const [isAllChecked, setIsAllChecked] = useState(false); // 상단 체크박스 상태
    const [checkedItems, setCheckedItems] = useState(Array(tempData.length).fill(false)); // 각 행의 체크박스 상태
  
    const keyValues = Object.keys(tempData[0]);
  
    // 상단 체크박스 클릭 이벤트 핸들러
    const handleAllCheck = () => {
      const newState = !isAllChecked;
      setIsAllChecked(newState); // 상단 체크박스 상태 업데이트
      setCheckedItems(Array(tempData.length).fill(newState)); // 모든 하위 체크박스 상태 업데이트
    };
  
    // 개별 체크박스 클릭 이벤트 핸들러
    const handleRowCheck = (index) => {
      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      setCheckedItems(updatedCheckedItems);
  
      // 모든 하위 체크박스가 선택되었는지 확인
      const allChecked = updatedCheckedItems.every((checked) => checked);
      setIsAllChecked(allChecked);
    };
  
    return (
      <Table>
        {/* Header */}
        <HeaderRow>
          <HeaderCell>
            <CheckboxBox>
              <Checkbox
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllCheck}
              />
            </CheckboxBox>
          </HeaderCell>
          {keyValues.map((title, index) => (
            <HeaderCell key={`header-${index}`}>
              <ContentBox>{title}</ContentBox>
            </HeaderCell>
          ))}
        </HeaderRow>
  
        {/* Rows */}
        {tempData.map((item, rowIndex) => (
          <ContentRow key={`row-${rowIndex}`}>
            <CheckboxCell>
              <ContentBox>
                <Checkbox
                  type="checkbox"
                  checked={checkedItems[rowIndex]}
                  onChange={() => handleRowCheck(rowIndex)}
                />
              </ContentBox>
            </CheckboxCell>
            {keyValues.map((key, cellIndex) => (
              <ContentCell key={`cell-${rowIndex}-${cellIndex}`}>
                <ContentBox>{item[key]}</ContentBox>
              </ContentCell>
            ))}
          </ContentRow>
        ))}
      </Table>
    );
  };
  
  export default DataTable;