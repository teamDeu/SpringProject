package com.example.Backend.repository;

import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostImageRepository extends JpaRepository<JobPostImage,Long> {
    public List<JobPostImage> findByPostId(Long postId);
    public void deleteByPostId(Long postId);
}
