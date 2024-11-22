package com.example.Backend.controller;

import com.example.Backend.model.Resume;
import com.example.Backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.findAll();
    }

    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        return resumeService.save(resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Integer id) {
        resumeService.deleteById(id);
    }
}
