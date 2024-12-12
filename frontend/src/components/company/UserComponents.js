import React from 'react'
import InfoWithIcon from './InfoWithIcon'
import styled from 'styled-components'

const locationIcon = process.env.PUBLIC_URL + '/icons/locationIcon.png';
const categoryIcon = process.env.PUBLIC_URL + '/icons/categoryIcon.png';
const skillsIcon = process.env.PUBLIC_URL + '/icons/skillsIcon.png';

function timeDifference(targetString) {
    // 문자열을 Date 객체로 변환
    const targetDate = new Date(targetString); // ISO 형식으로 변환
    const targetTimestamp = targetDate.getTime(); // 밀리초로 변환
    
    const now = Date.now(); // 현재 시간
    const diff = now - targetTimestamp; // 시간 차이 (밀리초)

    const days = Math.floor(diff/(1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))); // 시간 단위
    const minutes = Math.floor((diff % (1000 * 60 * 60))/ (1000 * 60))
    return {days , hours, minutes};
  }
  


const UserComponents = ({image,data}) => {


  const updateTime = timeDifference(data.userRegDate);
  return (
    <Container>
        <ImageSection>
            <ImageBox>
                <Image src = {image}/>
            </ImageBox>
            <ExpBox>
                경력
            </ExpBox>
            <ExpBox>
            {data.userExp  === 0 ? "신입" : data.userExp + "년"}
            </ExpBox>
        </ImageSection>
        <InfoSection>
            <UserInfo>
                {data.userName}({data.userGender},{data.userAge}세)
            </UserInfo>
            <InfoWithIcon type = {"userLocation"} icon ={locationIcon} info ={data.userLocation}/>
            <InfoWithIcon type = {"userCategory"} icon ={categoryIcon} info ={data.userCategory}/>
            <InfoWithIcon type = {"userSkills"} icon ={skillsIcon} info ={data.userSkills}/>
        </InfoSection>
        <DateSection>
            {updateTime.days === 0 ? updateTime.hours === 0 ? updateTime.minutes + "분 전 수정" : `${updateTime.hours}시간 전 수정` : updateTime.days + "일 전 수정"}
        </DateSection>
    </Container>
  )
}

export default UserComponents

const Container = styled.div`
    display:flex;
    position : relative;
    align-items:center;
    justify-content : space-between;
    gap : 40px;
    width: 48%;
    border : 1px solid black;
    border-radius : 30px;
    padding : 40px;
    padding-bottom : 80px;
    box-sizing : border-box;
    margin-bottom : 35px;
`

const InfoSection = styled.section`
    display:flex;
    flex-direction : column;
    gap : 25px;
    justify-content:center;
    align-items:center;
    width : 80%;
`

const ImageSection = styled.section`
    display:flex;
    flex-direction : column;
    align-items : center;
`

const UserInfo = styled.div`
    font-size:20px;
    width : 100%;
`

const ImageBox = styled.div`
    width:100%;
`
const Image = styled.img`
    object-fit : contain;
    width : 100%;
`

const ExpBox = styled.div`
    color : #1A28F4;
    font-size : 20px;
    padding : 5px;
`

const DateSection = styled.div`
    position:absolute;
    bottom : 10%;
    right : 10%;
    color : rgba(0,0,0,0.5);
`