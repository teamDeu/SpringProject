package com.example.Backend.service;

import com.example.Backend.DTO.CandidateResponse2;
import com.example.Backend.repository.CandidateRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService2 {

    @Autowired
    private CandidateRepository2 candidateRepository2;

    public List<CandidateResponse2> getCandidatesByUserId(String userId) {
        System.out.println("Received userId in Service: " + userId); // 로그 추가
        return candidateRepository2.findCandidatesByUserId(userId);
    }
}




