package com.example.Backend.controller;

import com.example.Backend.model.Euser;
import com.example.Backend.model.Resume;
import com.example.Backend.repository.EuserRepository;
import com.example.Backend.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;
    private final EuserRepository euserRepository;

    public ResumeController(ResumeService resumeService, EuserRepository euserRepository) {
        this.resumeService = resumeService;
        this.euserRepository = euserRepository;
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable Long id) {
        Optional<Resume> resume = resumeService.getResumeById(id);
        return resume.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createResume(@RequestBody Map<String, Object> payload) {
        try {
            // userId 가져오기
            String userId = (String) payload.get("userId");

            // userId로 Euser 조회
            Optional<Euser> userOptional = euserRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            // Resume 객체 생성 및 필드 설정
            Resume resume = new Resume();
            resume.setUser(userOptional.get());
            resume.setTitle((String) payload.get("title"));
            resume.setDescription((String) payload.get("description"));
            resume.setLocation((String) payload.get("location"));
            resume.setExperienceYears((Integer) payload.get("experienceYears"));
            resume.setSummary((String) payload.get("summary"));
            resume.setPdfUrl((String) payload.get("pdfUrl"));

            // 저장 및 응답 반환
            Resume savedResume = resumeService.saveResume(resume);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedResume);
        } catch (Exception e) {
            e.printStackTrace(); // 오류 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@PathVariable Long id, @RequestBody Resume updatedResume) {
        if (!resumeService.getResumeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        updatedResume.setId(id);
        Resume savedResume = resumeService.saveResume(updatedResume);
        return ResponseEntity.ok(savedResume);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long id) {
        if (!resumeService.getResumeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }
}
