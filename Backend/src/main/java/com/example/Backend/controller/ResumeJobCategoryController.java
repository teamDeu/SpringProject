package com.example.Backend.controller;

import com.example.Backend.model.ResumeJobCategory;
import com.example.Backend.service.ResumeJobCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
