package com.example.Backend.controller;

import com.example.Backend.model.ResumeSkill;
import com.example.Backend.model.ResumeSkillId;
import com.example.Backend.repository.ResumeSkillRepository;
import com.example.Backend.service.ResumeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/resume-skills")
public class ResumeSkillController {

    @Autowired
    private ResumeSkillService resumeSkillService;
    @Autowired
    private ResumeSkillRepository resumeSkillRepository;

    @GetMapping
    public List<ResumeSkill> getAllResumeSkills() {
        return resumeSkillService.findAll();
    }

    @PostMapping
    public ResponseEntity<ResumeSkill> createResumeSkill(@RequestBody ResumeSkill resumeSkill) {
        if (resumeSkill.getId() == null ||
                resumeSkill.getId().getResumeId() == null ||
                resumeSkill.getId().getSkillId() == null) {
            return ResponseEntity.badRequest().build();
        }
        ResumeSkill savedResumeSkill = resumeSkillService.save(resumeSkill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResumeSkill);
    }



    @DeleteMapping("/{resumeId}/{skillId}")
    public void deleteResumeSkill(@PathVariable Integer resumeId, @PathVariable Long  skillId) {
        resumeSkillService.deleteById(resumeId, skillId);
    }

    @PostMapping("/api/resume-skills")
    public ResponseEntity<?> addResumeSkill(@RequestBody ResumeSkill resumeSkill) {
        ResumeSkillId id = resumeSkill.getId();
        if (resumeSkillRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 등록된 기술 스택입니다.");
        }
        resumeSkillRepository.save(resumeSkill);
        return ResponseEntity.ok(resumeSkill);
    }

}
