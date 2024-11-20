import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddButton from "../../components/admin/AddButton";

const FAQContainer = styled.div`
  width: 101%;
  padding: 20px;
  font-family: "Nanum Square Neo", sans-serif;
`;

const FAQSection = styled.div`
  margin-bottom: 40px;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  width: 100%;
  margin: 0 auto;
  margin-left: ${(props) => (props.customMarginLeft ? props.customMarginLeft : '0')}; /* margin-left 조건부 적용 */
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  flex: 1;
`;

const Icon = styled.img`
  margin-left: auto;
  margin-right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0)")};
`;

const Answer = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  white-space: pre;
  word-wrap: break-word;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  margin-left: -25px;
  margin-top: 40px; 
`;

const Checkbox = styled.input`
  margin-right: 20px;
  margin-left: -25px;
  width: 17px;
  height: 17px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -25px;
    width: 102%;
    height: 1px;
    background-color: black;
  }
`;

const DeleteButton = styled.button`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-left: -25px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Nanum Square Neo", sans-serif;
`;

const AddLabel = styled.span`
  font-family: "Nanum Square Neo", sans-serif;
  font-weight: bold;
`;

const AddButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: -15px;
`;

const FAQForm = ({ selectedType, hideControls = false, customStyles = {}, searchTerm = "", resetToggleState = false }) => {
  const [faqData, setFaqData] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Update FAQ data based on the selectedType prop
  useEffect(() => {
    if (resetToggleState) {
      setExpandedIndexes([]); // 검색 시 토글 상태 초기화
    }
    if (selectedType === "individual") {
      setFaqData([
        {
          title: "이력서 등록/관리 자주 묻는 질문",
          questions: [
            {
              id: 1,
              question: "[가이드] 이력서 등록 방법 part1",
              answer: `이력서를 작성할 때 반드시 필요한 정보를 입력해야 합니다.`,
            },
            {
              id: 2,
              question: "[가이드] 이력서 등록 방법 part2",
              answer: "이력서 작성 후 저장 방법에 대해 설명합니다.",
            },
          ],
        },
        {
          title: "회원정보/아이디/비밀번호 자주 묻는 질문",
          questions: [
            {
              id: 3,
              question: "[가이드] 면접 준비 팁",
              answer: `면접 준비를 위한 간단한 팁을 제공합니다. \n- 정장 준비\n- 예상 질문 준비\n- 회사 정보 파악`,
            },
            {
              id: 4,
              question: "이력서 수정 가능 여부",
              answer: "등록한 이력서는 언제든지 수정할 수 있습니다.",
            },
          ],
        },
        {
          title: "면접 준비 팁",
          questions: [
            {
              id: 5,
              question: "[가이드] 면접 준비 팁",
              answer: `면접 준비를 위한 간단한 팁을 제공합니다. \n- 정장 준비\n- 예상 질문 준비\n- 회사 정보 파악`,
            },
            {
              id: 6,
              question: "이력서 수정 가능 여부",
              answer: "등록한 이력서는 언제든지 수정할 수 있습니다.",
            },
          ],
        },
      ]);
    } else {
      setFaqData([
        {
          title: "기업회원 가입 및 계정 관리",
          questions: [
            {
              id: 1,
              question: "기업회원 등록 절차",
              answer: "기업회원 가입 절차에 대해 설명합니다.",
            },
            {
              id: 2,
              question: "기업회원 계정 관리",
              answer: "계정 관리 방법과 주의사항입니다.",
            },
          ],
        },
        {
          title: "채용 공고 및 지원자 관리",
          questions: [
            {
              id: 3,
              question: "채용 공고 등록 방법",
              answer: `채용 공고는 아래 단계를 따라 등록할 수 있습니다.\n1. 로그인 후 대시보드 이동\n2. '공고 등록' 버튼 클릭\n3. 필수 정보 입력 후 저장`,
            },
            {
              id: 4,
              question: "지원자 관리 기능",
              answer: "기업회원은 지원자 관리 기능을 통해 면접 일정 및 결과를 효율적으로 관리할 수 있습니다.",
            },
          ],
        },
        {
          title: "기업 FAQ",
          questions: [
            {
              id: 5,
              question: "채용 공고 등록 방법",
              answer: `채용 공고는 아래 단계를 따라 등록할 수 있습니다.\n1. 로그인 후 대시보드 이동\n2. '공고 등록' 버튼 클릭\n3. 필수 정보 입력 후 저장`,
            },
            {
              id: 6,
              question: "지원자 관리 기능",
              answer: "기업회원은 지원자 관리 기능을 통해 면접 일정 및 결과를 효율적으로 관리할 수 있습니다.",
            },
          ],
        },
      ]);
    }
    setExpandedIndexes([]); // Reset expanded items on type change
    setSelectedItems([]); // Reset selected items on type change
    setSelectAll(false); // Reset select all on type change
  }, [selectedType, resetToggleState]);
  

  const handleToggle = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // 선택 해제
        : [...prevSelected, id] // 선택 추가
    );
  };
  

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedData = faqData.map((group) => ({
        ...group,
        questions: group.questions.filter((item) => !selectedItems.includes(item.id)),
      }));
      setFaqData(updatedData);
      setSelectedItems([]);
      setSelectAll(false);
    }
  };
  
  const handleSelectAll = () => {
    if (selectAll) {
      // 선택 해제
      setSelectedItems([]); // 모든 선택 해제
    } else {
      // 모든 항목 선택
      const allIds = faqData.flatMap((group) => group.questions.map((item) => item.id));
      setSelectedItems(allIds); // 모든 질문의 ID 추가
    }
    setSelectAll(!selectAll); // 선택 상태 토글
  };

  // 검색된 데이터 필터링
  const filteredFaqData = faqData
    .map((group) => ({
      ...group,
      questions: group.questions.filter(
        (item) =>
          group.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Title 검색
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || // Question 검색
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()) // Answer 검색
      ),
    }))
    .filter((group) => group.questions.length > 0); // 질문이 있는 그룹만 유지

  return (
    <FAQContainer>
      {!hideControls && (
        <ActionContainer>
          <Checkbox
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <AddButtonWrapper>
            <AddButton to="/faqwrite" iconSrc="/icons/plusbtn.png" altText="Plus Button">
              <AddLabel>추가</AddLabel>
            </AddButton>
          </AddButtonWrapper>
        </ActionContainer>
      )}
      <FAQSection>
        {filteredFaqData.map((group, groupIndex) => (
          <div key={groupIndex}>
            <SectionTitle>{group.title}</SectionTitle>
            {group.questions.map((item) => (
              <FAQItem key={item.id} customMarginLeft={customStyles.marginLeft}>
                <QuestionContainer>
                {!hideControls && ( // 체크박스 렌더링 제어
                    <Checkbox
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  )}
                  <Question>
                    Q. {item.question}
                    <Icon
                      src="/icons/sbtn.png"
                      expanded={expandedIndexes.includes(item.id)}
                      onClick={() => handleToggle(item.id)}
                    />
                  </Question>
                </QuestionContainer>
                {expandedIndexes.includes(item.id) && <Answer>{item.answer}</Answer>}
              </FAQItem>
            ))}
          </div>
        ))}
      </FAQSection>
    </FAQContainer>
  );
  
};

export default FAQForm;
