package com.example.Backend.controller;


import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.Util.Util;
import com.example.Backend.model.Candidate;
import com.example.Backend.model.Company;
import com.example.Backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
public class CandidateController {

    @Autowired
    CandidateService candidateService = new CandidateService();

    @GetMapping("/api/candidate")
    public ResponseEntity<List<CandidateResponse>> getCandidate(@RequestParam Long postId){
        System.out.println(candidateService.getCandidateByPost((postId)));
        return ResponseEntity.ok(candidateService.getCandidateByPost((postId)));
    }

    @PostMapping("/api/candidate")
    public ResponseEntity<Candidate> saveCandidate(@RequestBody CandidateResponse candidateResponse){
        Candidate candidate = candidateService.getCandidateById(Long.valueOf(candidateResponse.getId())).get();
        candidate.setPassType(candidateResponse.getPassType());
        candidateService.saveCandidate(candidate);
        return ResponseEntity.ok(candidate);
    }
}
