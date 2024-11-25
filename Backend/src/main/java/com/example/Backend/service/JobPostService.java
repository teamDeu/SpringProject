package com.example.Backend.service;

import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.repository.JobPostImageRepository;
import com.example.Backend.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private JobPostImageRepository jobPostImageRepository;
    public JobPost saveJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    public Optional<JobPost> findById(Long id) {
        return jobPostRepository.findById(id);
    }

    public List<JobPost> getAllJobPost(){
        return jobPostRepository.findAll();
    }

    public List<JobPost> getJobPostByCompany(String company){
        return jobPostRepository.findByCompanyOrderByPostDateDesc(company);
    }

    public void saveJobPostImage(JobPostImage jobPostImage) {
        jobPostImageRepository.save(jobPostImage);
    }

    public boolean deleteJobPost(Long id) {
        Optional<JobPost> jobPostOpt = jobPostRepository.findById(id);
        if (jobPostOpt.isPresent()) {
            jobPostRepository.delete(jobPostOpt.get());
            return true;
        } else {
            return false;
        }
    }
}
