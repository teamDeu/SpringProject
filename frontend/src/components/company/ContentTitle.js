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

const Container = styled.span`
    font-size : 35px;
`
