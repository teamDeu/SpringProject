package com.example.Backend.repository;

import com.example.Backend.model.CeoReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CeoReviewRepository extends JpaRepository<CeoReview, Long> {

    // 특정 회사 ID에 대한 리뷰를 가져오는 메서드
    List<CeoReview> findByCompanyId(String companyId);

    // 특정 유저 ID에 대한 리뷰를 가져오는 메서드
    List<CeoReview> findByUserId(String userId);
}
