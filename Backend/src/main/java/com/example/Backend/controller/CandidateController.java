package com.example.Backend.controller;


import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.Util.Util;
import com.example.Backend.model.Candidate;
import com.example.Backend.model.Company;
import com.example.Backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping
    public ResponseEntity<List<CandidateResponse>> getCandidate(@RequestParam Long postId){
        System.out.println(candidateService.getCandidateByPost((postId)));
        return ResponseEntity.ok(candidateService.getCandidateByPost((postId)));
    }

    @PostMapping
    public ResponseEntity<Candidate> saveCandidate(@RequestBody CandidateResponse candidateResponse){
        Candidate candidate = candidateService.getCandidateById(Long.valueOf(candidateResponse.getId())).get();
        candidate.setPassType(candidateResponse.getPassType());
        candidateService.saveCandidate(candidate);
        return ResponseEntity.ok(candidate);
    }

    @PostMapping("/apply")
    public ResponseEntity<Candidate> applyForJob(@RequestBody Map<String, Object> requestData) {
        try {
            Long postId = ((Number) requestData.get("postId")).longValue();
            Integer resumeId = (Integer) requestData.get("resumeId");

            Candidate candidate = new Candidate();
            candidate.setId(System.currentTimeMillis()); // 수동으로 ID 설정 (예: 현재 시간 사용)
            candidate.setPostId(postId);
            candidate.setResumeId(resumeId);
            candidate.setExtraFile(null); // 초기값 설정

            Candidate savedCandidate = candidateService.saveCandidate(candidate);
            return ResponseEntity.ok(savedCandidate);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






}
