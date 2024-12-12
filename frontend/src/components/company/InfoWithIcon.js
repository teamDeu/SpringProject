import React from 'react'
import styled from 'styled-components'

const InfoWithIcon = ({type,info,icon}) => {
  return (
    <Container>
        <Imgbox>
            <Image src = {icon}/>
        </Imgbox>
        <InfoBox>
            {info.map((item,index) => {
                if(index === info.length -1){
                    if(type == "userLocation")
                        return item.name + " " + (item.region == "전체" ? "" : item.region)
                    else
                        return item.name;
                }
                else
                    if(type == "userLocation")
                        return item.name + " " + (item.region == "전체" ? "" : item.region) + ","
                    else
                        return item.name + ","
            })}
        </InfoBox>
    </Container>
  )
}

export default InfoWithIcon

const Container = styled.div`
    display:flex;
    align-items:center;
    gap : 15px;
    width:100%;
`
const Imgbox = styled.div`
    width : 30px;
    display:flex;
    align-items:center;
    justify-content :center;
`

const Image = styled.img`
    object-fit : cover;
`

const InfoBox = styled.div`
    font-size:16px;
    max-width : 100%;
    line-height : 25px;
`