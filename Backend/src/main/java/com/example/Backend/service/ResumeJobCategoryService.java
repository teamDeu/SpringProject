package com.example.Backend.service;

import com.example.Backend.model.JobCategory;
import com.example.Backend.model.Resume;
import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.model.ResumeJobCategoryId;
import com.example.Backend.repository.ResumeJobCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<ResumeJobCategory> findByResumeId(Integer resumeId) {
        return resumeJobCategoryRepository.findAllByResumeId(resumeId);
    }

    public void updateJobCategories(Integer resumeId, List<Integer> jobCategoryIds) {
        // 현재 이력서와 연결된 모든 직무 카테고리 삭제
        List<ResumeJobCategory> existingCategories = resumeJobCategoryRepository.findByResumeId(resumeId);
        resumeJobCategoryRepository.deleteAll(existingCategories);

        // 새로운 직무 카테고리 추가
        List<ResumeJobCategory> newCategories = jobCategoryIds.stream()
                .map(jobCategoryId -> {
                    ResumeJobCategoryId id = new ResumeJobCategoryId(resumeId, jobCategoryId);
                    ResumeJobCategory resumeJobCategory = new ResumeJobCategory();
                    resumeJobCategory.setId(id);
                    resumeJobCategory.setResume(new Resume(resumeId));
                    resumeJobCategory.setJobCategory(new JobCategory(jobCategoryId));
                    return resumeJobCategory;
                })
                .collect(Collectors.toList());

        resumeJobCategoryRepository.saveAll(newCategories);
    }


}
