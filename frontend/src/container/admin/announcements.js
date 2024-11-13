import React from 'react';
import Menu from '../../components/admin/Menu';


const Announcements = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>공지사항 페이지</h1>
            </div>
        </div>
    );
};

export default Announcements;
