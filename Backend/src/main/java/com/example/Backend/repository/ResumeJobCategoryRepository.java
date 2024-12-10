package com.example.Backend.repository;

import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.model.ResumeJobCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeJobCategoryRepository extends JpaRepository<ResumeJobCategory, ResumeJobCategoryId> {

    @Query("SELECT rjc FROM ResumeJobCategory rjc " +
            "JOIN FETCH rjc.resume r " +
            "JOIN FETCH rjc.jobCategory jc " +
            "WHERE r.id = :resumeId")
    List<ResumeJobCategory> findByResumeId(Integer resumeId);

    @Query("SELECT rjc FROM ResumeJobCategory rjc " +
            "JOIN FETCH rjc.resume r " +
            "JOIN FETCH rjc.jobCategory jc " +
            "WHERE jc.id = :jobCategoryId")
    List<ResumeJobCategory> findByJobCategoryId(Integer jobCategoryId);

    @Query("SELECT rjc FROM ResumeJobCategory rjc " +
            "JOIN FETCH rjc.jobCategory jc " +
            "WHERE rjc.id.resumeId = :resumeId")
    List<ResumeJobCategory> findAllByResumeId(@Param("resumeId") Integer resumeId);

}
