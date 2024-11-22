package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "e_resume_skills")
@Data
public class ResumeSkill {

    @EmbeddedId
    private ResumeSkillId id;

    @ManyToOne
    @MapsId("resumeId")
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @ManyToOne
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skills skill;

    @Column(name = "user_id", nullable = false)
    private String userId; // e_resume 테이블의 user_id
}
