package com.example.Backend.repository;

import com.example.Backend.model.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Integer> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공

    Optional<JobCategory> findByName(String name);
}
