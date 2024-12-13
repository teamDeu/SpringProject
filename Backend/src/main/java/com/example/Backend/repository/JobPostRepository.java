package com.example.Backend.repository;

import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface JobPostRepository extends JpaRepository<JobPost,Long>{
    List<JobPost> findByCompanyOrderByModifyDateDesc(String company);

    // 특정 회사 ID의 공고 개수를 가져오는 쿼리
    @Query("SELECT COUNT(j) FROM JobPost j WHERE j.company = :companyId")
    Long countJobPostsByCompanyId(@Param("companyId") String companyId);

    @Query("SELECT j.company AS companyId, COUNT(j) AS count " +
            "FROM JobPost j GROUP BY j.company")
    List<Map<String, Object>> getJobPostCounts();




    JobPost findJobPostById(Long id);





}
