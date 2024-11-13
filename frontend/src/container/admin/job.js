import React from 'react';
import Menu from '../../components/admin/Menu';


const Job = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>채용정보관리 페이지</h1>
            </div>
        </div>
    );
};

export default Job;
