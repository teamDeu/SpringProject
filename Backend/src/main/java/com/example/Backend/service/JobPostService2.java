package com.example.Backend.service;

import com.example.Backend.model.JobPost2;
import com.example.Backend.model.JobPostImage2;
import com.example.Backend.repository.JobPostImageRepository2;
import com.example.Backend.repository.JobPostRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JobPostService2 {
    @Autowired
    private JobPostRepository2 jobPostRepository;

    @Autowired
    private JobPostImageRepository2 jobPostImageRepository;

    // Save a job post
    public JobPost2 saveJobPost(JobPost2 jobPost) {
        return jobPostRepository.save(jobPost);
    }

    // Find a job post by ID
    public Optional<JobPost2> findById(Long id) {
        return jobPostRepository.findById(id);
    }

    // Retrieve all job posts
    public List<JobPost2> getAllJobPost() {
        return jobPostRepository.findAll();
    }

    // Save a job post image
    public void saveJobPostImage(JobPostImage2 jobPostImage) {
        jobPostImageRepository.save(jobPostImage);
    }

    // Delete a job post by ID
    public boolean deleteJobPost(Long id) {
        Optional<JobPost2> jobPostOpt = jobPostRepository.findById(id);
        if (jobPostOpt.isPresent()) {
            jobPostRepository.delete(jobPostOpt.get());
            return true;
        } else {
            return false;
        }
    }

    // Retrieve job post with images
    public List<Map<String, Object>> getJobPostWithImages(Long postId) {
        List<Object[]> results = jobPostRepository.getJobPostWithImages(postId);

        List<Map<String, Object>> mappedResults = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("postId", row[0]);
            map.put("title", row[1]);
            map.put("companyName", row[2]);
            map.put("location", row[3]);
            map.put("employmentType", row[4]);
            map.put("salary", row[5]);
            map.put("imgName", row[6]);
            map.put("imgPath", row[7]);
            mappedResults.add(map);
        }

        return mappedResults;
    }

    // Count job posts by company ID
    public Long getJobPostCountByCompanyId(String companyId) {
        return jobPostRepository.countJobPostsByCompanyId(companyId);
    }

    // Retrieve job post counts for all companies
    public List<Map<String, Object>> getAllJobPostCounts() {
        return jobPostRepository.getJobPostCounts();
    }
}
