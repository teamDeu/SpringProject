import React, { useState } from 'react';
import styled from 'styled-components';
import JobTopBar from '../../../components/JobTopBar';
import MainContent from '../../../components/common/MainContent';


const Index = () => {
    return (
        <Container>
            <JobTopBar/>
            <MainContent>
                <SearchSection>
                    <SearchTitle>
                        안녕하세요
                    </SearchTitle>
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
`

const SearchTitle = styled.div`

`