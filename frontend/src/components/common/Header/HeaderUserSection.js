import React from 'react';
import styled from 'styled-components';
import TextButton from '../TextButton';
const HeaderUserSection = ({isLogin,username = "회사이름"}) => {
    if(isLogin){
        return (
        <Container>
            <UserIcon/>
            <UserName>{username}</UserName>
            <TextButton fontsize='15px'>▼</TextButton>
            <Modal>
                <ModalButton>

                </ModalButton>
            </Modal>
        </Container>)
    }
    else{
        return (
        <Container>
            <TextButton>회원가입</TextButton>
            <TextButton>로그인</TextButton>
        </Container>)
    }
};

export default HeaderUserSection;

const Container = styled.div`

`

const UserName = styled.span`
`

const UserIcon = styled.img`

`

const Modal = styled.div`
    display : none;
`

const ModalButton = styled.button`
    
`