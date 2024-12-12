package com.example.Backend.service;

import com.example.Backend.controller.InterviewReviewRequest;
import com.example.Backend.model.Company;
import com.example.Backend.model.InterviewReview;
import com.example.Backend.model.JobCategory;
import com.example.Backend.repository.CompanyRepository;
import com.example.Backend.repository.InterviewReviewRepository;
import com.example.Backend.repository.JobCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InterviewReviewService {

    @Autowired
    private InterviewReviewRepository interviewReviewRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobCategoryRepository jobCategoryRepository;

    // 모든 인터뷰 리뷰 가져오기
    public List<InterviewReview> getAllInterviewReviews() {
        return interviewReviewRepository.findAll();
    }

    // 특정 세부 정보를 포함한 인터뷰 리뷰 가져오기
    public List<Object[]> getInterviewReviewsWithDetails() {
        return interviewReviewRepository.getInterviewReviewsWithDetails();
    }

    // 새로운 인터뷰 리뷰 저장
    public void saveInterviewReview(InterviewReviewRequest request) {
        // 회사 ID 가져오기
        Company company = companyRepository.findByCompanyName(request.getCompanyName())
                .orElseThrow(() -> new RuntimeException("회사 정보를 찾을 수 없습니다."));

        // 직무 카테고리 ID 가져오기
        JobCategory jobCategory = jobCategoryRepository.findByName(request.getJobCategoryName())
                .orElseThrow(() -> new RuntimeException("직무 카테고리 정보를 찾을 수 없습니다."));

        // InterviewReview 엔티티 생성 및 데이터 설정
        InterviewReview interviewReview = new InterviewReview();
        interviewReview.setCompanyId(company.getId());
        interviewReview.setJobCategoryId(jobCategory.getId());
        interviewReview.setExperience(request.getExperience());
        interviewReview.setInterviewDate(request.getInterviewDate());
        interviewReview.setInterviewEvaluation(request.getInterviewEvaluation());
        interviewReview.setInterviewDifficulty(request.getInterviewDifficulty());
        interviewReview.setInterviewPassed(request.getInterviewPassed());
        interviewReview.setInterviewType(request.getInterviewType());
        interviewReview.setInterviewNumtype(request.getInterviewNumtype());
        interviewReview.setInterviewQuestion(request.getInterviewQuestion());
        interviewReview.setInterviewDetail(request.getInterviewDetail());
        interviewReview.setVerifyFile(request.getVerifyFile());
        interviewReview.setUserId(request.getUserId());
        interviewReview.setInterviewRegister(LocalDate.now().toString());

        // 데이터 저장
        interviewReviewRepository.save(interviewReview);
    }

    // 특정 리뷰 삭제
    public void deleteById(Long id) {
        if (interviewReviewRepository.existsById(Math.toIntExact(id))) {
            interviewReviewRepository.deleteById(Math.toIntExact(id));
        } else {
            throw new IllegalArgumentException("해당 리뷰가 존재하지 않습니다.");
        }
    }
}
