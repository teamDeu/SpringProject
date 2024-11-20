import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
    position: absolute;
    top: ${(props) => props.top || '0px'};
    left: ${(props) => props.left || '0px'};
    width: ${(props) => props.width || '200px'};
    height: ${(props) => props.height || '100px'};
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    resize: ${(props) => props.resize || 'none'}; /* 사용자가 크기를 조절할 수 없게 설정 (필요 시 'both'로 변경 가능) */

    &::placeholder {
        color: ${(props) => props.placeholderColor || '#aaa'};
        font-size: 14px;
    }

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const TextareaBox = ({
    top,
    left,
    width,
    height,
    placeholder,
    placeholderColor,
    value,
    onChange,
    resize
}) => {
    return (
        <StyledTextarea
            top={top}
            left={left}
            width={width}
            height={height}
            placeholder={placeholder}
            placeholderColor={placeholderColor}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            resize={resize}
        />
    );
};

export default TextareaBox;
