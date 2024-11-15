import React from 'react';
import Menu from '../../components/admin/Menu';
import './announcements.css';
import PageHeader from '../../components/admin/PageHeader';
import { Link } from 'react-router-dom';

const Announcements = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ padding: '20px', flex: 1, position: 'relative' }}>
                <PageHeader title="공지사항" />
                
                <Link to="/awrite" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className="add-button">
                        <img src="/icons/plusbtn.png" alt="Plus Button" className="button-icon" />
                        추가
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Announcements;
