package com.example.Backend.controller;


import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class CandidateController {

    @Autowired
    CandidateService candidateService = new CandidateService();

    @GetMapping("/api/candidate")
    public ResponseEntity<List<CandidateResponse>> getCandidate(@RequestParam Long postId){
        return ResponseEntity.ok(candidateService.getCandidateByPost((postId)));
    }
}
