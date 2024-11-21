import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputArrayTitle from './InputArrayTitle'
import PhotoInput from './PhotoInput'
const InputWithPhoto = ({title,updateValue}) => {
    const [aboutCompany,setAboutCompany] = useState({
        images: [
            "https://via.placeholder.com/600x400?text=GNA+Company",
            "https://via.placeholder.com/600x400?text=PlayIo+Service",
        ],
        description: [
            "[GNA COMPANY]\n저희 회사는 게임사와 네크워크 최적화를 제공하는 게이머 중심 플랫폼으로 '플레이오'라는 안드로이드 앱 서비스를 제공합니다.",
            "[PlayIo 서비스]\nBest Value for Gamers! Nexon, Moon Active 등 글로벌 파트너사들과 협력합니다.",
        ],
    });
    const handleChange = (e) =>{
        setAboutCompany((prev) => ({...prev,description : e.target.value}))
    }
    const updateImage = (image) => {
        setAboutCompany((prev) => ({...prev, images : image}))
    }
    useEffect(() => {
        updateValue(aboutCompany);
    },[aboutCompany])
  return (
    <Container>
        <InputArrayTitle>{title}</InputArrayTitle>
        <MainSection>
        <PhotoInput imageLength = {4} updateImage = {(value) =>updateImage(value)}/>
        <TextSection>
        <TextInput onInput = {(e) => {
            e.target.style.height = "auto"; // 높이를 초기화
            e.target.style.height = e.target.scrollHeight + "px"; // 내용에 맞게 높이 조정
        }} 
        onChange = {(e) => {handleChange(e)}}
        placeholder='기업 소개글을 작성해주세요'/>
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