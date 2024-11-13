// src/components/Menu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
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
        setIconSrc(prevState => ({
            ...prevState,
            [iconKey]: defaultSrc
        }));
    };

    return (
        <div className="menu-container">
            <h2>관리자 패널</h2>
            <Link to="/amember" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('s1', '/icons/s1_1.png')}
                    onMouseLeave={() => handleMouseLeave('s1', '/icons/s1.png')}
                >
                    <img src={iconSrc.s1} alt="회원 관리" className="menu-icon" />
                    회원 관리
                </button>
            </Link>
            <Link to="/job" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('s2', '/icons/s2_1.png')}
                    onMouseLeave={() => handleMouseLeave('s2', '/icons/s2.png')}
                >
                    <img src={iconSrc.s2} alt="채용정보 관리" className="menu-icon" />
                    채용정보 관리
                </button>
            </Link>
            <Link to="/faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('s3', '/icons/s3_1.png')}
                    onMouseLeave={() => handleMouseLeave('s3', '/icons/s3.png')}
                >
                    <img src={iconSrc.s3} alt="FAQ" className="menu-icon" />
                    FAQ
                </button>
            </Link>
            <Link to="/announcements" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('s4', '/icons/s4_1.png')}
                    onMouseLeave={() => handleMouseLeave('s4', '/icons/s4.png')}
                >
                    <img src={iconSrc.s4} alt="공지사항" className="menu-icon" />
                    공지사항
                </button>
            </Link>
            <Link to="/areview" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('s5', '/icons/s5_1.png')}
                    onMouseLeave={() => handleMouseLeave('s5', '/icons/s5.png')}
                >
                    <img src={iconSrc.s5} alt="리뷰 관리" className="menu-icon" />
                    리뷰 관리
                </button>
            </Link>
        </div>
    );
};

export default Menu;
