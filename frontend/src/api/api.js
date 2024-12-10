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
        if(typeof jobPost[key] === "object" && key != images){
            jobPost[key] = JSON.stringify(jobPost[key])
        }
    });
    console.log(images);
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
export const GetCompanyJobPosts = (company) => {
    return axios.get('http://localhost:8080/api/companyjobpost',{
        params: {
            company : company
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};


export const GetAllJobPosts = () => {
    return axios.get('http://localhost:8080/api/jobpost')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const GetIdJobPost = async(id) => {
    const postData = await axios.get('http://localhost:8080/api/idjobpost',{
        params :{
            id : id
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    console.log("api:" ,postData)
    const postImage = await axios.get('http://localhost:8080/api/jobpostimage',{
        params :{
            id : id
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    
    postData.aboutCompany = {description : postData.aboutCompany , images : postImage}
    return postData;
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
            data:  ids,  // DELETE 요청의 본문에 삭제할 ID 배열 전달
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting GFaqs:', error);
        throw error;
    }
};


// 특정 target의 Faq 데이터를 가져오는 API
export const GetFaqsByTarget = async (target) => {
    try {
        console.log(`Calling GetFaqsByTarget with target: ${target}`); // 디버깅용 로그
        const response = await axios.get(`http://localhost:8080/api/faqs/target/${target}`);
        console.log("GetFaqsByTarget response:", response.data); // 디버깅용 로그
        return response.data; // target에 해당하는 Faq 데이터 반환
    } catch (error) {
        console.error(`Error fetching Faqs for target: ${target}`, error);
        throw error;
    }
};
// 사용자 정보 가져오기 API
export const getUserInfo = async () => {
    try {
        // API 호출
        const response = await axios.get('http://localhost:8080/api/user-info', {
            withCredentials: true, // 세션 관리가 필요한 경우 사용
        });
        console.log('User Info API Response:', response.data); // 디버깅 로그
        return response.data; // 데이터 반환    
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error; // 오류를 상위로 전달
    }
};
// 회원탈퇴 API
export const deleteUserAccount = async () => {
    try {
        // API 호출
        const response = await axios.delete('http://localhost:8080/api/delete-account', {
            withCredentials: true, // 세션 관리가 필요한 경우 사용
        });
        console.log('Delete User Account API Response:', response.data); // 디버깅 로그
        return response.data; // 데이터 반환
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error; // 오류를 상위로 전달
    }
};
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axios.put(
            'http://localhost:8080/api/change-password',
            {
                currentPassword,
                newPassword,
            },
            { withCredentials: true } // 세션 인증 포함
        );
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};
export const updateUserInfo = async (userInfo) => {
    const response = await fetch('http://localhost:8080/api/update-user-info2', { // URL 수정
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
        throw new Error('Failed to update user info');
    }
};
// 새로운 Faq 생성
export const CreateFaq = async (faq) => {
    try {
        const response = await axios.post('http://localhost:8080/api/faqs', faq);
        return response.data;
    } catch (error) {
        console.error('Error creating FAQ:', error);
        throw error;
    }
};

// Faq 삭제
export const DeleteFaq = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/faqs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        throw error;
    }
};

// 새로운 GFaqs 생성 API 함수
export const CreateGFaq = async (faqId, gfaq) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/gfaqs/faq/${faqId}`, gfaq);
        return response.data;
    } catch (error) {
        console.error('Error creating GFaq:', error);
        throw error;
    }
};

//공지사항
// g_notices 데이터를 특정 타겟으로 가져오는 API 함수
export const GetGNoticesByTarget = async (target) => {
    try {
        const response = await axios.get('http://localhost:8080/api/g_notices', {
            params: {
                target: target === "all" ? "전체" : target === "individual" ? "개인회원" : "기업회원",
            },
        });
        return response.data; // 전체 GNotices 배열 반환
    } catch (error) {
        console.error(`Error fetching GNotices for target: ${target}`, error);
        throw error;
    }
};

// g_notices 데이터를 삭제하는 API 함수
export const DeleteGNotice = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/g_notices/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting GNotice with id ${id}:`, error);
        throw error;
    }
};

// 특정 사용자의 관심기업 목록 가져오기
export const GetFavoritesByUserId = async (userId) => {
    try {
        const response = await axios.get('http://localhost:8080/api/favorites', {
            params: { userId }, // userId를 쿼리 파라미터로 전달
        });
        console.log("Favorites fetched:", response.data); // 디버깅 로그
        return response.data; // 관심기업 데이터 반환
    } catch (error) {
        console.error('Error fetching favorite companies:', error);
        throw error;
    }
};

// 특정 관심기업 삭제
export const DeleteFavoriteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/favorites/${id}`);
        console.log(`Favorite with ID ${id} deleted`); // 삭제 확인 로그
        return response.data; // 삭제 성공 메시지 반환
    } catch (error) {
        console.error(`Error deleting favorite with ID ${id}:`, error);
        throw error;
    }
};

//스크랩
export const GetUserScrapPosts = async (userId) => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/scrap-posts', {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching scrap posts:', error);
        throw error;
    }
};


export const GetCandidate = async (postId) =>{
    return await axios.get('http://localhost:8080/api/candidate',{
        params: {
            postId : postId
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
} 

