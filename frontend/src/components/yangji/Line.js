import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
    border-style: solid;
    border-color: #b5b5b5;
    border-width: 1.3px 0 0 0;
    height: 0px;
    position: relative;
`;

const HorizontalLine = () => {
    return <Line />;
};

export default HorizontalLine;
