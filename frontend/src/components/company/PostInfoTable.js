import React, { useState } from 'react'
import InputArrayTitle from './InputArrayTitle'
import styled from 'styled-components'
import CustomCalendar from '../common/CustomCalender'
const calendarIcon = process.env.PUBLIC_URL + '/icons/calender.png';

const PostInfoTable = () => {
    const [dateValue,setDate] = useState();
    const [onCalender,setOnCalender] = useState(false);
    const onChangeCalender = (e) => {
        const date = new Date(e);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0'); // 2자리로 포맷
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setDate(formattedDate);
        setOnCalender(false);
    }
  return (
    <Container>
        <InputArrayTitle>채용 정보 (간단 요약)</InputArrayTitle>
        <InputSection>
            <TitleInput placeholder='채용 공고 제목을 입력해주세요.'/>
            <CaptionInput placeholder='기업 이름을 입력해주세요'/>
        </InputSection>
        
        <TableSection>
            <Table>
                <Row>
                    <TitleCell>경력</TitleCell>
                    <Content/>
                    <TitleCell>급여</TitleCell>
                    <Content/>
                </Row>
                <Row>
                    <TitleCell>학력</TitleCell>
                    <Content/>
                    <TitleCell>고용형태</TitleCell>
                    <Content/>
                </Row>
                <Row>
                    <TitleCell>마감일</TitleCell>
                    <ContentCell>
                        <Input value ={dateValue}/>
                        {onCalender && (<CalendarSection>
                            <CustomCalendar onChange = {(e) => {onChangeCalender(e)}}  value = {dateValue}/>
                        </CalendarSection>)}
                        <Image onClick={() => setOnCalender(prev => !prev)} src ={calendarIcon}/>
                    </ContentCell>
                    <TitleCell>출퇴근 시간</TitleCell>
                    <Content/>
                </Row>
                <Row>
                    <TitleCell>근무지역</TitleCell>
                    <Content/>
                    <TitleCell></TitleCell>
                    <ContentCell></ContentCell>
                </Row>
            </Table>
        </TableSection>
    </Container>
  )
}

export default PostInfoTable

const Container = styled.div`
    width : 100%;
    margin-bottom : 40px;
`

const TableSection = styled.section`
    width : 100%;
`

const Table = styled.table`
    width:100%;
    border-collapse: collapse;
    border-radius: 10px;
    border-style: hidden;
    box-shadow: 0 0 0 1px #B5B5B5;
`
const Row = styled.tr`
`
const TitleCell = styled.td`
    text-align : center;
    vertical-align : middle;
    width : 10%;
    padding : 20px;
    box-sizing : border-box;
    font-weight : bold;
    border : 1px solid #B5B5B5;
`
const ContentCell = styled.td`
    text-align : center;
    vertical-align : middle;
    width:40%;
    padding : 20px;
    position :relative;
    box-sizing : border-box;
    border : 1px solid #B5B5B5;
`
const Input = styled.input`
    border : none;
    width : 100%;
    outline : none;
    box-sizing:border-box;
`
const Image = styled.img`
    position :absolute;
    right : 5px;
    top : 15px;
    width : 30px;
`
const CalendarSection = styled.div`
    position : absolute;
    right:0px;
    z-index : 3;
`
const InputSection = styled.div`
    display:flex;
    flex-direction : column;
    gap:20px;
    margin-bottom : 40px;
`
const TitleInput = styled.input`
    padding : 20px;
    font-size : 24px;
    border : 1px solid #B5B5B5;
    border-radius:10px;
`

const CaptionInput = styled.input`
    padding : 15px;
    font-size : 20px;
    border : 1px solid #B5B5B5;
    border-radius:10px;
`


const Content = () => {
    return(
        <ContentCell>
            <Input/>
        </ContentCell>
    )
}