import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
    font-weight: ${(props) => props.fontWeight || 'normal'};
    font-size: ${(props) => props.fontSize || '16px'};
    color:#000000;

    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
`;

const FontControlBox = ({
    fontWeight, // 폰트 굵기 (예: 'bold', 'normal', 400)
    fontSize,   // 폰트 크기 (예: '16px', '1.5em')
    top,        // Y 좌표
    left,       // X 좌표
    children    // 컴포넌트 내용
}) => {
    return (
        <StyledText
            fontWeight={fontWeight}
            fontSize={fontSize}
            top={top}
            left={left}
        >
            {children}
        </StyledText>
    );
};

export default FontControlBox;
