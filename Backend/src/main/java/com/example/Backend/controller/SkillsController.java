package com.example.Backend.controller;

import com.example.Backend.model.Skills;
import com.example.Backend.service.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SkillsController {
    @Autowired
    SkillsService skillsService = new SkillsService();
    @GetMapping("/api/skills")
    public ResponseEntity<List<Skills>> getSkills(){
        return ResponseEntity.ok(skillsService.getAllSkills());
    }
}
