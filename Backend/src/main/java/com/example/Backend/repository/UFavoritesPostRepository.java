package com.example.Backend.repository;

import com.example.Backend.model.UFavoritesPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UFavoritesPostRepository extends JpaRepository<UFavoritesPost, Integer> {
    List<UFavoritesPost> findByUserId(String userId);
    List<UFavoritesPost> findByJobPostId(Integer jobPostId);
    void deleteByUserIdAndJobPostId(String userId, Integer jobPostId);

    boolean existsByUserIdAndJobPostId(String userId, Integer jobPostId);
}
