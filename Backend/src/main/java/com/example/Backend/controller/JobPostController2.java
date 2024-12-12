package com.example.Backend.controller;

import com.example.Backend.Util.Util;
import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.service.JobPostService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
public class JobPostController2 {

    @Autowired
    JobPostService2 jobPostService;


    @GetMapping("/api/jobpost/count")
    public ResponseEntity<List<Map<String, Object>>> getAllJobPostCounts() {
        List<Map<String, Object>> jobPostCounts = jobPostService.getAllJobPostCounts();
        return ResponseEntity.ok(jobPostCounts);
    }

    @GetMapping("/api/jobpost/images")
    public ResponseEntity<List<Map<String, Object>>> getJobPostWithImages() {
        List<Map<String, Object>> jobPostWithImages = jobPostService.getJobPostWithImages(null); // null 전달
        return ResponseEntity.ok(jobPostWithImages);
    }


}
