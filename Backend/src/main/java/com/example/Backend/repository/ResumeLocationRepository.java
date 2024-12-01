package com.example.Backend.repository;

import com.example.Backend.model.ResumeLocation;
import com.example.Backend.model.ResumeLocationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeLocationRepository extends JpaRepository<ResumeLocation, ResumeLocationId> {
    List<ResumeLocation> findById_ResumeId(Integer resumeId);

}
