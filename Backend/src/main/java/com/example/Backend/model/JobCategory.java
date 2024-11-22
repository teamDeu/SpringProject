package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "e_job_categories")
public class JobCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Primary Key

    @Column(name = "name", nullable = false, length = 255)
    private String name; // Job category name

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // Description of the job category
}
