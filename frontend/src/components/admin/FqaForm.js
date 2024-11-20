// FaqForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import AddButton from '../../components/admin/AddButton';

const FAQContainer = styled.div`
  width: 101%;
  padding: 20px;
  font-family: 'Nanum Square Neo', sans-serif;
`;

const FAQSection = styled.div`
  margin-bottom: 40px;
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
  transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

const Answer = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  white-space : pre;
  word-wrap : break-word;
  

`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;    
  color: #333;
  margin-bottom: 5px;
  margin-left: -25px;
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
    content: '';
    position: absolute;
    bottom: -10px; /* 선의 위치 */
    left: -25px;
    width: 1400px;
    height: 1px;
    background-color: #ccc; /* 선의 색상 */
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
  font-family: 'Nanum Square Neo', sans-serif;
`;

const AddLabel = styled.span`
  font-family: 'Nanum Square Neo', sans-serif;
  font-weight: bold;
`;

const AddButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: -15px;
`;

const FAQForm = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [faqData, setFaqData] = useState([
    {
      id: 1,
      question: '[가이드] 이력서 등록 방법 part1',
      answer: `
은효 등록 시 이력서 양식은 "필수" 항목과 "추가" 항목으로 나뉘어져 있습니다.
추가로 이력서는 PDF파일로 작성해야 합니다.

Part1에서는 이력서 등록 "필수" 항목 작성하는 방법을 알아보겠습니다.

필수 항목은 이력서 등록 시 반드시 작성해야 되는 항목으로 작성하지 않을 경우 미완성 이력서로 저장됩니다.
"추가" 항목은 이력서 등록 시 작성을 원하는 항목을 선택해서 생성 및 작성이 가능한 항목들입니다.
항목 순서 변경도 가능합니다.

- 필수항목(5): 기본정보, 학력사항, 경력사항, 희망 근무조건
- 추가항목(8): MY Career, 스킬, 경험/활동/교육, 자격/어학/수상, 포트폴리오 및 기타문서, 경력기술서, 자기소개서, 사람인.적성검사, 취업우대사항

"자기소개서"는 "추가항목" 이지만 인사담당자가 중요하게 생각하는 항목중 하나로 가능하면 반드시 작성하는 것을 권장드립니다.,
    `},
    { id: 2, question: '[가이드] 이력서 등록 방법 part2', answer: '이력서 등록에 전화를 입력하세요.' },
    { id: 3, question: '최대 등록할 수 있는 이력서 개수', answer: '최대 등록가능한 이력서 개수는 5개입니다.' },
    { id: 4, question: '이력서 삭제 방법', answer: '이력서의 삭제 방법은 단순하며, 반드시 입력 및 삭제 이후 확인해야 합니다.' },
  ]);
  const [userFaqData, setUserFaqData] = useState([
    { id: 5, question: '아이디를 잊어버렸습니다. 어떻게 찾나요?', answer: '아이디 찾기는 로그인 화면에서 "아이디 찾기"를 클릭하시면 됩니다.' },
    { id: 6, question: '비밀번호를 변경하고 싶습니다.', answer: '비밀번호 변경은 회원정보 수정 페이지에서 가능합니다.' },
    { id: 7, question: '회원 탈퇴는 어떻게 하나요?', answer: '회원 탈퇴는 고객센터를 통해 신청하실 수 있습니다.' },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleToggle = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      setFaqData((prevData) => prevData.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(faqData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <FAQContainer>
      <ActionContainer>
        <Checkbox type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        <AddButtonWrapper>
          <AddButton to="/faqwrite" iconSrc="/icons/plusbtn.png" altText="Plus Button">
            <AddLabel>추가</AddLabel>
          </AddButton>
        </AddButtonWrapper>
      </ActionContainer>
      <FAQSection>
        <SectionTitle>이력서 등록/관리 자주 묻는 질문</SectionTitle>
        {faqData.map((item, index) => (
          <FAQItem key={item.id}>
            <QuestionContainer>
              <Checkbox
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <Question>
                Q. {item.question}
                <Icon
                  src="/icons/sbtn.png"
                  expanded={expandedIndexes.includes(index)}
                  onClick={() => handleToggle(index)}
                />
              </Question>
            </QuestionContainer>
            {expandedIndexes.includes(index) && <Answer>{item.answer}</Answer>}
          </FAQItem>
          
        ))}
      </FAQSection>
      <FAQSection>
        <SectionTitle>회원정보 / 아이디 / 비밀번호 자주 묻는 질문</SectionTitle>
        {userFaqData.map((item, index) => (
          <FAQItem key={item.id}>
            <QuestionContainer>
              <Checkbox
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <Question>
                Q. {item.question}
                <Icon
                  src="/icons/sbtn.png"
                  expanded={expandedIndexes.includes(index + faqData.length)}
                  onClick={() => handleToggle(index + faqData.length)}
                />
              </Question>
            </QuestionContainer>
            {expandedIndexes.includes(index + faqData.length) && <Answer>{item.answer}</Answer>}
          </FAQItem>
        ))}
      </FAQSection>
    </FAQContainer>
  );
};

export default FAQForm;
