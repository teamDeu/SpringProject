package com.example.Backend.repository;

import com.example.Backend.model.JobPost2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface JobPostRepository2 extends JpaRepository<JobPost2, Long> {

    // 특정 회사 ID의 공고 개수를 가져오는 쿼리
    @Query("SELECT COUNT(j) FROM JobPost2 j WHERE j.company = :companyId")
    Long countJobPostsByCompanyId(@Param("companyId") String companyId);

    // 회사별 공고 개수를 가져오는 쿼리
    @Query("SELECT j.company AS companyId, COUNT(j) AS count " +
            "FROM JobPost2 j GROUP BY j.company")
    List<Map<String, Object>> getJobPostCounts();

    // 특정 공고 ID에 해당하는 공고와 이미지 데이터를 가져오는 쿼리
    @Query("SELECT jp, jpi FROM JobPost2 jp " +
            "LEFT JOIN JobPostImage2 jpi ON jp.id = jpi.jobPost.id " +
            "WHERE jp.id = :postId")
    List<Object[]> getJobPostWithImages(@Param("postId") Long postId);

}
