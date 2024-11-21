package com.example.Backend.controller;

import com.example.Backend.model.Resume;
import com.example.Backend.service.ResumeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResumeController {
    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/api/resumes/user/{userId}")
    public List<Resume> getResumesByUserId(@PathVariable("userId") String userId) {
        return resumeService.getResumesByUserId(userId);
    }
}
