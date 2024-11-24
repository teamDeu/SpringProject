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
        return resumeService.save(resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Integer id) {
        resumeService.deleteById(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResumeFile(@RequestParam("file") MultipartFile file) {
        try {
            // 고유 파일 이름 생성 및 저장
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File uploadFile = new File(uploadDir + fileName);
            file.transferTo(uploadFile);

            // 데이터베이스에 저장된 경로 반환
            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }
}
