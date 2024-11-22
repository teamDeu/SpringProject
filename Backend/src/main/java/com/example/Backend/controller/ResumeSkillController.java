package com.example.Backend.controller;

import com.example.Backend.model.ResumeSkill;
import com.example.Backend.service.ResumeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-skills")
public class ResumeSkillController {

    @Autowired
    private ResumeSkillService resumeSkillService;

    @GetMapping
    public List<ResumeSkill> getAllResumeSkills() {
        return resumeSkillService.findAll();
    }

    @PostMapping
    public ResumeSkill createResumeSkill(@RequestBody ResumeSkill resumeSkill) {
        return resumeSkillService.save(resumeSkill);
    }

    @DeleteMapping("/{resumeId}/{skillId}")
    public void deleteResumeSkill(@PathVariable Integer resumeId, @PathVariable Integer skillId) {
        resumeSkillService.deleteById(resumeId, skillId);
    }
}
