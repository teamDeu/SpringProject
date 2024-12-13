package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPost2;
import com.example.Backend.model.JobPost3;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface JobPostRepository3 extends JpaRepository<JobPost3, Long> {
    //이 공고 놓치지 마세요
    @Query("SELECT j FROM JobPost3 j WHERE j.endDate > CURRENT_DATE ORDER BY j.endDate ASC")
    List<JobPost3> findTop9ByOrderByEndDateAsc(Pageable pageable);


    //지금 눈 여겨볼 공고
    @Query("SELECT j FROM JobPost3 j ORDER BY j.views DESC")
    List<JobPost3> findTop9ByOrderByViewsDesc(Pageable pageable);

    //회원님을 위한 오늘의 공고
    @Query("SELECT j FROM JobPost3 j ORDER BY j.postDate DESC")
    List<JobPost3> findTop9ByOrderByPostDateDesc(Pageable pageable);


    //많은 회원들이 눈 여겨 볼 공고
    @Query("SELECT j FROM JobPost3 j WHERE j.isFeatured = TRUE ORDER BY j.views DESC")
    List<JobPost3> findTop10ByIsFeaturedTrueOrderByViewsDesc(Pageable pageable);


    //조회수가 높은 공고
    @Query("SELECT j FROM JobPost3 j ORDER BY j.views DESC")
    List<JobPost3> findAllJobPostsByViews();



    //마감이 얼마 남지 않은 공고
    @Query("SELECT j FROM JobPost3 j WHERE j.endDate BETWEEN :startDate AND :endDate ORDER BY j.endDate ASC")
    List<JobPost3> findJobPostsEndingBetween(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable
    );
}
