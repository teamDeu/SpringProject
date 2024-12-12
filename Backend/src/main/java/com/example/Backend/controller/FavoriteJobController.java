package com.example.Backend.controller;

import com.example.Backend.model.JobPost;
import com.example.Backend.service.FavoriteJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FavoriteJobController {

    @Autowired
    private FavoriteJobService service;

    @GetMapping("/api/user/scrap-posts")
        public ResponseEntity<List<JobPost>> getFavoriteJobPosts(@RequestParam String userId) {
            List<JobPost> favoriteJobs = service.getFavoriteJobPostsByUserId(userId);
            return ResponseEntity.ok(favoriteJobs);
    }
}
