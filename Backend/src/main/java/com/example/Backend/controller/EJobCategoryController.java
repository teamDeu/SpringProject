package com.example.Backend.controller;

import com.example.Backend.model.EJobCategory;
import com.example.Backend.service.EJobCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-categories")
public class EJobCategoryController {
    private final EJobCategoryService eJobCategoryService;

    public EJobCategoryController(EJobCategoryService eJobCategoryService) {
        this.eJobCategoryService = eJobCategoryService;
    }

    @GetMapping
    public List<EJobCategory> getAllJobCategories() {
        return eJobCategoryService.getAllJobCategories();
    }

    @PostMapping
    public EJobCategory createJobCategory(@RequestBody EJobCategory jobCategory) {
        return eJobCategoryService.saveJobCategory(jobCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobCategory(@PathVariable Long id) {
        eJobCategoryService.deleteJobCategory(id);
        return ResponseEntity.noContent().build();
    }
}
