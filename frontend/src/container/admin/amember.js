import React, { useState, useEffect } from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar"; 
import "./amember.css";

const Amember = () => {
    const [memberData] = useState([
        { id: 1234, type: "개인", password: "*****", name: "김세쁑", dob: "2001.12.11", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "칸쵸", dob: "2001.12.11", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "버터와플", dob: "2001.12.11", phone: "010-1234-1234" },
        { id: 4567, type: "기업", password: "*****", name: "파인애플", dob: "1900.10.01", phone: "010-4567-4567" },
        { id: 1234, type: "개인", password: "*****", name: "토끼", dob: "2001.01.12", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "바닐라", dob: "2001.04.10", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "다람쥐", dob: "2001.04.15", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "바구뇨", dob: "2001.04.19", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "바구니", dob: "2001.05.18", phone: "010-1234-1234" },
        { id: 1234, type: "개인", password: "*****", name: "포차코", dob: "2001.0.18", phone: "010-1234-1234" },
    ]);

    const [filteredData, setFilteredData] = useState(memberData); // 필터링된 데이터를 관리
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
    const [selectedFilter, setSelectedFilter] = useState('전체'); // 선택된 필터 옵션

    // '전체' 선택 시 모든 데이터 표시
    useEffect(() => {
        if (selectedFilter === "전체") {
                        setFilteredData(memberData);
        }
    }, [selectedFilter, memberData]);

    // 검색어와 필터 조건으로 데이터 필터링
    const handleSearch = () => {
        if (selectedFilter === "전체") {
            // 전체를 선택한 경우, 모든 데이터를 표시
            setFilteredData(memberData);
            return;
        }
        const filtered = memberData.filter((member) => {
            const targetField = selectedFilter === "회원ID"
                ? member.id.toString() // 숫자를 문자열로 변환
                : selectedFilter === "회원구분"
                ? member.type
                : selectedFilter === "비밀번호"
                ? member.password
                : selectedFilter === "이름"
                ? member.name
                : selectedFilter === "생년월일"
                ? member.dob
                : member.phone;

            return targetField.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredData(filtered);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="회원 관리" />
                <div className="member-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <DropdownSelect
                        initialOptions={["전체","회원ID", "회원구분", "비밀번호", "이름", "생년월일", "전화번호"]}
                        defaultOption="전체"
                        onChange={(selectedOption) => setSelectedFilter(selectedOption)} // 선택된 필터 옵션 업데이트
                        showPlusButton={false}
                        showDeleteButton={false}
                    />
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery} // 검색어 상태 업데이트
                        onSearch={handleSearch} // 검색 동작 호출
                    />
                </div>
                <div className="member-table-container">
                    <table className="member-table">
                        <thead>
                            <tr>
                                <th>회원 ID</th>
                                <th>회원 구분</th>
                                <th>비밀번호</th>
                                <th>이름</th>
                                <th>생년월일</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((member, index) => (
                                <tr key={index}>
                                    <td>{member.id}</td>
                                    <td>{member.type}</td>
                                    <td>{member.password}</td>
                                    <td>{member.name}</td>
                                    <td>{member.dob}</td>
                                    <td>{member.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Amember;
