package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Data
@Table(name ="e_resumes")
public class Resume {

    @Id
    @Column(name ="id")
    private String id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description; // 이력서 설명

    @Column(name = "summary")
    private String summary; // 이력서 간단 소개

    @Column(name = "location")
    private String location;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "pdf_url")
    private String pdfUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }



}
