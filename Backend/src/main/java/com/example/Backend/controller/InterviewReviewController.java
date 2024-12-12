package com.example.Backend.controller;

import com.example.Backend.model.InterviewReview;
import com.example.Backend.service.InterviewReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-reviews")
public class InterviewReviewController {

    @Autowired
    private InterviewReviewService interviewReviewService;

    // 모든 인터뷰 리뷰 가져오기
    @GetMapping
    public ResponseEntity<List<InterviewReview>> getData() {
        return ResponseEntity.ok(interviewReviewService.getAllInterviewReviews());
    }

    // 특정 인터뷰 리뷰와 세부 정보 가져오기
    @GetMapping("/with-all-details")
    public ResponseEntity<List<Object[]>> getInterviewReviewsWithAllDetails() {
        return ResponseEntity.ok(interviewReviewService.getInterviewReviewsWithDetails());
    }

    // 인터뷰 리뷰 저장하기
    @PostMapping("/save")
    public ResponseEntity<String> saveInterviewReview(@RequestBody InterviewReviewRequest request) {
        try {
            interviewReviewService.saveInterviewReview(request); // InterviewReviewRequest 사용
            return ResponseEntity.ok("면접 후기가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("면접 후기 저장 실패: " + e.getMessage());
        }
    }

    // 특정 인터뷰 리뷰 삭제하기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterviewReview(@PathVariable Long id) {
        try {
            interviewReviewService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


