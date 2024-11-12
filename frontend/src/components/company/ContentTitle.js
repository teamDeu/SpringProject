import React from 'react';
import styled from 'styled-components';


function ContentTitle({children}) {
    return(
        <Container>
            {children}
        </Container>
    );
}

export default ContentTitle;

const Container = styled.span`c
    font-size : 35px;
`
