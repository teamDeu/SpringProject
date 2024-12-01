package com.example.Backend.controller;

import com.example.Backend.model.Resume;
import com.example.Backend.model.ResumeSkill;
import com.example.Backend.model.ResumeSkillId;
import com.example.Backend.model.Skills;
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

    // 이력서 ID로 관련된 기술 스택 가져오기
    @GetMapping("/resume/{resumeId}")
    public ResponseEntity<List<ResumeSkill>> getSkillsByResumeId(@PathVariable Integer resumeId) {
        List<ResumeSkill> resumeSkills = resumeSkillService.findByResumeId(resumeId);
        if (resumeSkills.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resumeSkills);
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

    @PutMapping("/resume/{resumeId}")
    public ResponseEntity<?> updateResumeSkills(@PathVariable Integer resumeId, @RequestBody List<Long> skillIds) {
        try {
            // 기존 기술 스택 가져오기
            List<ResumeSkill> existingSkills = resumeSkillService.findByResumeId(resumeId);

            // 기존 기술 스택 ID 리스트 생성
            List<Long> existingSkillIds = existingSkills.stream()
                    .map(skill -> skill.getSkill().getId())
                    .toList();

            // 삭제해야 할 기술 스택
            List<Long> skillsToDelete = existingSkillIds.stream()
                    .filter(id -> !skillIds.contains(id))
                    .toList();

            // 새롭게 추가해야 할 기술 스택
            List<Long> skillsToAdd = skillIds.stream()
                    .filter(id -> !existingSkillIds.contains(id))
                    .toList();

            // 삭제 실행
            for (Long skillId : skillsToDelete) {
                resumeSkillService.deleteById(resumeId, skillId);
            }

            // 추가 실행
            for (Long skillId : skillsToAdd) {
                ResumeSkill newSkill = new ResumeSkill();
                newSkill.setId(new ResumeSkillId(resumeId, skillId));
                newSkill.setResume(new Resume(resumeId));
                newSkill.setSkill(new Skills(skillId));
                resumeSkillService.save(newSkill);
            }

            return ResponseEntity.ok("기술 스택이 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("기술 스택 업데이트 중 오류 발생");
        }
    }


}
