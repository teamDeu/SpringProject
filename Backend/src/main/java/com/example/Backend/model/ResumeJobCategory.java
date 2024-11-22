package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "e_resume_job_categories")
@Data
public class ResumeJobCategory {

    @EmbeddedId
    private ResumeJobCategoryId id;

    @ManyToOne
    @MapsId("resumeId")
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @ManyToOne
    @MapsId("jobCategoryId")
    @JoinColumn(name = "job_category_id")
    private JobCategory jobCategory;

    @Column(name = "user_id", nullable = false)
    private String userId; // e_resume 테이블의 user_id
}
