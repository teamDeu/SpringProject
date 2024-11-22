package com.example.Backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class ResumeLocationId implements Serializable {
    private Integer resumeId; // e_resumes 테이블의 resume_id
    private Integer locationId; // e_locations 테이블의 location_id

    // 기본 생성자 필요
    public ResumeLocationId() {}

    public ResumeLocationId(Integer resumeId, Integer locationId) {
        this.resumeId = resumeId;
        this.locationId = locationId;
    }
}
