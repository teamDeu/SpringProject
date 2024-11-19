import React, { useState } from "react";

function Frame28({ onButtonClick }) {
  const [activeButton, setActiveButton] = useState("면접후기"); // 활성 버튼 상태

  // 공통 스타일
  const buttonStyle = {
    width: "1000px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
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
      {/* 면접 후기 버튼 */}
      <div
        style={activeButton === "면접후기" ? activeStyle : inactiveStyle}
        onClick={() => {
          setActiveButton("면접후기");
          onButtonClick("면접후기");
        }}
      >
        면접 후기
      </div>

      {/* 기업 리뷰 버튼 */}
      <div
        style={activeButton === "기업리뷰" ? activeStyle : inactiveStyle}
        onClick={() => {
          setActiveButton("기업리뷰");
          onButtonClick("기업리뷰");
        }}
      >
        기업 리뷰
      </div>
    </div>
  );
}

export default Frame28;
