package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostRepository extends JpaRepository<JobPost,Long> {
}
