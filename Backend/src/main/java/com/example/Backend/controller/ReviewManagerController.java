package com.example.Backend.controller;

import com.example.Backend.model.ReviewManager;
import com.example.Backend.service.ReviewManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review-managers")
public class ReviewManagerController {

    @Autowired
    private ReviewManagerService reviewManagerService;

    // 모든 리뷰 매니저 가져오기
    @GetMapping
    public ResponseEntity<List<ReviewManager>> getAllReviewManagers() {
        return ResponseEntity.ok(reviewManagerService.getAllReviewManagers());
    }

    // 특정 ID로 리뷰 매니저 가져오기
    @GetMapping("/{id}")
    public ResponseEntity<ReviewManager> getReviewManagerById(@PathVariable int id) {
        ReviewManager reviewManager = reviewManagerService.getReviewManagerById(id);
        if (reviewManager != null) {
            return ResponseEntity.ok(reviewManager);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 새로운 리뷰 매니저 추가
    @PostMapping
    public ResponseEntity<ReviewManager> createReviewManager(@RequestBody ReviewManager reviewManager) {
        ReviewManager savedReviewManager = reviewManagerService.saveReviewManager(reviewManager);
        return ResponseEntity.ok(savedReviewManager);
    }

    // 리뷰 매니저 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewManager(@PathVariable int id) {
        reviewManagerService.deleteReviewManager(id);
        return ResponseEntity.noContent().build();
    }
}
