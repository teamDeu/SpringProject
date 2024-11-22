package com.example.Backend.service;

import com.example.Backend.model.ReviewManager;
import com.example.Backend.repository.ReviewManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewManagerService {

    @Autowired
    private ReviewManagerRepository reviewManagerRepository;

    // 모든 리뷰 매니저 가져오기
    public List<ReviewManager> getAllReviewManagers() {
        return reviewManagerRepository.findAll();
    }

    // 특정 ID로 리뷰 매니저 가져오기
    public ReviewManager getReviewManagerById(int id) {
        return reviewManagerRepository.findById(id).orElse(null);
    }

    // 새로운 리뷰 매니저 추가
    public ReviewManager saveReviewManager(ReviewManager reviewManager) {
        return reviewManagerRepository.save(reviewManager);
    }

    // 리뷰 매니저 삭제
    public void deleteReviewManager(int id) {
        reviewManagerRepository.deleteById(id);
    }
}
