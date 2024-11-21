import axios from "axios";
import React, { useState } from "react";


export const PostComapany = (company) => {
    // POST 요청으로 새로운 데이터를 서버에 저장합니다.
    console.log("Sending company:", company); // 요청 본문 확인
    return axios.post('http://localhost:8080/api/company', company)
        .then(response => response.data)
        .catch(error => console.error('Error posting data:', error));

};

export const GetAllCompanies = () => {
    return axios.get('http://localhost:8080/api/companies')
            .then(response => response.data)
            .catch(error => console.error('Error fetching data:', error)); 
};

// 모든 인터뷰 리뷰 데이터를 가져오는 API
export const GetAllInterviewReviews = () => {
    return axios.get('http://localhost:8080/api/interview-reviews')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching interview reviews:', error);
            throw error;
        });
};

// 새로운 인터뷰 리뷰를 저장하는 API
export const PostInterviewReview = (review) => {
    console.log("Sending interview review:", review); // 요청 데이터 확인용 로그
    return axios.post('http://localhost:8080/api/interview-review', review)
        .then(response => response.data)
        .catch(error => {
            console.error('Error posting interview review:', error);
            throw error;
        });
};
