package com.example.Backend.repository;

import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.model.ResumeJobCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeJobCategoryRepository extends JpaRepository<ResumeJobCategory, ResumeJobCategoryId> {
}
