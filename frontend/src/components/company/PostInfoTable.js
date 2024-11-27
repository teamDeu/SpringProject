import React, { useState, memo, useEffect } from "react";
import styled from "styled-components";
import CustomCalendar from "../../components/common/CustomCalender"

const calendarIcon = process.env.PUBLIC_URL + "/icons/calender.png";

const Content = memo(({ type, value, onChange }) => {
  return (
    <ContentCell>
      <Input
        value={value}
        onChange={onChange}
        placeholder={`${type}`} // Optional for user guidance
      />
    </ContentCell>
  );
});

const PostInfoTable = ({ updateValue , value}) => {
  const [dateValue, setDate] = useState("");
  const [onCalender, setOnCalender] = useState(false);
  const [tableValue, setTableValue] = useState({
    location: "",
    employmentType: "",
    salary: "",
    endDate: "",
    experience: "",
    education: "",
    commuteTime: "",
  });
  const keys = Object.keys(tableValue)
  useEffect(() => {
    
    keys.forEach((key) => {
      if(value[key] !== tableValue[key]){
        setTableValue((prev) => ({...prev,[key] : value[key]}))
      }
      
    })
  },[value])

  const handleChange = (type, newValue) => {
    setTableValue((prev) => ({ ...prev, [type]: newValue }));
    updateValue({ ...tableValue, [type]: newValue });
  };

  const onChangeCalender = (e) => {
    const date = new Date(e);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    handleChange("endDate", formattedDate); // Update state and parent
    setOnCalender(false);
  };

  return (
    <Container>
      <TableSection>
        <Table>
          <Row>
            <TitleCell>경력</TitleCell>
            <Content
              type="experience"
              value={tableValue.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />
            <TitleCell>급여</TitleCell>
            <Content
              type="salary"
              value={tableValue.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
            />
          </Row>
          <Row>
            <TitleCell>학력</TitleCell>
            <Content
              type="education"
              value={tableValue.education}
              onChange={(e) => handleChange("education", e.target.value)}
            />
            <TitleCell>고용형태</TitleCell>
            <Content
              type="employmentType"
              value={tableValue.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
            />
          </Row>
          <Row>
            <TitleCell>마감일</TitleCell>
            <ContentCell>
                        <Input onBlur = {(e) => {setTableValue((prev) => ({...prev,"endDate" : e.target.value}))}} value ={tableValue.endDate.split("T")[0] }/>
                        {onCalender && (<CalendarSection>
                            <CustomCalendar onChange = {(e) => {onChangeCalender(e)}}  value = {dateValue}/>
                        </CalendarSection>)}
                        <Image onClick={() => setOnCalender(prev => !prev)} src ={calendarIcon}/>
                    </ContentCell>
            <TitleCell>출퇴근 시간</TitleCell>
            <Content
              type="commuteTime"
              value={tableValue.commuteTime}
              onChange={(e) => handleChange("commuteTime", e.target.value)}
            />
          </Row>
          <Row>
            <TitleCell>근무지역</TitleCell>
            <Content
              type="location"
              value={tableValue.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
            <TitleCell></TitleCell>
            <ContentCell></ContentCell>
          </Row>
        </Table>
      </TableSection>
    </Container>
  );
};

export default PostInfoTable;

const Container = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const TableSection = styled.section`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #b5b5b5;
`;

const Row = styled.tr``;

const TitleCell = styled.td`
  text-align: center;
  vertical-align: middle;
  width: 10%;
  padding: 20px;
  box-sizing: border-box;
  font-weight: bold;
  border: 1px solid #b5b5b5;
`;

const ContentCell = styled.td`
  text-align: center;
  vertical-align: middle;
  width: 40%;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #b5b5b5;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;

const Image = styled.img`
  position: absolute;
  right: 5px;
  top: 15px;
  width: 30px;
`;

const CalendarSection = styled.div`
  position: absolute;
  right: 0px;
  z-index: 3;
`;
