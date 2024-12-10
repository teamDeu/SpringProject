package com.example.Backend.service;

import com.example.Backend.model.JobCategory;
import com.example.Backend.repository.JobCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobCategoryService {

    @Autowired
    private JobCategoryRepository jobCategoryRepository;

    // 모든 JobCategory 가져오기
    public List<JobCategory> getAllJobCategories() {
        return jobCategoryRepository.findAll();
    }

    // ID로 특정 JobCategory 가져오기
    public Optional<JobCategory> getJobCategoryById(Integer id) {
        return jobCategoryRepository.findById(id);
    }

    // JobCategory 저장
    public JobCategory saveJobCategory(JobCategory jobCategory) {
        return jobCategoryRepository.save(jobCategory);
    }

    // JobCategory 삭제
    public void deleteJobCategory(Integer id) {
        jobCategoryRepository.deleteById(id);
    }



}
