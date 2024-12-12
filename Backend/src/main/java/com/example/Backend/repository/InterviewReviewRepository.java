package com.example.Backend.repository;

import com.example.Backend.model.InterviewReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewReviewRepository extends JpaRepository<InterviewReview, Integer> {

    @Query("SELECT ir, c, jc, rm FROM InterviewReview ir " +
            "LEFT JOIN Company c ON ir.companyId = c.id " +
            "LEFT JOIN JobCategory jc ON ir.jobCategoryId = jc.id " +
            "LEFT JOIN ReviewManager rm ON ir.id = rm.reviewId")
    List<Object[]> getInterviewReviewsWithDetails();

}

