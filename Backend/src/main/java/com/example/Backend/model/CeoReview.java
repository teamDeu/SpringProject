package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ceo_review")
public class CeoReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", length = 50, nullable = false)
    private String userId;

    @Column(name = "company_id", length = 30, nullable = false)
    private String companyId;

    @Column(name = "ceo_register", length = 255)
    private String ceoRegister;

    @Column(name = "ceo_job", length = 255)
    private String ceoJob;

    @Column(name = "ceo_ment", length = 255)
    private String ceoMent;

    @Column(name = "status", length = 255)
    private String status;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCeoRegister() {
        return ceoRegister;
    }

    public void setCeoRegister(String ceoRegister) {
        this.ceoRegister = ceoRegister;
    }

    public String getCeoJob() {
        return ceoJob;
    }

    public void setCeoJob(String ceoJob) {
        this.ceoJob = ceoJob;
    }

    public String getCeoMent() {
        return ceoMent;
    }

    public void setCeoMent(String ceoMent) {
        this.ceoMent = ceoMent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
