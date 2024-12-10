package com.example.Backend.repository;

import com.example.backend.model.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFavoritesRepository extends JpaRepository<UserFavorite, Long> {
    List<UserFavorite> findByUserId(String userId); // 특정 사용자의 관심기업 조회
}
