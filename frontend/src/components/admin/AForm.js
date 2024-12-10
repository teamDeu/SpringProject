// AForm.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddButton from "../../components/admin/AddButton";
import { GetGNoticesByTarget, DeleteGNotice } from "../../api/api"; // API 함수 임포트

const AFormContainer = styled.div`
  margin-left: 5px;
  width: 101%;
  font-family: "Nanum Square Neo", sans-serif;
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

const Checkbox = styled.input`
  margin-right: 20px;
  margin-left: -25px;
  width: 17px;
  height: 17px;
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

const AddButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: -15px;
`;

const AddLabel = styled.span`
  font-family: "Nanum Square Neo", sans-serif;
  font-weight: bold;
`;

const AnnouncementList = styled.div`
  margin-top: -10px;
`;

const AnnouncementItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const ItemCheckbox = styled.input`
  margin-left: -25px;
  margin-right: 20px;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row; /* 세로에서 가로로 변경 */
  flex: 1; /* 남은 공간을 차지 */
  align-items: center; /* 수직 가운데 정렬 */
  gap: 10px; /* 요소 간 간격 추가 */
`;

const Title = styled.div`
  font-size: 14px; /* 작게 변경 */
  color: #555; /* 회색으로 변경 */
`;

const Question = styled.div`
  font-size: 16px; /* 크게 변경 */
  font-weight: bold; /* 굵게 변경 */
`;

const DateStyled = styled.div`
  font-size: 14px;
  color: gray;
`;

const AForm = ({
  selectedType,
  selectedCategory = "전체",
  searchTerm = "",
  currentPage,
  itemsPerPage,
  onTotalItemsChange,
  resetSelections,
  setResetSelections,
  hideActions,
}) => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 기본값을 true로 설정

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data = await GetGNoticesByTarget(selectedType);
        console.log('GNotices Data:', data); // API 응답 데이터 확인
        setAnnouncements(data || []);
      } catch (error) {
        console.error("Error fetching GNotices:", error);
        alert("공지사항을 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
      setLoading(false); // 로딩 종료
    };

    fetchData();
  }, [selectedType]);

  useEffect(() => {
    if (resetSelections) {
      setSelectedItems([]); // 선택된 항목 초기화
      setSelectAll(false); // 전체 선택 초기화
      setResetSelections(false); // 초기화 상태를 다시 false로 설정
    }
  }, [resetSelections, setResetSelections]);

  const handleSelectAll = () => {
    const currentPageIds = paginatedAnnouncements.map((item) => item.id); // 현재 페이지의 ID 가져오기

    if (selectAll) {
      // 선택 해제: 현재 페이지의 ID만 제거
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      // 선택 추가: 현재 페이지의 ID만 추가
      setSelectedItems((prevSelected) => [...new Set([...prevSelected, ...currentPageIds])]);
    }

    setSelectAll(!selectAll);
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    const confirmDelete = window.confirm("선택한 항목을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        // 선택된 항목을 모두 삭제
        await Promise.all(selectedItems.map(id => DeleteGNotice(id)));
        // 삭제 후 상태 업데이트
        const updatedAnnouncements = announcements.filter((item) => !selectedItems.includes(item.id));
        setAnnouncements(updatedAnnouncements);
        setSelectedItems([]);
        setSelectAll(false);
        // onTotalItemsChange는 useEffect에서 자동으로 처리됩니다.
        alert("선택한 항목이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting GNotices:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleItemCheckbox = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // 필터링 로직: 선택된 타입, 카테고리, 검색어를 기반으로 필터링
  const typeMapping = {
    "all": "전체",
    "individual": "개인회원",
    "corporate": "기업회원"
  };
  const targetType = typeMapping[selectedType] || "전체";

  const filteredAnnouncements = (announcements || []).filter((item) => {
    const matchesType = selectedType === "all" ? item.target === "전체" : item.target === targetType;
    const matchesCategory = selectedCategory === "전체" || (item.notice && item.notice.title === selectedCategory);
    const matchesSearch = (item.title || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  // 페이지네이션 처리
  useEffect(() => {
    onTotalItemsChange(filteredAnnouncements.length); // filteredAnnouncements의 길이를 페이지 처리에 반영
  }, [filteredAnnouncements.length, onTotalItemsChange]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);

  return (
    <AFormContainer>
      {!hideActions && (
        <ActionContainer>
          <Checkbox
            type="checkbox"
            checked={paginatedAnnouncements.length > 0 && paginatedAnnouncements.every((item) => selectedItems.includes(item.id))}
            onChange={handleSelectAll}
          />
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          <AddButtonWrapper>
            <AddButton to="/awrite" iconSrc="/icons/plusbtn.png" altText="Add Button">
              <AddLabel>추가</AddLabel>
            </AddButton>
          </AddButtonWrapper>
        </ActionContainer>
      )}

      {loading ? (
        <div></div>
      ) : (
        paginatedAnnouncements.length > 0 && (
          <AnnouncementList>
            {paginatedAnnouncements.map((item) => (
              <AnnouncementItem key={item.id}>
                {!hideActions && (
                  <ItemCheckbox
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemCheckbox(item.id)}
                  />
                )}
                <ContentContainer>
                  <Title>[{item.title}]</Title>
                  <Question>{item.question}</Question>
                </ContentContainer>
                <DateStyled>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</DateStyled>
              </AnnouncementItem>
            ))}
          </AnnouncementList>
        )
      )}
    </AFormContainer>
  );
};

export default AForm;
