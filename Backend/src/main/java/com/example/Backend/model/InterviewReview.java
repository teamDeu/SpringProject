package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interview_review")
public class InterviewReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "company_id")
    private String companyId; // String 타입 유지

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

    @Column(name = "user_id")
    private String userId;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
