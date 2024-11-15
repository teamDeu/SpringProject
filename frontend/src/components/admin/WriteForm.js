import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./writeform.css";
import DropdownSelect from "../../components/admin/Select";

const WriteForm = ({
  secondSelectOptions,
  cancelPath,
  showImageFileButtons,
  isAnnouncementPage,
}) => {
  const navigate = useNavigate();
  const contentRef = useRef(null); // contentEditable 영역 참조
  const [isTitleBold, setIsTitleBold] = useState(false);
  const [fileList, setFileList] = useState([]); // 첨부 파일 목록
  const [isEmptyContent, setIsEmptyContent] = useState(true); // 플레이스홀더 표시 여부

  const handleTitleChange = (e) => {
    setIsTitleBold(e.target.value.trim() !== "");
  };

  const handleContentInput = () => {
    const content = contentRef.current.innerHTML.trim();
    setIsEmptyContent(content === "");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        insertImageAtCursor(
          `<img src="${reader.result}" alt="첨부 이미지" style="max-width:100%; height:auto;" />`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageAtCursor = (html) => {
    const contentEditableDiv = contentRef.current;
    if (contentEditableDiv && document.getSelection) {
      const sel = document.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);

        // 범위가 write-content-textarea 내부에 있는지 확인
        if (
          contentEditableDiv.contains(range.commonAncestorContainer) ||
          range.commonAncestorContainer === contentEditableDiv
        ) {
          range.deleteContents(); // 현재 선택된 텍스트 삭제
          const tempEl = document.createElement("div");
          tempEl.innerHTML = html;
          const frag = document.createDocumentFragment();

          let node;
          while ((node = tempEl.firstChild)) {
            frag.appendChild(node); // HTML을 DocumentFragment로 변환
          }

          range.insertNode(frag); // 커서 위치에 HTML 삽입
          range.collapse(false); // 커서를 삽입한 HTML 뒤로 이동
        } else {
          // 커서가 write-content-textarea 외부에 있는 경우, 내용 맨 끝에 추가
          contentEditableDiv.innerHTML += html;
        }
      }
    }
    handleContentInput(); // 입력 상태 업데이트
  };

  const handleCancel = () => {
    navigate(cancelPath);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // 파일에 대한 다운로드 URL 생성
      setFileList((prevFiles) => [...prevFiles, { name: file.name, url: fileURL }]);
    }
  };

  const handleFileDelete = (fileName) => {
    setFileList((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <div className="write-form-container">
      <div className="write-header">
        <DropdownSelect
          initialOptions={["개인회원", "기업회원"]}
          defaultOption="개인회원"
          onChange={(selectedOption) =>
            console.log("Selected member type:", selectedOption)
          }
          showPlusButton={false}
          showDeleteButton={false}
        />
        <DropdownSelect
          initialOptions={secondSelectOptions}
          defaultOption={secondSelectOptions[0]}
          onChange={(selectedOption) =>
            console.log("Selected sort option:", selectedOption)
          }
          showPlusButton={true}
          showDeleteButton={true}
          width="1270px"
          margin="0 0 0 32px"
        />
      </div>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className={`write-title-input ${isTitleBold ? "bold" : ""}`}
        onChange={handleTitleChange}
      />

      <div className="content-box">
        <div
          ref={contentRef}
          className={`write-content-textarea ${isEmptyContent ? "placeholder" : ""}`}
          contentEditable={true}
          onInput={handleContentInput}
          suppressContentEditableWarning={true}
        ></div>

        {/* 첨부된 파일 박스 */}
        {fileList.length > 0 && (
          <div className="file-attachment-box">
            <h4>첨부된 파일</h4>
            <ul>
              {fileList.map((file, index) => (
                <li key={index}>
                  <a href={file.url} download={file.name}>
                    {file.name}
                  </a>
                  <button
                    onClick={() => handleFileDelete(file.name)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showImageFileButtons && (
        <div className="image-file-buttons">
          <label className="image-button">
            <img src="/icons/picture.png" alt="사진" className="icon" />
            사진
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
          <label className="file-button">
            <img src="/icons/file.png" alt="파일" className="icon" />
            파일
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}

      <div className={`write-buttons ${isAnnouncementPage ? "announcement-style" : ""}`}>
        <button className="write-submit-button">등록</button>
        <button className="write-cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default WriteForm;
