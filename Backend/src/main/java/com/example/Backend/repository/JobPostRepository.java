package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface JobPostRepository extends JpaRepository<JobPost,Long>{
    List<JobPost> findByCompanyOrderByModifyDateDesc(String company);


    //이 공고 놓치지 마세요
    @Query("SELECT j FROM JobPost j WHERE j.endDate > CURRENT_DATE ORDER BY j.endDate ASC")
    List<JobPost> findTop9ByOrderByEndDateAsc(Pageable pageable);


    //지금 눈 여겨볼 공고
    @Query("SELECT j FROM JobPost j ORDER BY j.views DESC")
    List<JobPost> findTop9ByOrderByViewsDesc(Pageable pageable);

    //회원님을 위한 오늘의 공고
    @Query("SELECT j FROM JobPost j ORDER BY j.postDate DESC")
    List<JobPost> findTop9ByOrderByPostDateDesc(Pageable pageable);


    //많은 회원들이 눈 여겨 볼 공고
    @Query("SELECT j FROM JobPost j WHERE j.isFeatured = TRUE ORDER BY j.views DESC")
    List<JobPost> findTop10ByIsFeaturedTrueOrderByViewsDesc(Pageable pageable);


}
