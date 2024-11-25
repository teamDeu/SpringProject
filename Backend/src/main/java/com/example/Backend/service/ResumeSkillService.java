package com.example.Backend.service;

import com.example.Backend.model.ResumeSkill;
import com.example.Backend.model.ResumeSkillId;
import com.example.Backend.repository.ResumeSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeSkillService {

    @Autowired
    private ResumeSkillRepository resumeSkillRepository;

    public List<ResumeSkill> findAll() {
        return resumeSkillRepository.findAll();
    }

    public ResumeSkill save(ResumeSkill resumeSkill) {
        return resumeSkillRepository.save(resumeSkill);
    }

    public void deleteById(Integer resumeId, Long  skillId) {
        resumeSkillRepository.deleteById(new ResumeSkillId(resumeId, skillId));
    }
}
