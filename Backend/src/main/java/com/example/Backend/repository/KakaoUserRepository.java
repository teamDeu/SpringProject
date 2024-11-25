package com.example.Backend.repository;

import com.example.Backend.model.KakaoUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KakaoUserRepository extends JpaRepository<KakaoUser, Long> {
    Optional<KakaoUser> findByKakaoId(String kakaoId); // 카카오 ID로 사용자 검색
}
