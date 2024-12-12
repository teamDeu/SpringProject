package com.example.Backend.controller;

import com.example.Backend.model.UserFavoritesCompany;
import com.example.Backend.service.UserFavoritesCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users_favorites")
@CrossOrigin(origins = "http://localhost:3000") // React에서의 요청 허용
public class UserFavoritesCompanyController {
    private static final Logger logger = LoggerFactory.getLogger(UserFavoritesCompanyController.class);

    @Autowired
    private UserFavoritesCompanyService userFavoritesCompanyService;

    @GetMapping("/counts")
    public ResponseEntity<List<Map<String, Object>>> getCompanyFavoriteCounts() {
        List<Map<String, Object>> counts = userFavoritesCompanyService.getCompanyFavoriteCounts();
        return ResponseEntity.ok(counts);
    }
    @PostMapping
    public ResponseEntity<String> addFavorite(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        String companyId = requestBody.get("companyId");

        logger.info("Received userId: {}", userId);
        logger.info("Received companyId: {}", companyId);

        if (userId == null || companyId == null) {
            logger.error("userId 또는 companyId가 null입니다.");
            return ResponseEntity.badRequest().body("userId와 companyId는 필수 값입니다.");
        }

        userFavoritesCompanyService.addFavorite(userId, companyId);
        return ResponseEntity.ok("관심 기업이 추가되었습니다.");
    }
    @GetMapping("/is-favorite")
    public ResponseEntity<Boolean> isFavorite(@RequestParam String userId, @RequestParam String companyId) {
        boolean isFavorite = userFavoritesCompanyService.isFavorite(userId, companyId);
        return ResponseEntity.ok(isFavorite);
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserFavoritesCompany>> getAllFavorites(@RequestParam String userId) {
        List<UserFavoritesCompany> favorites = userFavoritesCompanyService.getAllFavoritesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }
    @DeleteMapping
    public ResponseEntity<String> removeFavorite(@RequestParam String userId, @RequestParam String companyId) {
        userFavoritesCompanyService.removeFavorite(userId, companyId);
        return ResponseEntity.ok("관심 기업에서 제거되었습니다.");
    }




}
