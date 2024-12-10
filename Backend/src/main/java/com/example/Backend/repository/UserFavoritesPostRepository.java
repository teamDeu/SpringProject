package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import com.example.Backend.model.UserFavoritesPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserFavoritesPostRepository extends JpaRepository<UserFavoritesPost, Integer> {

    @Query("SELECT jp FROM UserFavoritesPost ufp " +
            "JOIN JobPost jp ON ufp.jobPostId = jp.id " +
            "WHERE ufp.userId = :userId")
    List<JobPost> findFavoriteJobPostsByUserId(@Param("userId") String userId);
}
