import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputArrayTitle from './InputArrayTitle'
import PhotoInput from './PhotoInput'
const InputWithPhoto = ({title,updateValue,value}) => {
    const [aboutCompany,setAboutCompany] = useState(value);
    const handleChange = (e) =>{
        setAboutCompany((prev) => ({...prev,description : e.target.value}))
    }
    const updateImage = (image) => {
        setAboutCompany((prev) => ({...prev, images : image}))
    }
    useEffect(() => {
        updateValue(aboutCompany);  
    },[aboutCompany])

    useEffect(() => {
        if (JSON.stringify(value) !== JSON.stringify(aboutCompany)) {
            setAboutCompany(value);
          }
    },[value])
  return (
    <Container>
        <InputArrayTitle>{title}</InputArrayTitle>
        <MainSection>
        <PhotoInput imageLength = {5} value = {aboutCompany.images} updateImage = {(value) =>updateImage(value)}/>
        <TextSection>
        <TextInput onInput = {(e) => {
            e.target.style.height = "auto"; // 높이를 초기화
            e.target.style.height = e.target.scrollHeight + "px"; // 내용에 맞게 높이 조정
        }} 
        onChange = {(e) => {handleChange(e)}}
        placeholder='기업 소개글을 작성해주세요'
        value ={aboutCompany.description}/>
        </TextSection>

        </MainSection>
    </Container>
  )
}

export default InputWithPhoto

const Container = styled.div`
    width : 100%;
`
const MainSection = styled.section`
    width : 100%;
    border : 1px dashed #B5B5B5;
    padding : 20px;
`
const TextSection = styled.section`
    min-height: 300px;
    display : flex;
    border: 1px solid #B5B5B5;
    align-items : flex-start;
    border-radius : 10px;
`
const TextInput = styled.textarea`
    width :100%;
    padding :20px;
    height : 300px; 
    box-sizing : border-box;
    border:none;
    border-radius : 10px;
    outline:none;
`