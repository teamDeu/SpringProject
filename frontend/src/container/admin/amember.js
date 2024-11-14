import React from 'react';
import Menu from '../../components/admin/Menu';


const Amember = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>회원관리 페이지</h1>
            </div>
        </div>
    );
};

export default Amember;
