package com.example.Backend.controller;

import com.example.Backend.model.InterviewReview;
import com.example.Backend.service.InterviewReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InterviewReviewController {

    @Autowired
    InterviewReviewService interviewReviewService = new InterviewReviewService();

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
}
