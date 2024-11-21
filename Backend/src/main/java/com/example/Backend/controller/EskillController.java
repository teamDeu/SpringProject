package com.example.Backend.controller;

import com.example.Backend.model.Eskill;
import com.example.Backend.service.EskillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-skills")
public class EskillController {
    private final EskillService eskillService;

    public EskillController(EskillService eskillService) {
        this.eskillService = eskillService;
    }

    @GetMapping
    public List<Eskill> getAllResumeSkills() {
        return eskillService.getAllResumeSkills();
    }

    @PostMapping
    public Eskill createResumeSkill(@RequestBody Eskill eskill) {
        return eskillService.saveResumeSkill(eskill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResumeSkill(@PathVariable Long id) {
        eskillService.deleteResumeSkill(id);
        return ResponseEntity.noContent().build();
    }
}
