package com.example.Backend.repository;

import com.example.Backend.model.ResumeLocation;
import com.example.Backend.model.ResumeLocationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeLocationRepository extends JpaRepository<ResumeLocation, ResumeLocationId> {
}
