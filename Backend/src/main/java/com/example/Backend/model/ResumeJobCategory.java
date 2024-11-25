package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "e_resume_job_categories")
@Data
public class ResumeJobCategory {

    @EmbeddedId
    private ResumeJobCategoryId id;

    @ManyToOne
    @MapsId("resumeId")
    @JoinColumn(name = "resume_id", referencedColumnName = "id", nullable = false)
    @ToString.Exclude
    private Resume resume;

    @ManyToOne
    @MapsId("jobCategoryId")
    @JoinColumn(name = "job_category_id", referencedColumnName = "id", nullable = false)
    @ToString.Exclude
    private JobCategory jobCategory;

}
