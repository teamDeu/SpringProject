import axios from "axios";
import React, { useState } from "react";


export const PostCompany = async(company) => {
    // POST 요청으로 새로운 데이터를 서버에 저장합니다.
    console.log("Sending company:", company); // 요청 본문 확인
    const logo = company.logoUrl;
    company = {...company,logoUrl : ""}
    const savedCompany = await axios.post('http://localhost:8080/api/company', company)
        .then(response => response.data)
        .catch(error => console.error('Error posting data:', error));
    
    console.log(savedCompany);
    const companyId = savedCompany.id;
    const formData = new FormData();
    formData.append("image",logo[0]);
    return axios.post(`http://localhost:8080/api/companylogo/${companyId}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    }).then(console.log("success"))
    .catch(console.log("error"))


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

export const GetAllSkills = () => {
    return axios.get('http://localhost:8080/api/skills')
            .then(response => response.data)
            .catch(error => console.error('Error fetching data:', error)); 
};


export const PostJobPost = async(jobPost) => {

    console.log("Sending company:", jobPost); // 요청 본문 확인
    console.log("images" , jobPost.aboutCompany.images)


    const images = jobPost.aboutCompany.images;
    const keys = Object.keys(jobPost);

    jobPost = {...jobPost,aboutCompany : jobPost.aboutCompany.description}

    keys.forEach((key) => {
        if(typeof jobPost[key] === "object"){
            jobPost[key] = JSON.stringify(jobPost[key])
        }
    });
    const savedJobPost = await axios.post("http://localhost:8080/api/jobpost", jobPost)
        .then(response => response.data)
        .catch(error => {
            console.error("Error posting job post:", error);
            throw error;
        });

    const jobPostId = savedJobPost.id;
    
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
    }
    try {
        const response = await axios.post(`http://localhost:8080/api/jobpostimage/${jobPostId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return "success";
      } catch (error) {
        return "error";
      }
    
}

export const GetAllJobPosts = () => {
    return axios.get('http://localhost:8080/api/jobpost')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};
export const DeleteJobPost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/jobpost/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job post:', error);
        throw error;
    }
};

export const GetSessionId = async () => {
    const sessionId = await axios.get('http://localhost:8080/api/getsession',{ withCredentials: true })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
    return sessionId
}