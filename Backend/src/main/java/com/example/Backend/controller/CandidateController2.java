package com.example.Backend.controller;

import com.example.Backend.DTO.CandidateResponse2;
import com.example.Backend.service.CandidateService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CandidateController2 {

    @Autowired
    private CandidateService2 candidateService2;

    @GetMapping("/candidate2")
    public ResponseEntity<List<CandidateResponse2>> getCandidatesByUserId(@RequestParam String userId) {
        System.out.println("Received userId in Controller: " + userId); // 로그 추가
        List<CandidateResponse2> candidates = candidateService2.getCandidatesByUserId(userId);
        return ResponseEntity.ok(candidates);
    }

}



