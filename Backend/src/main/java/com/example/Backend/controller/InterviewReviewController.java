package com.example.Backend.controller;

import com.example.Backend.model.InterviewReview;
import com.example.Backend.service.InterviewReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InterviewReviewController {

    @Autowired
    InterviewReviewService interviewReviewService;

    // 모든 인터뷰 리뷰 가져오기
    @GetMapping("/api/interview-reviews")
    public ResponseEntity<List<InterviewReview>> getData() {
        // 데이터 반환 로직
        return ResponseEntity.ok(interviewReviewService.getAllInterviewReviews());
    }

    // 새로운 인터뷰 리뷰 저장하기
    @PostMapping("/api/interview-review")
    public ResponseEntity<InterviewReview> saveInterviewReview(@RequestBody InterviewReview interviewReview) {
        // InterviewReview 객체 저장 로직
        InterviewReview savedReview = interviewReviewService.saveInterviewReview(interviewReview);
        return ResponseEntity.ok(savedReview);
    }

    // 특정 인터뷰 리뷰와 회사 정보 가져오기
    @GetMapping("/api/interview-reviews/with-all-details")
    public ResponseEntity<List<Object[]>> getInterviewReviewsWithAllDetails() {
        return ResponseEntity.ok(interviewReviewService.getInterviewReviewsWithDetails());
    }



}
