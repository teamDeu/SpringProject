import React, { useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import MainContent from '../../../components/common/MainContent';
import DropdownSelect from '../../../components/yangji/selectbox';



const Index = () => {
    return (
        <Container>
            <JobTopBar/>
            <MainContent>
                <SearchSection>
                    <SearchTitle>
                        <ColorFont>원하는 조건의 인재</ColorFont>를 지금 바로 검색해 보세요!
                    </SearchTitle>
                    <>
                        <DropdownSelect>

                        </DropdownSelect>
                    </>
                </SearchSection>
            </MainContent>
            
        </Container>
    );
};

export default Index;

const Container = styled.div`

`

const SearchSection = styled.section`
    border-radius : 30px;
    border : 1px solid black;
    width : 100%;
    display:flex;
    flex-direction : column;
    align-items:center;
    padding : 30px 0px;
`

const SearchTitle = styled.div`
    font-size : 24px;
`

const ColorFont = styled.span`
    color : #FF8447;
    font-weight : bold;
`