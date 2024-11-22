package com.example.Backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class ResumeSkillId implements Serializable {
    private Integer resumeId; // e_resumes 테이블의 resume_id
    private Integer skillId;  // e_skills 테이블의 skill_id

    // 기본 생성자 필요
    public ResumeSkillId() {}

    public ResumeSkillId(Integer resumeId, Integer skillId) {
        this.resumeId = resumeId;
        this.skillId = skillId;
    }
}
