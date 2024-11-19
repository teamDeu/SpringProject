import React from 'react';
import styled from 'styled-components';

const HeaderTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const PageHeader = ({ title }) => {
    return (
        <div style={{ padding: '20px' }}>
            <HeaderTitle>{title}</HeaderTitle>
        </div>
    );
};

export default PageHeader;
