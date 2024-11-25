package com.example.Backend.controller;

import com.example.Backend.model.Resume;
import com.example.Backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.findAll();
    }

    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        resume.setCreatedAt(LocalDate.now()); // Correctly set the current date
        System.out.println("Before Save: " + resume.getCreatedAt()); // Logging createdAt for debugging
        return resumeService.save(resume);
    }

    @DeleteMapping("/api/resumes/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Integer id) {
        resumeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadResumeFile(@RequestParam("file") MultipartFile file) {
        try {
            // Generate a unique file name and save the file
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File uploadFile = new File(uploadDir + File.separator + fileName);
            file.transferTo(uploadFile);

            // Return the file's relative path
            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }
}
