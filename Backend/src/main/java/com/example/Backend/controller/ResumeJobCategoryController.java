package com.example.Backend.controller;

import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.service.ResumeJobCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-job-categories")
public class ResumeJobCategoryController {

    @Autowired
    private ResumeJobCategoryService resumeJobCategoryService;

    @GetMapping
    public List<ResumeJobCategory> getAllResumeJobCategories() {
        return resumeJobCategoryService.findAll();
    }

    @PostMapping
    public ResumeJobCategory createResumeJobCategory(@RequestBody ResumeJobCategory resumeJobCategory) {
        return resumeJobCategoryService.save(resumeJobCategory);
    }

    @DeleteMapping("/{resumeId}/{jobCategoryId}")
    public void deleteResumeJobCategory(@PathVariable Integer resumeId, @PathVariable Integer jobCategoryId) {
        resumeJobCategoryService.deleteById(resumeId, jobCategoryId);
    }

    @GetMapping("/{resumeId}")
    public ResponseEntity<List<ResumeJobCategory>> getJobCategoriesByResumeId(@PathVariable Integer resumeId) {
        List<ResumeJobCategory> categories = resumeJobCategoryService.findByResumeId(resumeId);
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/resume/{resumeId}")
    public ResponseEntity<?> updateJobCategories(
            @PathVariable Integer resumeId,
            @RequestBody List<Integer> jobCategoryIds) {
        try {
            resumeJobCategoryService.updateJobCategories(resumeId, jobCategoryIds);
            return ResponseEntity.ok("Job categories updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating job categories: " + e.getMessage());
        }
    }


}
