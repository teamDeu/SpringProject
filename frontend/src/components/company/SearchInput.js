import React, { useState } from 'react'
import styled from 'styled-components'
import InputArrayTitle from './InputArrayTitle'
import TextButton from '../../components/common/TextButton'

const searchIcon = process.env.PUBLIC_URL + '/icons/search.png';
const SearchInput = ({title,data,placeholder}) => {
  const [searchData , setSearchData] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedData , setSelectedData] = useState([]);
  const [inputValue , setInputValue] = useState("");
  const onClickItem = (img,name) => {
    if(selectedData.findIndex((item) => item.name == name) === -1){
      setSelectedData([...selectedData,{img,name}])
    }
    else{
      alert("이미 선택된 기술스택입니다.")
    }
    setInputValue("");
    setSearchData(data);
  }
  const onChangeInput = (e) => {
    setSearchData(data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setInputValue(e.target.value);
  }

  const onClickDeleteButton = (item) => {
    console.log(item);
    setSelectedData(selectedData.filter((value) => value.name != item.name));
  }
  return (
    <Container>
      <InputArrayTitle>{title}</InputArrayTitle>
      <SelectedItems>
        {selectedData && selectedData.map((item) => <SelectedItem><Icon src ={item.img}/>{item.name}<TextButton onclick ={() => {onClickDeleteButton(item)}} fontsize='14px' color={"red"}>X</TextButton></SelectedItem>)}
      </SelectedItems>
      <InputSection>
        <Image src={searchIcon}/>
        <Input
        value = {inputValue}
        onFocus = {() => {setIsSearching(true)}}
        onBlur = {() => {setTimeout(() => {
          setIsSearching(false)
        }, 100); }}
        onChange = {(e) => {onChangeInput(e)}} placeholder={placeholder}/>
        {isSearching &&(
          <SelectBox>
          {searchData.map((item,index) => <SelectItem onClick = {() => {
            setIsSearching(false)
            onClickItem(item.img,item.name)}} key ={`selcectItem-${index}`}><Icon src ={item.img}/>{item.name}</SelectItem>)}
        </SelectBox>)}
      </InputSection>
    </Container>
  )
}
export default SearchInput

const Container = styled.div`
  width:100%;
  margin-bottom : 40px;
`

const InputSection = styled.section`
  display:flex;
  align-items : center;
  position : relative;
  width : 100%;
`
const Image = styled.img`
  width : 18px;
  position : absolute;
  left : 5px;
`

const Input = styled.input`
  padding : 8px;
  padding-left : 30px;
  border-radius : 10px;
  border : 1px solid #B5B5B5;
  width : 100%;
`

const SelectBox = styled.ul`
  display:flex;
  top : 33px;
  background-color : white;
  flex-direction :column;
  position:absolute;
  width : 100%;
  align-items:center;
  max-height : 300px;
  overflow-y : scroll;
  box-shadow: 10px 5px 5px #B5B5B5;
  &::-webkit-scrollbar{
  display:none;
  
}
`

const SelectItem = styled.button`
  text-align : center;
  background : none;
  border : none;
  width:100%;
  padding : 10px;
  &:hover{
    background-color : #B5B5B5;
  };
`
const Icon = styled.img`
    width : 18px;
`

const SelectedItems = styled.div`
  display:flex;
  gap : 20px;
  flex-wrap : wrap;
  margin-bottom : 20px;
`

const SelectedItem = styled.div`
  padding : 10px;
  border : 1px solid #B5B5B5;
  border-radius : 10px;
  display:flex;
  align-items : center;
  &:hover {
    background-color : #B5B5B5;
  }
`