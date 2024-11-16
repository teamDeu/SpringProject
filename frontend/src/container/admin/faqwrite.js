import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import WriteForm from '../../components/admin/WriteForm';

const Faqwrite = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="FAQ 추가" />
                <WriteForm
                    secondSelectOptions={['이력서 등록 / 관리', '회원정보 / 아이디 / 비밀번호', '입사지원 / 관리']}
                    cancelPath="/faq" //취소버튼 클릭시 faq로 이동
                    
                />
            </div>
        </div>
    );
};

export default Faqwrite;
