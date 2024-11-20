package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Data
@Table(name = "c_job_posts")
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "company_id")
    private String company;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "company_name", length = 50)
    private String companyName;

    @Column(name = "location", length = 255)
    private String location;

    @Column(name = "employment_type", length = 50)
    private String employmentType;

    @Column(name = "salary", length = 255)
    private String salary;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "experinece", length = 30)
    private String experience;

    @Column(name = "education", length = 30)
    private String education;

    @Column(name = "commute_time", length = 30)
    private String commuteTime;

    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills;

    @Column(name = "job_duties", columnDefinition = "TEXT")
    private String jobDuties;

    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "additional_preferences", columnDefinition = "TEXT")
    private String additionalPreferences;

    @Column(name = "employee_benefits", columnDefinition = "TEXT")
    private String employeeBenefits;

    @Column(name = "about_company", columnDefinition = "TEXT")
    private String aboutCompany;

    @Column(name = "post_date")
    private Date postDate;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @Column(name = "views")
    private Long views;
}
