import React from 'react';
import Menu from '../../components/admin/Menu';
import PageHeader from '../../components/admin/PageHeader';


const Amember = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="회원 관리" />
            </div>
        </div>
    );
};

export default Amember;
