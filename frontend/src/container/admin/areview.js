import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";

const Areview = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="리뷰" />
                <div className="member-header">
                        <DropdownSelect
                        initialOptions={["회원ID", "작성일", "합격유무", "리뷰(기업명)", "첨부파일", "등록현황"]}
                        defaultOption="회원ID"
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

export default Areview;
