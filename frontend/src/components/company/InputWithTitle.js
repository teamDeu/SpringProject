import React from 'react';
import styled from 'styled-components';
import InputTitle from './InputTitle';


function InputWithTitle({title,placeholder,value,onChange,type,readOnly}) {
    return(
        <Container>
            <InputTitle>{title}</InputTitle>
            <Input readOnly ={readOnly} type = {type} value = {value} onChange = {onChange} placeholder={placeholder}></Input>
        </Container>
    );
}

export default InputWithTitle;

const Container = styled.div`
    width:49.5%;
    box-sizing:border-box;
    margin-bottom : 20px;
    display:flex;
    flex-direction : column;
`

const Input = styled.input`
    border-radius : 10px;
    width : 100%;
    box-sizing:border-box;
    padding : 10px;
`