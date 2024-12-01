package com.example.Backend.repository;

import com.example.Backend.model.ResumeSkill;
import com.example.Backend.model.ResumeSkillId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeSkillRepository extends JpaRepository<ResumeSkill, ResumeSkillId> {
    List<ResumeSkill> findByResumeId(Integer resumeId);

}
