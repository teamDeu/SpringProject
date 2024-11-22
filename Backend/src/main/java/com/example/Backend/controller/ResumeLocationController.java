package com.example.Backend.controller;

import com.example.Backend.model.ResumeLocation;
import com.example.Backend.service.ResumeLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-locations")
public class ResumeLocationController {

    @Autowired
    private ResumeLocationService resumeLocationService;

    @GetMapping
    public List<ResumeLocation> getAllResumeLocations() {
        return resumeLocationService.findAll();
    }

    @PostMapping
    public ResumeLocation createResumeLocation(@RequestBody ResumeLocation resumeLocation) {
        return resumeLocationService.save(resumeLocation);
    }

    @DeleteMapping("/{resumeId}/{locationId}")
    public void deleteResumeLocation(
            @PathVariable Integer resumeId,
            @PathVariable Integer locationId) {
        resumeLocationService.deleteById(resumeId, locationId);
    }
}
