package com.example.Backend.service;

import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    @Autowired
    CandidateRepository candidateRepository;

    public List<CandidateResponse> getCandidateByPost(Long postId) {
        List<Object[]> results = candidateRepository.findCandidateDetailsNative(postId);
        return results.stream()
                .map(row -> new CandidateResponse(
                        (int) row[0],        // resumeId
                        (String) row[1],      // name
                        (String) row[2],      // experienceLevel
                        (String) row[3],      // educationLevel
                        (String) row[4],      // educationStatus
                        (Date) row[5], // createAt
                        (String) row[6]       // extraFile
                ))
                .collect(Collectors.toList());
    }
}
