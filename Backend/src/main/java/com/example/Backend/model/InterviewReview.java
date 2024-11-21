package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Data
@Table(name = "interview_review")
public class InterviewReview {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "company_id")
    private String companyId;

    @Column(name = "job_category_id")
    private int jobCategoryId;

    @Column(name = "experience")
    private String experience;

    @Column(name = "interview_date")
    private String interviewDate;

    @Column(name = "interview_register")
    private String interviewRegister;

    @Column(name = "interview_evaluation")
    private String interviewEvaluation;

    @Column(name = "interview_difficulty")
    private String interviewDifficulty;

    @Column(name = "interview_type")
    private String interviewType;

    @Column(name = "interview_numtype")
    private String interviewNumtype;

    @Column(name = "interview_question")
    private String interviewQuestion;

    @Column(name = "interview_detail")
    private String interviewDetail;

    @Column(name = "interview_passed")
    private String interviewPassed;

    @Column(name = "verify_file")
    private String verifyFile;
}

