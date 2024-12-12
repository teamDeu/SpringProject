package com.example.Backend.controller;

import com.example.Backend.model.CeoReview;
import com.example.Backend.service.CeoReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ceo-reviews")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드와의 CORS 문제 해결
public class CeoReviewController {

    @Autowired
    private CeoReviewService ceoReviewService;

    // 모든 리뷰 가져오기
    @GetMapping
    public ResponseEntity<List<CeoReview>> getAllReviews() {
        List<CeoReview> reviews = ceoReviewService.getAllReviews();
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reviews);
    }

    // 특정 회사 ID에 대한 리뷰 가져오기
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<CeoReview>> getReviewsByCompanyId(@PathVariable String companyId) {
        List<CeoReview> reviews = ceoReviewService.getReviewsByCompanyId(companyId);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reviews);
    }

    // 특정 유저 ID에 대한 리뷰 가져오기
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CeoReview>> getReviewsByUserId(@PathVariable String userId) {
        List<CeoReview> reviews = ceoReviewService.getReviewsByUserId(userId);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reviews);
    }

    // 리뷰 생성
    @PostMapping
    public ResponseEntity<CeoReview> createReview(@RequestBody CeoReview review) {
        CeoReview createdReview = ceoReviewService.createReview(review);
        return ResponseEntity.ok(createdReview);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        ceoReviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
