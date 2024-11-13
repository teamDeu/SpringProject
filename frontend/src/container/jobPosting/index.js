import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './jobPosting.css';
import searchIcon from './search_icon.png';

function JobPosting() {
    return (
      
      <div className="job-posting-container">
        <nav className="navbar">
          <div className="navbar-left">
            <div className="logo-search">
              <span className="logo">구인구직</span>
              <div className="search-container">
                <input type="text" placeholder="검색어를 입력하세요." className="search-input" />
                <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
              </div>
            </div>
            <ul className="nav-links">
                        <li>
                            <button>채용 정보</button>
                            <div className="dropdown-content">
                                <button>지역/산업별 채용 정보</button>
                                <button>관심 채용 정보 보기</button>
                            </div>
                        </li>
                        <li>
                            <button>이력서</button>
                            <div className="dropdown-content">
                                <button>이력서 작성</button>
                                <button>My 이력서</button>
                            </div>
                        </li>
                        <li>
                            <button>합격 후기</button>
                            <div className="dropdown-content">
                                <button>면접 후기</button>
                                <button>기업 리뷰</button>
                                <button>My 리뷰</button>
                            </div>
                        </li>
                        <li>
                            <button>고객센터</button>
                            <div className="dropdown-content">
                                <button>공지사항</button>
                                <button>FAQ</button>
                            </div>
                        </li>
                        <li>
                            <button>마이페이지</button>
                            <div className="dropdown-content">
                                <button>스크랩/관심기업</button>
                                <button>지원내역</button>
                            </div>
                        </li>
                    </ul>
                </div>
          <div className="navbar-right">
            <button className="auth-link">회원가입</button>
            <button className="auth-link">로그인</button>
          </div>
        </nav>
      </div>
    );
  }
  
  export default JobPosting;