// src/components/Menu.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation 추가
import './menu.css';

const Menu = () => {
    const location = useLocation(); // 현재 경로를 가져옴

    // 기본 아이콘과 호버 아이콘을 포함한 상태
    const [iconSrc, setIconSrc] = useState({
        s1: "/icons/s1.png",
        s2: "/icons/s2.png",
        s3: "/icons/s3.png",
        s4: "/icons/s4.png",
        s5: "/icons/s5.png"
    });

    const handleMouseEnter = (iconKey, hoverSrc) => {
        setIconSrc(prevState => ({
            ...prevState,
            [iconKey]: hoverSrc
        }));
    };

    const handleMouseLeave = (iconKey, defaultSrc) => {
        // 현재 경로가 아이템 경로와 일치하지 않으면 기본 아이콘으로 되돌림
        if (!isActive(iconKey)) {
            setIconSrc(prevState => ({
                ...prevState,
                [iconKey]: defaultSrc
            }));
        }
    };

    // 활성화 상태 확인 함수
    const isActive = (iconKey) => {
        return (
            (iconKey === 's1' && location.pathname.includes('/amember')) ||
            (iconKey === 's2' && location.pathname.includes('/job')) ||
            (iconKey === 's3' && location.pathname.includes('/faq')) ||
            (iconKey === 's4' && location.pathname.includes('/announcements')) ||
            (iconKey === 's5' && location.pathname.includes('/areview'))
        );
    };
    

    const menuItems = [
        { path: "/amember", label: "회원 관리", icon: "s1", hoverIcon: "/icons/s1_1.png", defaultIcon: "/icons/s1.png" },
        { path: "/job", label: "채용정보 관리", icon: "s2", hoverIcon: "/icons/s2_1.png", defaultIcon: "/icons/s2.png" },
        { path: "/faq", label: "FAQ", icon: "s3", hoverIcon: "/icons/s3_1.png", defaultIcon: "/icons/s3.png" },
        { path: "/announcements", label: "공지사항", icon: "s4", hoverIcon: "/icons/s4_1.png", defaultIcon: "/icons/s4.png" },
        { path: "/areview", label: "리뷰 관리", icon: "s5", hoverIcon: "/icons/s5_1.png", defaultIcon: "/icons/s5.png" }
    ];

    return (
        <div className="menu-container">
            <h2>관리자 패널</h2>
            {menuItems.map(item => (
                <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }} key={item.label}>
                    <button
                        className={`menu-button ${isActive(item.icon) ? 'active' : ''}`} // 현재 경로와 일치하는 경우 'active' 클래스 추가
                        onMouseEnter={() => handleMouseEnter(item.icon, item.hoverIcon)}
                        onMouseLeave={() => handleMouseLeave(item.icon, item.defaultIcon)}
                    >
                        <img src={isActive(item.icon) ? item.hoverIcon : iconSrc[item.icon]} alt={item.label} className="menu-icon" />
                        {item.label}
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default Menu;
