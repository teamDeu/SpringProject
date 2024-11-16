import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";


const Job = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="채용정보 관리" />
                <div className="member-header">
                    <DropdownSelect
                    initialOptions={["기업이름", "업종", "공고 제목", "지역", "마감일"]}
                    defaultOption="기업이름"
                    onChange={(selectedOption) =>
                        console.log("Selected member type:", selectedOption)
                    }
                    showPlusButton={false}
                    showDeleteButton={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Job;
