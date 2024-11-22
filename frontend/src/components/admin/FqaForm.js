import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetFAQsByTarget } from "../../api/api"; // API 호출 함수
import AddButton from "../../components/admin/AddButton"; // 추가 버튼 컴포넌트

const FAQContainer = styled.div`
  width: 101%;
  padding: 20px;
  font-family: "Nanum Square Neo", sans-serif;
`;

const FAQSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  margin-top: 30px;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  width: 100%;
  margin: 0 auto;
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

const FAQForm = ({ selectedType, hideControls = false, searchTerm = "" }) => {
  const [faqData, setFaqData] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch FAQ data based on selectedType
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const target = selectedType === "individual" ? "개인_FAQ" : "기업_FAQ";
        const data = await GetFAQsByTarget(target); // API 호출
        const groupedData = groupByTitle(data); // 데이터 그룹화
        setFaqData(groupedData);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQData();
  }, [selectedType]);

  // Group FAQs by title
  const groupByTitle = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.title]) {
        grouped[item.title] = [];
      }
      grouped[item.title].push(item);
    });
    return Object.entries(grouped).map(([title, questions]) => ({ title, questions }));
  };

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
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
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
      setFaqData(updatedData.filter((group) => group.questions.length > 0)); // 질문 없는 그룹 제거
      setSelectedItems([]);
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIds = faqData.flatMap((group) => group.questions.map((item) => item.id));
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  // Filter FAQ data by search term
  const filterBySearchTerm = (data) => {
    if (!searchTerm) return data; // 검색어가 없으면 원본 데이터 반환
    return data
      .map((group) => ({
        ...group,
        questions: group.questions.filter(
          (item) =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.questions.length > 0); // 질문 없는 그룹 제거
  };

  const filteredData = filterBySearchTerm(faqData);

  return (
    <FAQContainer>
      {!hideControls && (
        <ActionContainer>
          <Checkbox type="checkbox" checked={selectAll} onChange={handleSelectAll} />
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <AddButtonWrapper>
            <AddButton to="/faqwrite" iconSrc="/icons/plusbtn.png" altText="Plus Button">
              <AddLabel>추가</AddLabel>
            </AddButton>
          </AddButtonWrapper>
        </ActionContainer>
      )}
      <FAQSection>
        {filteredData.map((group, groupIndex) => (
          <div key={groupIndex}>
            <SectionTitle>{group.title}</SectionTitle>
            {group.questions.map((item) => (
              <FAQItem key={item.id}>
                <QuestionContainer>
                  {!hideControls && (
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
