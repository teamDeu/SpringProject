import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';
import WriteForm from '../../components/admin/WriteForm';

const Awrite = () => {
    // 첫 번째 드롭다운 옵션 (전체, 개인회원, 기업회원)
    const firstDropdownOptions = ["전체", "개인회원", "기업회원"];

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="FAQ 추가" />
                <WriteForm
                    firstSelectOptions={firstDropdownOptions} // 첫 번째 드롭다운 옵션 전달
                    secondSelectOptions={['이력서 등록 / 관리', '회원정보 / 아이디 / 비밀번호', '입사지원 / 관리']}
                    cancelPath="/notces.js" // 취소 버튼 클릭 시 FAQ 페이지로 이동
                    defaultOption="전체" // "전체"를 기본 옵션으로 설정
                />
            </div>
        </div>
    );
};

export default Awrite;
