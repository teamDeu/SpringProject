// WriteForm.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import DropdownSelect from "../../components/admin/Select";
import { GetFaqsByTarget } from "../../api/api"; // 수정된 API 함수 임포트

const WriteForm = ({
  cancelPath,
  showImageFileButtons,
  isAnnouncementPage,
}) => {
  const navigate = useNavigate();
  const contentRef = useRef(null); // contentEditable 영역 참조

  const [isTitleBold, setIsTitleBold] = useState(false);
  const [fileList, setFileList] = useState([]); // 첨부 파일 목록
  const [isEmptyContent, setIsEmptyContent] = useState(true); // 플레이스홀더 표시 여부

  // 새로운 상태 변수 추가
  const [memberType, setMemberType] = useState("개인회원"); // 첫 번째 셀렉트 박스의 선택된 값
  const [secondSelectOptions, setSecondSelectOptions] = useState([]); // 두 번째 셀렉트 박스의 옵션 목록
  const [selectedSecondOption, setSelectedSecondOption] = useState(""); // 두 번째 셀렉트 박스의 선택된 값
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // memberType 변경 시 해당하는 FAQ 타이틀 가져오기
  useEffect(() => {
    // 회원 타입에 따라 타겟 매핑
    const targetMap = {
      "개인회원": "개인_FAQ",
      "기업회원": "기업_FAQ",
    };

    const target = targetMap[memberType];
    console.log("Fetching FAQs for target:", target); // 디버깅용 로그

    // FAQ 데이터 가져오기
    const fetchFaqTitles = async () => {
      setIsLoading(true);
      try {
        const faqs = await GetFaqsByTarget(target);
        console.log("Fetched FAQs for target:", faqs); // 디버깅용 로그
        const titles = faqs.map((faq) => faq.title);
        console.log("FAQ Titles:", titles); // 디버깅용 로그
        setSecondSelectOptions(titles);
        setSelectedSecondOption(titles.length > 0 ? titles[0] : ""); // 기본 선택값 설정
      } catch (error) {
        console.error("Error fetching FAQ titles:", error);
        setSecondSelectOptions([]);
        setSelectedSecondOption("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqTitles();
  }, [memberType]);

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
    <Container>
      <Header>
        {/* 첫 번째 DropdownSelect: 회원 타입 선택 */}
        <DropdownSelect
          initialOptions={["개인회원", "기업회원"]}
          defaultOption={memberType}
          onChange={(selectedOption) => {
            console.log("Selected member type:", selectedOption);
            setMemberType(selectedOption);
          }}
          showPlusButton={false}
          showDeleteButton={false}
        />
        {/* 두 번째 DropdownSelect: FAQ 타이틀 선택 */}
        <DropdownSelect
          initialOptions={secondSelectOptions}
          defaultOption={selectedSecondOption}
          onChange={(selectedOption) => {
            console.log("Selected second option:", selectedOption);
            setSelectedSecondOption(selectedOption);
          }}
          showPlusButton={false} // FAQ 제목은 추가하지 않도록 설정
          showDeleteButton={false} // FAQ 제목 삭제도 비활성화
          width="1270px"
          margin="0 0 0 32px"
        />
      </Header>
      <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        isBold={isTitleBold}
        onChange={handleTitleChange}
      />

      <ContentBox>
        <ContentTextarea
          ref={contentRef}
          isEmpty={isEmptyContent}
          contentEditable={true}
          onInput={handleContentInput}
          suppressContentEditableWarning={true}
        ></ContentTextarea>

        {/* 첨부된 파일 박스 */}
        {fileList.length > 0 && (
          <FileAttachmentBox>
            <h4>첨부된 파일</h4>
            <FileList>
              {fileList.map((file, index) => (
                <FileItem key={index}>
                  <FileLink href={file.url} download={file.name}>
                    {file.name}
                  </FileLink>
                  <DeleteButton onClick={() => handleFileDelete(file.name)}>
                    삭제
                  </DeleteButton>
                </FileItem>
              ))}
            </FileList>
          </FileAttachmentBox>
        )}
      </ContentBox>

      {showImageFileButtons && (
        <ImageFileButtons>
          <ImageButton>
            <Icon src="/icons/picture.png" alt="사진" />
            사진
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ImageButton>
          <FileButton>
            <Icon src="/icons/file.png" alt="파일" />
            파일
            <HiddenInput type="file" onChange={handleFileUpload} />
          </FileButton>
        </ImageFileButtons>
      )}

      <ButtonsContainer isAnnouncement={isAnnouncementPage}>
        <SubmitButton>등록</SubmitButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonsContainer>

      {/* 로딩 상태 표시 */}
      {isLoading && <LoadingMessage>FAQ 타이틀을 불러오는 중...</LoadingMessage>}
    </Container>
  );
};

export default WriteForm;

/* Styled Components */

const Container = styled.div`
  width: 1500px;
  height: 800px;
  margin-left: 20px;
  padding: 20px;
  border: 1px solid #959595;
  background-color: #ffffff;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const Header = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const TitleInput = styled.input`
  font-family: 'Nanum Square Neo', sans-serif;
  width: 1410px;
  height: 30px;
  margin-left: 30px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #959595;
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
`;

const ContentBox = styled.div`
  margin-left: 30px;
  width: 1410px;
  height: 550px;
  padding: 10px;
  border: 1px solid #959595;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

const ContentTextarea = styled.div`
  font-family: 'Nanum Square Neo', sans-serif;
  width: 1390px;
  height: 450px;
  padding: 10px;
  font-size: 16px;
  border: none;
  overflow-y: auto;
  background-color: #ffffff;
  outline: none;
  word-wrap: break-word;
  margin-bottom: 5px;

  ${(props) =>
    props.isEmpty &&
    css`
      &::before {
        content: "내용을 입력해주세요.";
        color: #aaaaaa;
        font-family: 'Nanum Square Neo', sans-serif;
      }
    `}
`;

const FileAttachmentBox = styled.div`
  margin-top: 0px;
  padding: 10px;
  border: 1px solid #959595;
  background-color: #f9f9f9;
  font-family: 'Nanum Square Neo', sans-serif;
  width: 1390px;
  height: 55px;
  max-height: 60px; /* 특정 높이 이상일 때 스크롤 */
  overflow-y: auto; /* 세로 스크롤 활성화 */

  h4 {
    margin: 0;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const FileList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
`;

const FileItem = styled.li`
  font-size: 14px;
  margin-bottom: 4px;
`;

const FileLink = styled.a`
  color: #323232;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  color: #ff2828;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const ImageFileButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 30px;
  height: 40px;
`;

const ButtonStyles = css`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #959595;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Nanum Square Neo', sans-serif;
  position: relative;
`;

const ImageButton = styled.label`
  ${ButtonStyles}
`;

const FileButton = styled.label`
  ${ButtonStyles}
`;

const HiddenInput = styled.input`
  display: none;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 15px;

  ${(props) =>
    props.isAnnouncement &&
    css`
      /* 공지사항 페이지에서만 적용되는 스타일 */
      font-weight: bold;
      padding: 10px 20px;
      font-size: 14px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      margin-top: -50px;
      margin-right: -10px;
    `}
`;

const SubmitButton = styled.button`
  font-family: 'Nanum Square Neo', sans-serif;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #e8e8e8;
  color: #000000;
  border: 1px solid #8a8a8a;
`;

const CancelButton = styled.button`
  font-family: 'Nanum Square Neo', sans-serif;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #8a8a8a;
  margin-right: 25px;
`;

// 로딩 메시지 스타일
const LoadingMessage = styled.p`
  font-family: 'Nanum Square Neo', sans-serif;
  font-size: 14px;
  color: #555555;
  margin-left: 30px;
`;
