package com.example.Backend.service;

import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.model.Candidate;
import com.example.Backend.model.Company;
import com.example.Backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    @Autowired
    CandidateRepository candidateRepository;

    public List<CandidateResponse> getCandidateByPost(Long postId) {
        List<Object[]> results = candidateRepository.findCandidateDetailsNative(postId);
        return results.stream()
                .map(row -> new CandidateResponse(
                        (int) row[0],       // id
                        (int) row[1],        // resumeId
                        (String) row[2],      // name
                        (String) row[3],      // experienceLevel
                        (String) row[4],      // educationLevel
                        (String) row[5],      // educationStatus
                        (Date) row[6], // createAt
                        (String) row[7],       // extraFile
                        (String) row[8] // passType
                ))
                .collect(Collectors.toList());
    }
    public Optional<Candidate> getCandidateById(Long id){
        return candidateRepository.findById(id);
    }
    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
}
