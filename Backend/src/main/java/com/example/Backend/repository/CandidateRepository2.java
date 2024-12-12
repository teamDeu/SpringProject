package com.example.Backend.repository;

import com.example.Backend.DTO.CandidateResponse2;
import com.example.Backend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository2 extends JpaRepository<Candidate, Long> {

    @Query("SELECT new com.example.Backend.DTO.CandidateResponse2(" +
            "c.id, j.companyName, j.title, j.location, j.endDate, c.passType) " +
            "FROM Candidate c " +
            "JOIN JobPost j ON c.postId = j.id " +
            "JOIN Resume r ON c.resumeId = r.id " +
            "WHERE r.userId = :userId")
    List<CandidateResponse2> findCandidatesByUserId(@Param("userId") String userId);

}


