package com.example.Backend.repository;

import com.example.Backend.model.ResumeSkill;
import com.example.Backend.model.ResumeSkillId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeSkillRepository extends JpaRepository<ResumeSkill, ResumeSkillId> {
}
