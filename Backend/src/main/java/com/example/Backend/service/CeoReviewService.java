package com.example.Backend.service;

import com.example.Backend.model.CeoReview;
import com.example.Backend.repository.CeoReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CeoReviewService {

    @Autowired
    private CeoReviewRepository ceoReviewRepository;

    // 모든 리뷰 가져오기
    public List<CeoReview> getAllReviews() {
        return ceoReviewRepository.findAll();
    }

    // 특정 회사 ID에 대한 리뷰 가져오기
    public List<CeoReview> getReviewsByCompanyId(String companyId) {
        return ceoReviewRepository.findByCompanyId(companyId);
    }

    // 특정 유저 ID에 대한 리뷰 가져오기
    public List<CeoReview> getReviewsByUserId(String userId) {
        return ceoReviewRepository.findByUserId(userId);
    }

    // 리뷰 생성
    public CeoReview createReview(CeoReview review) {
        return ceoReviewRepository.save(review);
    }

    // 리뷰 삭제
    public void deleteReview(Long id) {
        ceoReviewRepository.deleteById(id);
    }
}
