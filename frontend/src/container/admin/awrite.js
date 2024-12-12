import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import WriteForm from '../../components/admin/WriteForm';

const Awrite = () => {
    const firstDropdownOptions = ["전체", "개인회원", "기업회원"];

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="공지사항 추가" />
                <WriteForm
                    type="notice" // 공지사항 유형 전달
                    firstSelectOptions={firstDropdownOptions}
                    cancelPath="/notices"
                    defaultOption="전체"
                    showImageFileButtons={true}
                    />

            </div>
        </div>
    );
};

export default Awrite;
