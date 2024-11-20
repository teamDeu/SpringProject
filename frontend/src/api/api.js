import axios from "axios";
import React, { useState } from "react";


export const PostCompany = (company) => {
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
