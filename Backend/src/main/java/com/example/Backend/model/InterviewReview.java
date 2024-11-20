package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interview_review")
public class InterviewReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
    @Column(name = "id")
    private int id;

    @Column(name = "company_id", length = 30, nullable = false)
    private String companyId;

    @Column(name = "job_category_id", nullable = false)
    private int jobCategoryId;

    @Column(name = "experience", length = 50, nullable = true)
    private String experience;

    @Column(name = "interview_date", length = 50, nullable = true)
    private String interviewDate;

    @Column(name = "interview_register", nullable = true)
    private String interviewRegister;

    @Column(name = "interview_evaluation", length = 20, nullable = true)
    private String interviewEvaluation;

    @Column(name = "interview_difficulty", length = 20, nullable = true)
    private String interviewDifficulty;

    @Column(name = "interview_type", length = 255, nullable = true)
    private String interviewType;

    @Column(name = "interview_numtype", length = 255, nullable = true)
    private String interviewNumtype;

    @Column(name = "interview_question", length = 255, nullable = true)
    private String interviewQuestion;

    @Column(name = "interview_detail", length = 255, nullable = true)
    private String interviewDetail;

    @Column(name = "interview_passed", length = 20, nullable = true)
    private String interviewPassed;

    @Column(name = "verify_file", length = 255, nullable = true)
    private String verifyFile;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public int getJobCategoryId() {
        return jobCategoryId;
    }

    public void setJobCategoryId(int jobCategoryId) {
        this.jobCategoryId = jobCategoryId;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(String interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewRegister() {
        return interviewRegister;
    }

    public void setInterviewRegister(String interviewRegister) {
        this.interviewRegister = interviewRegister;
    }

    public String getInterviewEvaluation() {
        return interviewEvaluation;
    }

    public void setInterviewEvaluation(String interviewEvaluation) {
        this.interviewEvaluation = interviewEvaluation;
    }

    public String getInterviewDifficulty() {
        return interviewDifficulty;
    }

    public void setInterviewDifficulty(String interviewDifficulty) {
        this.interviewDifficulty = interviewDifficulty;
    }

    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }

    public String getInterviewNumtype() {
        return interviewNumtype;
    }

    public void setInterviewNumtype(String interviewNumtype) {
        this.interviewNumtype = interviewNumtype;
    }

    public String getInterviewQuestion() {
        return interviewQuestion;
    }

    public void setInterviewQuestion(String interviewQuestion) {
        this.interviewQuestion = interviewQuestion;
    }

    public String getInterviewDetail() {
        return interviewDetail;
    }

    public void setInterviewDetail(String interviewDetail) {
        this.interviewDetail = interviewDetail;
    }

    public String getInterviewPassed() {
        return interviewPassed;
    }

    public void setInterviewPassed(String interviewPassed) {
        this.interviewPassed = interviewPassed;
    }

    public String getVerifyFile() {
        return verifyFile;
    }

    public void setVerifyFile(String verifyFile) {
        this.verifyFile = verifyFile;
    }
}
