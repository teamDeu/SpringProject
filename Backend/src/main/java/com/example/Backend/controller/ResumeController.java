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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 모든 이력서 가져오기
    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.findAll();
    }

    // 특정 사용자의 이력서 가져오기
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Resume>> getResumesByUserId(@PathVariable String userId) {
        List<Resume> resumes = resumeService.findByUserId(userId);
        if (resumes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // 필요 정보만 반환하도록 수정 (createdAt과 updatedAt 확인)
        List<Map<String, String>> response = resumes.stream().map(resume -> {
            Map<String, String> resumeData = new HashMap<>();
            resumeData.put("id", resume.getId().toString());
            resumeData.put("title", resume.getTitle());
            resumeData.put("lastUpdated", resume.getUpdatedAt() != null
                    ? resume.getUpdatedAt().toString()
                    : resume.getCreatedAt().toString());
            return resumeData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resumes);
    }

    // 특정 ID의 이력서 가져오기
    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable Integer id) {
        Optional<Resume> resume = resumeService.findById(id);
        if (resume.isPresent()) {
            return ResponseEntity.ok(resume.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    // 이력서 생성
    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        resume.setCreatedAt(LocalDate.now());
        return resumeService.save(resume);
    }

    // 이력서 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Integer id) {
        resumeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // 이력서 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<String> uploadResumeFile(@RequestParam("file") MultipartFile file) {
        try {
            // 원본 파일 이름 가져오기
            String fileName = file.getOriginalFilename();
            File uploadFile = new File(uploadDir + File.separator + fileName);

            // 디렉터리가 존재하지 않으면 생성
            uploadFile.getParentFile().mkdirs();

            // 파일 저장
            file.transferTo(uploadFile);

            // 데이터베이스에 저장할 Resume 객체 생성
            Resume resume = new Resume();
            resume.setPdfUrl(fileName); // 파일명만 저장
            resumeService.save(resume); // ResumeService를 통해 저장

            // 파일명 반환
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }



    // 기존 이력서 수정
    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(@PathVariable Integer id, @RequestBody Resume updatedResume) {
        Optional<Resume> existingResume = resumeService.findById(id);
        if (existingResume.isPresent()) {
            Resume resume = existingResume.get();

            // 기존 이력서 정보를 업데이트
            resume.setTitle(updatedResume.getTitle());
            resume.setDescription(updatedResume.getDescription());
            resume.setExperienceYears(updatedResume.getExperienceYears());
            resume.setSummary(updatedResume.getSummary());
            resume.setPdfUrl(updatedResume.getPdfUrl());
            resume.setUpdatedAt(LocalDate.now());

            // 데이터베이스에 저장
            Resume savedResume = resumeService.save(resume);
            return ResponseEntity.ok(savedResume);
        } else {
            // 해당 ID의 이력서가 없는 경우 404 응답 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
