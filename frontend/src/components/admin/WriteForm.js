import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import DropdownSelect from "../../components/admin/Select";
import { GetFaqsByTarget, CreateFaq, DeleteFaq, CreateGFaq, GetNoticesByTarget, CreateNotice, DeleteNotice, CreateGNotice,GetNoticeIdByTitleAndTarget   } from "../../api/api"; // CreateGFaq 함수 추가

const WriteForm = ({
  type,
  firstSelectOptions, // 첫 번째 드롭다운 옵션 추가
  secondSelectOptions: initialSecondSelectOptions, // 변경: 두 번째 드롭다운 옵션 이름 변경
  cancelPath,
  showImageFileButtons,
  isAnnouncementPage,
  defaultOption,
  
}) => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const questionRef = useRef(null); // 질문 입력 필드 참조

  const [isTitleBold, setIsTitleBold] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isEmptyContent, setIsEmptyContent] = useState(true);

  const [memberType, setMemberType] = useState(defaultOption || "개인회원");
  const [secondSelectOptions, setSecondSelectOptions] = useState(initialSecondSelectOptions);
  const [selectedSecondOption, setSelectedSecondOption] = useState("");
  const [noticeOptions, setNoticeOptions] = useState([]);
  const [selectedNoticeOption, setSelectedNoticeOption] = useState("");
  const [isLoadingFaq, setIsLoadingFaq] = useState(false);
  const [isLoadingNotice, setIsLoadingNotice] = useState(false);

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (type === "faq") {
      const targetMap = {
        "개인회원": "개인_FAQ",
        "기업회원": "기업_FAQ",
      };
  
      const target = targetMap[memberType];
      const fetchFaqTitles = async () => {
        setIsLoadingFaq(true);
        try {
          const faqsData = await GetFaqsByTarget(target);
          setFaqs(faqsData);
          const titles = faqsData.map((faq) => faq.title);
          setSecondSelectOptions(titles);
          setSelectedSecondOption(titles.length > 0 ? titles[0] : "");
        } catch (error) {
          console.error("Error fetching FAQ titles:", error);
          setSecondSelectOptions([]);
          setSelectedSecondOption("");
        } finally {
          setIsLoadingFaq(false);
        }
      };
  
      fetchFaqTitles();
    }
  
    if (type === "notice") {
      const fetchNotices = async () => {
          setIsLoadingNotice(true);
          try {
              // memberType에 따라 API 호출 및 데이터 필터링
              const noticesData = await GetNoticesByTarget(memberType === "전체" ? "all" : memberType);
              const filteredNotices = noticesData.filter(notice => {
                  if (memberType === "전체") {
                      return notice.target === "전체";
                  }
                  return notice.target === memberType;
              });

              const titles = filteredNotices.map((notice) => notice.title);
              setNoticeOptions(titles);
              setSelectedNoticeOption(titles.length > 0 ? titles[0] : "");
          } catch (error) {
              console.error("Error fetching Notice titles:", error);
              setNoticeOptions([]);
              setSelectedNoticeOption("");
          } finally {
              setIsLoadingNotice(false);
          }
      };

      fetchNotices();
  }
  }, [memberType, type]);
  
  

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

        if (
          contentEditableDiv.contains(range.commonAncestorContainer) ||
          range.commonAncestorContainer === contentEditableDiv
        ) {
          range.deleteContents();
          const tempEl = document.createElement("div");
          tempEl.innerHTML = html;
          const frag = document.createDocumentFragment();

          let node;
          while ((node = tempEl.firstChild)) {
            frag.appendChild(node);
          }

          range.insertNode(frag);
          range.collapse(false);
        } else {
          contentEditableDiv.innerHTML += html;
        }
      }
    }
    handleContentInput();
  };

  const handleCancel = () => {
    navigate(cancelPath);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFileList((prevFiles) => [...prevFiles, { name: file.name, url: fileURL }]);
    }
  };

  const handleFileDelete = (fileName) => {
    setFileList((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  // 새로운 FAQ 제목을 추가하고 백엔드에 저장하는 함수
  const handleAddFaqOption = async (newTitle) => {
    const targetMap = {
      "개인회원": "개인_FAQ",
      "기업회원": "기업_FAQ",
    };
    const target = targetMap[memberType];

    try {
      const newFaq = { title: newTitle, target };
      const createdFaq = await CreateFaq(newFaq);
      console.log("Created new FAQ:", createdFaq);

      setSecondSelectOptions((prevOptions) => [...prevOptions, createdFaq.title]);
      setSelectedSecondOption(createdFaq.title);
      setFaqs((prevFaqs) => [...prevFaqs, createdFaq]); // 새 Faq 추가
    } catch (error) {
      console.error("Error creating new FAQ:", error);
      alert("새 FAQ를 추가하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 새로운 FAQ 제목을 삭제하고 백엔드에서 제거하는 함수
  const handleDeleteFaqOption = async (title) => {
    try {
      const faqsData = await GetFaqsByTarget(memberType === "개인회원" ? "개인_FAQ" : "기업_FAQ");
      const faqToDelete = faqsData.find(faq => faq.title === title);

      if (!faqToDelete) {
        alert("삭제할 FAQ를 찾을 수 없습니다.");
        return;
      }

      await DeleteFaq(faqToDelete.id);
      console.log(`Deleted FAQ with id: ${faqToDelete.id}`);

      setSecondSelectOptions((prevOptions) => prevOptions.filter(option => option !== title));
      setFaqs((prevFaqs) => prevFaqs.filter(faq => faq.title !== title));

      if (selectedSecondOption === title) {
        const newOptions = secondSelectOptions.filter(option => option !== title);
        const optionIndex = secondSelectOptions.indexOf(title);
        let newSelected = "";
        if (newOptions.length > 0) {
          if (optionIndex < newOptions.length) {
            newSelected = newOptions[optionIndex];
          } else {
            newSelected = newOptions[newOptions.length - 1];
          }
        }
        setSelectedSecondOption(newSelected);
    }
    

      alert("성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleSubmit = async () => {
    const question = questionRef.current.value.trim(); // 제목 입력값
    const content = contentRef.current.innerHTML.trim(); // 내용 입력값

    if (type === "notice") {
        if (!question || !content || !selectedNoticeOption) {
            alert("제목, 내용, 그리고 Notice를 모두 선택해주세요.");
            return;
        }

        try {
            // 선택된 Notice에 해당하는 ID 조회
            const noticeId = await GetNoticeIdByTitleAndTarget(selectedNoticeOption, memberType);

            if (!noticeId) {
                alert("선택된 Notice가 존재하지 않습니다.");
                return;
            }

            const newGNotice = {
              title: selectedNoticeOption.trim(),
              target: memberType.trim(),
              question: question,
              answer: content,
          };
          

            await CreateGNotice(newGNotice, noticeId); // GNotice 생성
            alert("공지사항이 성공적으로 등록되었습니다.");
            questionRef.current.value = "";
            contentRef.current.innerHTML = "";
            navigate('/notices');
        } catch (error) {
            console.error("Error creating GNotice:", error);
            alert("공지사항 생성에 실패했습니다.");
        }
    } else if (type === "faq") {
        // FAQ 등록 로직
        const selectedFaq = faqs.find(faq => faq.title === selectedSecondOption);
        if (!selectedFaq) {
            alert("선택된 FAQ를 찾을 수 없습니다.");
            return;
        }

        const faqId = selectedFaq.id;
        try {
            const gFaq = { question, answer: content };
            await CreateGFaq(faqId, gFaq);
            alert("FAQ가 성공적으로 등록되었습니다.");
            questionRef.current.value = "";
            contentRef.current.innerHTML = "";
            navigate('/faq');
        } catch (error) {
            console.error("Error creating GFaq:", error);
            alert("Faq 생성에 실패했습니다.");
        }
    }
};




// 새로운 Notice 제목을 추가 및 DB에 저장
const handleAddNoticeOption = async (newTitle) => {
  try {
      const newNotice = { title: newTitle, target: memberType };
      const createdNotice = await CreateNotice(newNotice);
      console.log("Created new Notice:", createdNotice);

      setNoticeOptions((prevOptions) => [...prevOptions, createdNotice.title]);
      setSelectedNoticeOption(createdNotice.title);
  } catch (error) {
      console.error("Error creating new Notice:", error);
      alert("새 Notice를 추가하는 데 실패했습니다. 다시 시도해주세요.");
  }
};

// Notice 제목 삭제
const handleDeleteNoticeOption = async (title) => {
  try {
      // 선택된 Notice 찾기
      const noticesData = await GetNoticesByTarget(memberType === "전체" ? "all" : memberType);
      const noticeToDelete = noticesData.find(notice => notice.title === title);

      if (!noticeToDelete) {
          alert("삭제할 Notice를 찾을 수 없습니다.");
          return;
      }

      // DB에서 삭제 요청
      await DeleteNotice(noticeToDelete.id);
      console.log(`Deleted Notice with id: ${noticeToDelete.id}`);

      // UI 업데이트
      setNoticeOptions((prevOptions) => prevOptions.filter(option => option !== title));
      if (selectedNoticeOption === title) {
          const newOptions = noticeOptions.filter(option => option !== title);
          const optionIndex = noticeOptions.indexOf(title);
          let newSelected = "";
          if (newOptions.length > 0) {
              if (optionIndex < newOptions.length) {
                  newSelected = newOptions[optionIndex];
              } else {
                  newSelected = newOptions[newOptions.length - 1];
              }
          }
          setSelectedNoticeOption(newSelected);
      }

      alert("성공적으로 삭제되었습니다.");
  } catch (error) {
      console.error("Error deleting Notice:", error);
      alert("삭제에 실패했습니다.");
  }
};

  return (
    <Container>
      <Header>
        {/* 첫 번째 DropdownSelect: 회원 타입 선택 */}
        <DropdownSelect
          initialOptions={firstSelectOptions}
          defaultOption={memberType}
          onChange={(selectedOption) => setMemberType(selectedOption)}
          showPlusButton={false}
          showDeleteButton={false}
        />
        {/* 두 번째 DropdownSelect: FAQ 타이틀 선택 */}
        <DropdownSelect
            initialOptions={type === "notice" ? noticeOptions : secondSelectOptions}
            defaultOption={type === "notice" ? selectedNoticeOption : selectedSecondOption}
            onChange={(selectedOption) => {
                if (type === "notice") {
                    setSelectedNoticeOption(selectedOption);
                } else {
                    setSelectedSecondOption(selectedOption);
                }
            }}
            showPlusButton={true}
            showDeleteButton={true}
            width="1270px"
            margin="0 0 0 32px"
            onAddOption={type === "notice" ? handleAddNoticeOption : handleAddFaqOption}
            onDeleteOption={type === "notice" ? handleDeleteNoticeOption : handleDeleteFaqOption}
        />



      </Header>

      {/* 질문 또는 제목 입력 필드 */}
      <TitleInput
          type="text"
          placeholder={type === "notice" ? "제목을 입력해주세요." : "질문을 입력해주세요."} // type에 따라 placeholder 변경
          isBold={isTitleBold}
          onChange={handleTitleChange}
          ref={questionRef} // ref 추가
      />


      <ContentBox>
        {/* 답변 입력 필드 */}
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
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonsContainer>

      {isLoadingFaq && <LoadingMessage>FAQ 타이틀을 불러오는 중...</LoadingMessage>}
      {isLoadingNotice && <LoadingMessage>공지사항 타이틀을 불러오는 중...</LoadingMessage>}

    </Container>
  );
};

export default WriteForm;

/* Styled Components (변경 없음) */

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
  max-height: 60px;
  overflow-y: auto;

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
