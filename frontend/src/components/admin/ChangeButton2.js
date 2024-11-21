import React, { useState } from "react";

function ChangeButton2({ onButtonClick }) {
  const [activeButton, setActiveButton] = useState("전체"); // 기본 활성 버튼 "전체"

  // 공통 스타일
  const buttonStyle = {
    width: "1000px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: '"Nanum Square Neo", sans-serif',
    color: "black", // 기본 글자 색상
    border: "1px solid #000", // 기본 테두리
    cursor: "pointer",
  };

  // 활성화된 버튼 스타일
  const activeStyle = {
    ...buttonStyle,
    fontWeight: "700",
    color: "#00257a", // 글자 파란색
    borderLeft: "2px solid #000", // 왼쪽 테두리 굵게
    borderTop: "2px solid #000", // 위쪽 테두리 굵게
    borderRight: "2px solid #000", // 오른쪽 테두리 굵게
    borderBottom: "2px solid transparent", // 아래쪽 테두리 감추기
  };

  // 비활성화된 버튼 스타일
  const inactiveStyle = {
    ...buttonStyle,
    borderLeft: "1px solid #000", // 기본 테두리 두께
    borderTop: "1px solid #000",
    borderRight: "1px solid #000",
    borderBottom: "2px solid #000", // 아래쪽 테두리 굵게
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      {/* 전체 버튼 */}
      <div
        style={activeButton === "전체" ? activeStyle : inactiveStyle}
        onClick={() => {
          setActiveButton("전체");
          onButtonClick("전체");
        }}
      >
        전체
      </div>

      {/* 개인회원 버튼 */}
      <div
        style={activeButton === "개인회원" ? activeStyle : inactiveStyle}
        onClick={() => {
          setActiveButton("개인회원");
          onButtonClick("개인회원");
        }}
      >
        개인회원
      </div>

      {/* 기업회원 버튼 */}
      <div
        style={activeButton === "기업회원" ? activeStyle : inactiveStyle}
        onClick={() => {
          setActiveButton("기업회원");
          onButtonClick("기업회원");
        }}
      >
        기업회원
      </div>
    </div>
  );
}

export default ChangeButton2;
