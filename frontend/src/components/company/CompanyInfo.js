
// index.js
import React from 'react';
import styled from 'styled-components';
import JobTopBar from '../../components/JobTopBar';
import IDInput from '../../components/mypage/IDinput';
import EditButton from '../../components/mypage/EditButton';
import IDWithSocialLogin from '../../components/mypage/IDWithSocialLogin';
import MainContent from '../common/MainContent';
import PasswordInput from '../mypage/PasswordInput';

const CompanyInfo = ({companyInfo,setCompanyInfo}) => {
    const handleDeleteAccount = () => {
        alert("회원탈퇴 버튼이 클릭되었습니다.");
        // 회원탈퇴 로직을 여기에 추가
    };

    return (
        <Container>
                    <Section>
                        <SectionTitleWrapper>
                            <SectionTitle>기본 정보</SectionTitle>
                            <EditButton link='/InputCompanyInfo'>수정</EditButton>
                        </SectionTitleWrapper>
                        <Row>
                            <IDInput label="아이디" value={companyInfo.id} />
                        </Row>
                        <Row>
                            <PasswordInput label="비밀번호" value={companyInfo.pwd} />
                        </Row>
                        <Row>
                            <IDInput label="이름" value = {companyInfo.managerName} />
                        </Row>
                        <Row>
                            <IDInput label="전화번호" value={companyInfo.managerPhone}/>
                        </Row>
                        <DeleteAccountWrapper>
                            <DeleteAccountButton onClick={handleDeleteAccount}>회원탈퇴</DeleteAccountButton>
                        </DeleteAccountWrapper>
                    </Section>
        </Container>
    );
};

export default CompanyInfo;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border : 1px solid #B5B5B5;
    padding : 30px 200px;
    box-sizing : border-box;
    margin-top : 40px;
    z-index : 3;
`;

const Section = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

const SectionTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const DeleteAccountWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const DeleteAccountButton = styled.button`
    background: none;
    border: none;
    color: #888;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #333;
    }
`;
