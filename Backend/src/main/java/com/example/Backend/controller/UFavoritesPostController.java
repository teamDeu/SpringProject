package com.example.Backend.controller;

import com.example.Backend.model.UFavoritesPost;
import com.example.Backend.service.UFavoritesPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/favorites")
public class UFavoritesPostController {

    @Autowired
    private UFavoritesPostService service;

    @PostMapping
    public UFavoritesPost saveFavorite(@RequestBody UFavoritesPost favorite) {
        return service.saveFavorite(favorite);
    }

    // UFavoritesPostController.java
    @GetMapping("/{userId}")
    public ResponseEntity<List<Integer>> getUserFavorites(@PathVariable String userId) {
        try {
            List<UFavoritesPost> favorites = service.getFavoritesByUserId(userId);
            List<Integer> jobPostIds = favorites.stream()
                    .map(UFavoritesPost::getJobPostId)
                    .toList();
            return ResponseEntity.ok(jobPostIds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }


    @DeleteMapping("/{jobPostId}")
    public ResponseEntity<String> deleteFavorite(@PathVariable Integer jobPostId, @RequestParam String userId) {
        try {
            service.removeFavorite(userId, jobPostId);
            return ResponseEntity.ok("즐겨찾기 삭제 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("잘못된 요청: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("즐겨찾기 삭제 실패: " + e.getMessage());
        }
    }



    @PostMapping("/api/favorites")
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, Object> favoriteData) {
        try {
            String userId = (String) favoriteData.get("userId");
            Integer jobPostId = (Integer) favoriteData.get("jobPostId");

            UFavoritesPost favorite = new UFavoritesPost();
            favorite.setUserId(userId);
            favorite.setJobPostId(jobPostId);
            favorite.setSavedDate(LocalDateTime.now());

            service.saveFavorite(favorite);

            return ResponseEntity.ok("즐겨찾기가 추가되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("즐겨찾기 추가에 실패했습니다.");
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkFavorite(@RequestParam String userId, @RequestParam Integer jobPostId) {
        boolean isFavorite = service.isFavorite(userId, jobPostId);
        return ResponseEntity.ok(isFavorite);
    }


}
