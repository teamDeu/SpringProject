package com.example.Backend.controller;

import com.example.Backend.model.Location;
import com.example.Backend.model.Resume;
import com.example.Backend.model.ResumeLocation;
import com.example.Backend.model.ResumeLocationId;
import com.example.Backend.service.ResumeLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{resumeId}")
    public List<ResumeLocation> getResumeLocationsByResumeId(@PathVariable Integer resumeId) {
        return resumeLocationService.findByResumeId(resumeId);
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

    @PutMapping("/resume/{resumeId}")
    public ResponseEntity<?> updateResumeLocations(
            @PathVariable Integer resumeId,
            @RequestBody List<Integer> locationIds) {
        try {
            // 기존 데이터 삭제
            resumeLocationService.deleteByResumeId(resumeId);

            // 새로운 데이터 추가
            locationIds.forEach(locationId -> {
                ResumeLocation newLocation = new ResumeLocation();
                ResumeLocationId id = new ResumeLocationId(resumeId, locationId);
                newLocation.setId(id);

                Resume resume = new Resume();
                resume.setId(resumeId);
                newLocation.setResume(resume);

                Location location = new Location();
                location.setId(locationId);
                newLocation.setLocation(location);

                resumeLocationService.save(newLocation);
            });

            return ResponseEntity.ok("Locations updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating locations: " + e.getMessage());
        }
    }

}
