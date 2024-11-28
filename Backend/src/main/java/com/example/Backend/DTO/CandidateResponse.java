package com.example.Backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
public class CandidateResponse {
    private int resumeId;
    private String name;
    private String experienceLevel;
    private String educationLevel;
    private String educationStatus;
    private Date createAt;
    private String extraFile;

    // 생성자
    public CandidateResponse(int resumeId, String name, String experienceLevel, String educationLevel,
                             String educationStatus, Date createAt, String extraFile) {
        this.resumeId = resumeId;
        this.name = name;
        this.experienceLevel = experienceLevel;
        this.educationLevel = educationLevel;
        this.educationStatus = educationStatus;
        this.createAt = createAt;
        this.extraFile = extraFile;
    }

    // Getter와 Setter
}