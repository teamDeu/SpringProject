package com.example.Backend.controller;

import com.example.Backend.model.JobCategory;
import com.example.Backend.service.JobCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-categories")
public class JobCategoryController {

    @Autowired
    private JobCategoryService jobCategoryService;

    // 모든 JobCategory 가져오기
    @GetMapping
    public ResponseEntity<List<JobCategory>> getAllJobCategories() {
        List<JobCategory> jobCategories = jobCategoryService.getAllJobCategories();
        return ResponseEntity.ok(jobCategories);
    }

    // ID로 특정 JobCategory 가져오기
    @GetMapping("/{id}")
    public ResponseEntity<JobCategory> getJobCategoryById(@PathVariable Integer id) {
        return jobCategoryService.getJobCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 새로운 JobCategory 추가
    @PostMapping
    public ResponseEntity<JobCategory> createJobCategory(@RequestBody JobCategory jobCategory) {
        JobCategory savedJobCategory = jobCategoryService.saveJobCategory(jobCategory);
        return ResponseEntity.ok(savedJobCategory);
    }

    // 특정 JobCategory 수정
    @PutMapping("/{id}")
    public ResponseEntity<JobCategory> updateJobCategory(
            @PathVariable Integer id, @RequestBody JobCategory jobCategory) {
        return jobCategoryService.getJobCategoryById(id)
                .map(existingCategory -> {
                    existingCategory.setName(jobCategory.getName());
                    existingCategory.setDescription(jobCategory.getDescription());
                    JobCategory updatedCategory = jobCategoryService.saveJobCategory(existingCategory);
                    return ResponseEntity.ok(updatedCategory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 특정 JobCategory 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobCategory(@PathVariable Integer id) {
        if (jobCategoryService.getJobCategoryById(id).isPresent()) {
            jobCategoryService.deleteJobCategory(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
