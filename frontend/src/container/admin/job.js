import React, { useState, useEffect } from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";
import SearchBar from "../../components/admin/SearchBar"; 
import "./job.css";

const Job = () => {
    const [jobData, setJobData] = useState([
        { name: "(주)퓨ㄴ전정보기술", type: "자동차 설계", title: "전기전자 H/W, F/W 설계, 개발 신입/경력 채용", country: "경기 전체", deadline: "~11.23(토)" },
        { name: "(주)퓨전정보기술", type: "자동차 설계", title: "전기전자 H/W, F/W 설계, 개발 신입/경력 채용", country: "서울", deadline: "~11.23(토)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
        { name: "ABC기업", type: "IT 개발", title: "백엔드 개발자 경력 채용", country: "부산", deadline: "~12.01(금)" },
    ]);

    const [filteredData, setFilteredData] = useState(jobData); // 필터링된 데이터를 표시
    const [searchQuery, setSearchQuery] = useState(''); // 검색어
    const [selectedFilter, setSelectedFilter] = useState('전체'); // 선택된 필터 옵션

    // '전체' 선택 시 모든 데이터 표시
    useEffect(() => {
        if (selectedFilter === "전체") {
            setFilteredData(jobData);
        }
    }, [selectedFilter, jobData]);

    // 검색어 입력 시 호출
    const handleSearch = () => {
        if (selectedFilter === "전체") {
            setFilteredData(jobData);
            return;
        }

        const filtered = jobData.filter((job) => {
            const targetField = selectedFilter === "기업명"
                ? job.name
                : selectedFilter === "업종"
                ? job.type
                : selectedFilter === "공고 제목"
                ? job.title
                : selectedFilter === "지역"
                ? job.country
                : job.deadline;

            return targetField.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setFilteredData(filtered); // 필터링된 데이터를 업데이트
    };

    // 행 삭제 함수
    const handleDelete = (index) => {
        const confirmDelete = window.confirm("해당 공고를 삭제하시겠습니까?");
        if (confirmDelete) {
            const updatedData = jobData.filter((_, i) => i !== index); // 해당 인덱스의 행 제외
            setJobData(updatedData);
            setFilteredData(updatedData); // 필터링된 데이터도 업데이트
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="채용정보 관리" />
                <div className="member-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <DropdownSelect
                        initialOptions={["전체", "기업명", "업종", "공고 제목", "지역", "마감일"]}
                        defaultOption="전체"
                        onChange={(selectedOption) => setSelectedFilter(selectedOption)} // 선택된 옵션 업데이트
                        showPlusButton={false}
                        showDeleteButton={false}
                    />
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery} // 검색어 업데이트
                        onSearch={handleSearch} // 검색 동작 호출
                    />
                </div>
                <div className="job-table-container">
                    <table className="job-table">
                        <thead>
                            <tr>
                                <th>기업명</th>
                                <th>업종</th>
                                <th>공고 제목</th>
                                <th>지역</th>
                                <th>마감일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((job, index) => (
                                <tr key={index}>
                                    <td>{job.name}</td>
                                    <td>{job.type}</td>
                                    <td>{job.title}</td>
                                    <td>{job.country}</td>
                                    <td>{job.deadline}</td>
                                    <td>
                                        <button
                                            className="delete2-button"
                                            onClick={() => handleDelete(index)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Job;
