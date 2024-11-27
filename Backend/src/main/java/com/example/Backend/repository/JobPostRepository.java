package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobPostRepository extends JpaRepository<JobPost,Long>{
    List<JobPost> findByCompanyOrderByModifyDateDesc(String company);
}
