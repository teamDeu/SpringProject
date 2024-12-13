import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputArrayTitle from './InputArrayTitle';

const InputArray = ({ title, placeholder, mainInput = "", updateValue = () => {}, value }) => {
    const [inputs, setInputs] = useState([{ id: Date.now(), value: '' }]);
    const [mainInputValue, setMainInputValue] = useState({ type: 'main', value: '' });
    const [isComposing, setIsComposing] = useState(false); // 한글 입력 조합 상태
    const inputRefs = useRef([]);

    // 값 파싱 및 상태 초기화
    useEffect(() => {
        if (typeof value === 'string') {
            const parsedValue = JSON.parse(value);

            // Main input 초기화
            const mainItem = parsedValue.find((item) => item.type === 'main');
            if (mainItem && !mainInputValue.value) {
                setMainInputValue(mainItem);
            }

            // Inputs 초기화
            const filteredInputs = parsedValue.filter((item) => item.type !== 'main');
            if (JSON.stringify(filteredInputs) !== JSON.stringify(inputs)) {
                setInputs(filteredInputs);
            }
        }
    }, [value]);

    // 업데이트 값 전달
    useEffect(() => {
        const updatedValue = mainInput ? [...inputs, mainInputValue] : inputs;
        updateValue(updatedValue);

        // 마지막 입력 요소에 포커스
        const lastInput = inputRefs.current[inputRefs.current.length - 1]?.element;
        lastInput?.focus();
    }, [inputs, mainInputValue, mainInput]);

    // 유틸리티: Input 추가
    const addInput = () => {
        setInputs((prev) => [...prev, { id: Date.now(), value: '' }]);
    };

    // 유틸리티: Input 제거
    const removeInput = (id) => {
        setInputs((prev) => prev.filter((input) => input.id !== id));
    };

    // 이벤트 핸들러
    const handleChange = (id, value) => {
        setInputs((prev) =>
            prev.map((input) => (input.id === id ? { ...input, value } : input))
        );
    };

    const handleKeyDown = (e, id) => {
        if (isComposing) return; // 한글 조합 중일 때는 동작 방지

        if (e.code === 'Enter') {
            e.preventDefault();
            addInput();
        } else if (e.code === 'Backspace' && inputs.length > 1 && e.target.value === '') {
            e.preventDefault();
            removeInput(id);
            inputRefs.current = inputRefs.current.filter((ref) => ref?.id !== id);
        }
    };

    const handleMainChange = (e) => {
        setMainInputValue({ type: 'main', value: e.target.value });
    };

    const setInputRef = (element, id) => {
        if (element && !inputRefs.current.some((ref) => ref?.id === id)) {
            inputRefs.current.push({ id, element });
        }
    };

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    return (
        <Container>
            <InputArrayTitle>{title}</InputArrayTitle>

            <InputList>
                {/* Main Input */}
                {mainInput && (
                    <MainInput
                        ref={(el) => setInputRef(el, 'main')} // ref 설정
                        value={mainInputValue.value}
                        onChange={handleMainChange}
                        placeholder={mainInput}
                    />
                )}

                {/* Sub Inputs */}
                {inputs.map((input) => (
                    <InputItem key={input.id}>
                        · <Input
                            ref={(el) => setInputRef(el, input.id)} // ref 설정
                            value={input.value}
                            placeholder={placeholder}
                            onKeyDown={(e) => handleKeyDown(e, input.id)}
                            onChange={(e) => handleChange(input.id, e.target.value)}
                            onCompositionStart={handleCompositionStart}
                            onCompositionEnd={handleCompositionEnd}
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
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    width: 97%;
    outline: none;
    height: 60px;
`;
