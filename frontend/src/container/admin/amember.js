import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import DropdownSelect from "../../components/admin/Select";
import "./amember.css";
const Amember = () => {
    return (
<div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="회원 관리" />
                <div className="member-header">
                    <DropdownSelect
                    initialOptions={["회원ID", "회원구분", "비밀번호", "이름", "생년월일", "전화번호"]}
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

export default Amember;

