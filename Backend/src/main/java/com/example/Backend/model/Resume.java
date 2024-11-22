package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "e_resumes")
@Data
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String userId;
    private String title;
    private String description;
    private Integer experienceYears;
    private String summary;
    private String pdfUrl;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
