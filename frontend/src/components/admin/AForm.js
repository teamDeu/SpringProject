import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddButton from "../../components/admin/AddButton";

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
  margin-left:-25px;
  margin-right: 20px;
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* 남은 공간을 차지 */
`;

const Category = styled.div`
  font-size: 14px;
  color: black;
  width: 70px; /* 고정된 너비 */
  text-align: left;
  margin-right: 10px; /* 카테고리와 타이틀 간 간격 */
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 14px;
  color: gray;
`;

const AForm = ({ 
  selectedType,
  selectedCategory,
  searchTerm,
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

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, type: "individual", category: "이벤트", title: "한글날 이벤트!", date: "2024.10.09" },
        { id: 2, type: "individual", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 3, type: "corporate", category: "공지", title: "서비스 오픈! 외국인 채용은 'Komate'", date: "2024.11.02" },
        { id: 4, type: "corporate", category: "안내", title: "구인구직 개인정보 처리방침 개정 내용 사전 안내", date: "2024.10.22" },
        { id: 5, type: "individual", category: "이벤트", title: "한글날 이벤트!", date: "2024.10.09" },
        { id: 6, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 7, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 8, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 9, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 10, type: "individual", category: "이벤트", title: "한글날 이벤트!", date: "2024.10.09" },
        { id: 11, type: "individual", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 12, type: "corporate", category: "공지", title: "서비스 오픈! 외국인 채용은 'Komate'", date: "2024.11.02" },
        { id: 13, type: "corporate", category: "안내", title: "구인구직 개인정보 처리방침 개정 내용 사전 안내", date: "2024.10.22" },
        { id: 14, type: "individual", category: "이벤트", title: "한글날 이벤트!", date: "2024.10.09" },
        { id: 15, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 16, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 17, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        { id: 18, type: "corporate", category: "공지", title: "SSAFY 청년 SW 아카데미 채용박람회 참여기업 모집", date: "2024.10.02" },
        // 더 많은 데이터를 추가할 수 있습니다.
      ];
      setAnnouncements(data);
    };

    fetchData();
  }, []);
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

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    const confirmDelete = window.confirm("선택한 항목을 삭제하시겠습니까?");
    if (confirmDelete) {
      setAnnouncements(announcements.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setSelectAll(false);
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
    const filteredAnnouncements = announcements.filter((item) => {
        const matchesType = selectedType === "all" || item.type === selectedType;
        const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesCategory && matchesSearch;
    });
  useEffect(() => {
    onTotalItemsChange(filteredAnnouncements.length);
  }, [filteredAnnouncements.length, onTotalItemsChange]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <AFormContainer>
      {!hideActions && (
        <ActionContainer>
          <Checkbox
            type="checkbox"
            checked={paginatedAnnouncements.every((item) => selectedItems.includes(item.id))}
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
              <Category>{`[${item.category}]`}</Category>
              <Title>{item.title}</Title>
            </ContentContainer>
            <Date>{item.date}</Date>
          </AnnouncementItem>
        ))}
      </AnnouncementList>
    </AFormContainer>
  );
};

export default AForm;
