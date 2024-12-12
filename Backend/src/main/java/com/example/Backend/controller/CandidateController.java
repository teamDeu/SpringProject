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
    public ResponseEntity<Candidate> applyForJob(
            @RequestParam("postId") Long postId,
            @RequestParam("resumeId") Integer resumeId,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Candidate candidate = new Candidate();
            candidate.setPostId(postId);
            candidate.setResumeId(resumeId);

            // 파일이 존재하는 경우
            if (file != null && !file.isEmpty()) {
                String originalFilename = file.getOriginalFilename();
                candidate.setExtraFile(originalFilename);

                // 파일 저장 로직
                String uploadDir = System.getProperty("user.dir") + "/uploads";
                String filePath = uploadDir + "/" + originalFilename;
                file.transferTo(new java.io.File(filePath));
            } else {
                candidate.setExtraFile(null); // 파일이 없으면 null 설정
            }

            Candidate savedCandidate = candidateService.saveCandidate(candidate);
            return ResponseEntity.ok(savedCandidate);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }







}
