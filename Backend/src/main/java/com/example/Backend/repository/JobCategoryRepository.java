package com.example.Backend.repository;

import com.example.Backend.model.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Integer> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공
}
