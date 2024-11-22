import React, { useState } from 'react';
import styled from 'styled-components';

const CompanyNameBox = styled.div`
    width: 250px; /* 버튼 크기 포함하여 확장 */
    height: 40px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-family: 'Nanum Square Neo', sans-serif;
`;

const BoxBackground = styled.div`
    background: #ffffff;
    border: 1px solid #000000;
    width: 200px;
    height: 40px;
    position: relative;
    box-sizing: border-box;
`;

const CompanyNameInput = styled.input`
    color: #000000;
    font-size: 20px;
    font-weight: 300;
    width: 160px;
    height: 40px; /* BoxBackground와 동일한 높이 */
    border: none;
    padding-left: 24px;
    background: transparent;
    outline: none;

    ::placeholder {
        color: #888888; /* 플레이스홀더 색상 */
    }
`;

const SearchButton = styled.button`
    background: #00257a;
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
    width: 68px;
    height: 40px;
    border: none;
    margin-left: 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CompanyName = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        onSearch(value); // 검색 값을 상위 컴포넌트로 전달
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // 엔터 키를 눌렀을 때 검색 실행
        }
    };

    return (
        <CompanyNameBox>
            <BoxBackground>
                <CompanyNameInput
                    type="text"
                    placeholder="기업명"
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} // 엔터 키 이벤트 추가
                />
            </BoxBackground>
            <SearchButton onClick={handleSearch} style={{ width: '100%', height: '100%' }}>
                검색
            </SearchButton>
        </CompanyNameBox>
    );
};

export default CompanyName;
