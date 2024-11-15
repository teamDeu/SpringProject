import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import WriteForm from '../../components/admin/WriteForm';

const Awrite = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="공지사항 추가" />
                <WriteForm
                    secondSelectOptions={['이벤트', '안내', '공지']}
                    cancelPath="/announcements" //취소 버튼 클릭시 공지사항으로 이동
                    showImageFileButtons={true}  // 사진과 파일 버튼 표시
                    isAnnouncementPage={true}
                />
            </div>
        </div>
    );
};

export default Awrite;
