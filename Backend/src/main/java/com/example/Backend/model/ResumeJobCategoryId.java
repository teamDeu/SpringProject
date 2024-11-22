package com.example.Backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class ResumeJobCategoryId implements Serializable {
    private Integer resumeId;       // e_resumes 테이블의 resume_id
    private Integer jobCategoryId;  // e_job_categories 테이블의 job_category_id

    // 기본 생성자 필요
    public ResumeJobCategoryId() {}

    public ResumeJobCategoryId(Integer resumeId, Integer jobCategoryId) {
        this.resumeId = resumeId;
        this.jobCategoryId = jobCategoryId;
    }
}
