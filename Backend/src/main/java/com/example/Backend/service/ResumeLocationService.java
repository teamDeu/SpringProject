package com.example.Backend.service;

import com.example.Backend.model.ResumeLocation;
import com.example.Backend.model.ResumeLocationId;
import com.example.Backend.repository.ResumeLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeLocationService {

    @Autowired
    private ResumeLocationRepository resumeLocationRepository;

    public List<ResumeLocation> findAll() {
        return resumeLocationRepository.findAll();
    }

    public ResumeLocation save(ResumeLocation resumeLocation) {
        return resumeLocationRepository.save(resumeLocation);
    }

    public void deleteById(Integer resumeId, Integer locationId) {
        ResumeLocationId id = new ResumeLocationId(resumeId, locationId);
        resumeLocationRepository.deleteById(id);
    }
}
