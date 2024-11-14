import React from 'react';
import styled from 'styled-components';


function InputWithTitle({title,placeholder}) {
    return(
        <Container>
            <InputTitle>{title}</InputTitle>
            <Input placeholder={placeholder}></Input>
        </Container>
    );
}

export default InputWithTitle;

const Container = styled.div`
    width:600px;
    display:flex;
    flex-direction : column;
`
const InputTitle = styled.span`
    margin-bottom : 15px;
`

const Input = styled.input`
    border-radius : 10px;
    padding : 10px;
`