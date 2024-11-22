package com.example.Backend.service;

import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.model.ResumeJobCategoryId;
import com.example.Backend.repository.ResumeJobCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeJobCategoryService {

    @Autowired
    private ResumeJobCategoryRepository resumeJobCategoryRepository;

    public List<ResumeJobCategory> findAll() {
        return resumeJobCategoryRepository.findAll();
    }

    public ResumeJobCategory save(ResumeJobCategory resumeJobCategory) {
        return resumeJobCategoryRepository.save(resumeJobCategory);
    }

    public void deleteById(Integer resumeId, Integer jobCategoryId) {
        resumeJobCategoryRepository.deleteById(new ResumeJobCategoryId(resumeId, jobCategoryId));
    }
}
