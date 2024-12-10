package com.example.Backend.service;

import com.example.Backend.model.UFavoritesPost;
import com.example.Backend.repository.UFavoritesPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UFavoritesPostService {

    @Autowired
    private UFavoritesPostRepository repository;

    public UFavoritesPost saveFavorite(UFavoritesPost favorite) {
        if (favorite.getSavedDate() == null) {
            favorite.setSavedDate(LocalDateTime.now()); // 날짜 기본값 설정
        }
        return repository.save(favorite);
    }

    public List<UFavoritesPost> getFavoritesByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    @Transactional
    public void removeFavorite(String userId, Integer jobPostId) {
        repository.deleteByUserIdAndJobPostId(userId, jobPostId);
    }

    public boolean isFavorite(String userId, Integer jobPostId) {
        return repository.existsByUserIdAndJobPostId(userId, jobPostId);
    }
}
