// FAQForm.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetGFaqsByTarget, DeleteGFaqs } from "../../api/api"; // 수정된 API 호출 함수
import AddButton from "../../components/admin/AddButton"; // 추가 버튼 컴포넌트

const FAQContainer = styled.div`
  width: 100%;
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
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Checkbox = styled.input`
  margin-right: 20px;
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
    left: 0;
    width: 100%;
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
`;

const FAQForm = ({ selectedType, hideControls = false, searchTerm = "" }) => {
  const [faqData, setFaqData] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch GFaqs data based on selectedType
  useEffect(() => {
    const fetchGFaqsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const target = selectedType === "individual" ? "개인_FAQ" : "기업_FAQ";
        console.log(`Fetching GFaqs for target: ${target}`);
        const data = await GetGFaqsByTarget(target); // API 호출
        console.log("Fetched data:", data); // 데이터 확인

        if (!Array.isArray(data)) {
          throw new Error("Fetched data is not an array");
        }

        const groupedData = groupByTitle(data); // 데이터 그룹화
        console.log("Grouped data:", groupedData); // 그룹화된 데이터 확인
        setFaqData(groupedData);
      } catch (error) {
        console.error("Error fetching GFaqs data:", error);
        setError("FAQ 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedType) {
      fetchGFaqsData();
    }
  }, [selectedType]);

  // Group GFaqs by Faq title
  const groupByTitle = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (item.faq && item.faq.title) {
        if (!grouped[item.faq.title]) {
          grouped[item.faq.title] = [];
        }
        grouped[item.faq.title].push(item);
      } else {
        console.warn("Invalid item format:", item);
      }
    });
    return Object.entries(grouped).map(([title, questions]) => ({ title, questions }));
  };

  const handleToggle = (id) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(id)
        ? prevIndexes.filter((i) => i !== id)
        : [...prevIndexes, id]
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await DeleteGFaqs(selectedItems); // API 호출하여 삭제
        console.log("Deleted items:", selectedItems);

        // 삭제가 성공하면 UI에서 항목 제거
        const updatedData = faqData.map((group) => ({
          ...group,
          questions: group.questions.filter((item) => !selectedItems.includes(item.id)),
        }));
        setFaqData(updatedData.filter((group) => group.questions.length > 0)); // 질문 없는 그룹 제거
        setSelectedItems([]);
        setSelectAll(false);
        alert("선택된 항목이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting GFaqs:", error);
        alert("FAQ 삭제 중 오류가 발생했습니다.");
      }
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

  // Filter GFaqs data by search term
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

  if (error) {
    return <FAQContainer>{error}</FAQContainer>;
  }

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
                      alt="Toggle Icon"
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
