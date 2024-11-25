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

//채용정보 데이터를 가져오는 API
export const GetAllJobPosts = () => {
    return axios.get('http://localhost:8080/api/jobpost')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

//채용정보 데이터를 삭제하는 API
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
    const sessionId = await axios.get('http://localhost:8080/api/session',{ withCredentials: true })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
    return sessionId
}

export const GetInfoBySession = async (session) => {
    console.log(session);
    const object = await axios.get(`http://localhost:8080/api/InfoBySession`,{ 
        withCredentials: true,
        params :{
            id : session,
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
    return object
}

export const LogoutSession = async () => {
    const object = await axios.get(`http://localhost:8080/api/logout`,{ 
        withCredentials: true,
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
}



//회원 데이터를 가져오는 API
export const GetAllMembers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/members');
        console.log("API Response:", response.data); // 서버 응답 데이터 확인
        const { individuals, companies } = response.data;

        const allMembers = [
            ...individuals.map(user => ({
                id: user.id,
                type: "개인",
                password: user.password,
                name: user.name,
                dob: user.dob || "-", // null일 경우 '-'
                phone: user.phone,
            })),
            ...companies.map(company => ({
                id: company.id,
                type: "기업",
                password: company.password,
                name: company.name,
                dob: "-", // 기업에는 생년월일 없음
                phone: company.phone,
            }))
        ];
        return allMembers;
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error;
    }
};

// FAQ Title 데이터를 가져오는 API
export const GetFAQTitle = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/faqtitle');
    // 데이터는 배열로 반환되므로, 첫 번째 객체만 사용
    return response.data[0];
  } catch (error) {
    console.error("Error fetching FAQ title:", error);
    throw error;
  }
};

// FAQ Title 데이터를 업데이트 하는 API
export const UpdateFAQTitle = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/faqtitle/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating FAQ title:", error);
      throw error;
    }
  };

// 특정 target의 GFaqs 데이터를 가져오는 API
export const GetGFaqsByTarget = async (target) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/gfaqs/faq`, {
            params: { target }, // Faq 타겟을 기준으로 GFaqs 조회
        });
        return response.data; // target에 해당하는 GFaqs 데이터 반환
    } catch (error) {
        console.error(`Error fetching GFaqs for target: ${target}`, error);
        throw error;
    }
};

// 선택된 GFaq 항목을 삭제하는 API 함수
export const DeleteGFaqs = async (ids) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/gfaqs`, {
            data: { ids }, // DELETE 요청의 본문에 삭제할 ID 배열 전달
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting GFaqs:', error);
        throw error;
    }
};