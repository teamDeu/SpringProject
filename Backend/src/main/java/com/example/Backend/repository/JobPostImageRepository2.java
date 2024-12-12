package com.example.Backend.repository;

import com.example.Backend.model.JobPostImage2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostImageRepository2 extends JpaRepository<JobPostImage2, Long> {

    // JobPost 객체를 기반으로 이미지 조회 (메서드 이름으로 쿼리 생성)
    List<JobPostImage2> findByJobPost_Id(Long postId);

    // JPQL 쿼리로 이미지 조회
    @Query("SELECT jpi FROM JobPostImage2 jpi WHERE jpi.jobPost.id = :postId")
    List<JobPostImage2> findImagesByPostId(@Param("postId") Long postId);
}
