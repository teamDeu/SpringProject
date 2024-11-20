package com.example.Backend.controller;

import com.example.Backend.model.JobPost;
import com.example.Backend.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class JobPostController {

    @Autowired
    JobPostService jobPostService;

    @PostMapping("/api/jobpost")
    public ResponseEntity<JobPost> saveJobPost(@RequestBody JobPost jobPost)
    {
        System.out.println(jobPost);
        JobPost savedJobPost = jobPostService.saveJobPost(jobPost);
        return ResponseEntity.ok(savedJobPost);
    }
}
