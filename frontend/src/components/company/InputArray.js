import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputArrayTitle from './InputArrayTitle';

const InputArray = ({ title, placeholder, mainInput }) => {
    const [inputs, setInputs] = useState([{ id: Date.now(), value: '' }]);
    const inputRefs = useRef([]); // 각 input 요소의 참조를 저장
    const [isComposing, setIsComposing] = useState(false); // 한글 입력 조합 상태

    const handleChange = (e, id) => {
        const value = e.target.value;
        setInputs((prev) =>
            prev.map((input) =>
                input.id === id ? { ...input, value } : input
            )
        );
    };

    const handleKeyDown = (e, id) => {
        if (isComposing) return; // 한글 조합 중에는 처리 방지

        if (e.code === 'Enter') {
            e.preventDefault(); // 기본 Enter 동작 방지
            setInputs((prev) => [...prev, { id: Date.now(), value: '' }]);
        } else if (e.code === 'Backspace' && e.target.value === '' && inputs.length > 1) {
            e.preventDefault(); // 기본 Backspace 동작 방지
            setInputs((prev) => prev.filter((input) => input.id !== id));
            inputRefs.current = inputRefs.current.filter((ref) => ref?.id !== id);
        }
    };

    // 한글 조합 상태 감지
    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            const lastInput = inputRefs.current[inputRefs.current.length - 1].element;
            lastInput?.focus();
        }
    }, [inputs]);

    const setInputRef = (element, id) => {
        if (element && !inputRefs.current.some((ref) => ref?.id === id)) {
            inputRefs.current.push({ id, element });
        }
    };

    return (
        <Container>
            <InputArrayTitle>{title}</InputArrayTitle>
           
            <InputList>
                {mainInput && <MainInput placeholder={mainInput}/>}
                {inputs.map((input) => (
                    <InputItem key={input.id}>
                        ·
                        <Input
                            ref={(el) => setInputRef(el, input.id)} // ref 설정
                            onKeyDown={(e) => handleKeyDown(e, input.id)}
                            onChange={(e) => handleChange(e, input.id)}
                            onCompositionStart={handleCompositionStart}
                            onCompositionEnd={handleCompositionEnd}
                            placeholder={placeholder}
                        />
                    </InputItem>
                ))}
            </InputList>
        </Container>
    );
};

export default InputArray;

const Container = styled.div`
    width: 100%;
    margin-bottom: 40px;
`;

const InputList = styled.ul`
    padding: 20px;
    border: 1px solid #B5B5B5;
    border-radius: 10px;
    box-sizing: border-box;
`;

const InputItem = styled.li`
    width: 100%;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #B5B5B5;
    width: 97%;
    padding: 10px;
    outline: none;
`;

const MainInput = styled.input`
    border: 1px solid #B5B5B5;
    border-radius : 10px;
    padding : 20px;
    box-sizing : border-box;
    width: 97%;
    outline: none;
    height: 60px;
`