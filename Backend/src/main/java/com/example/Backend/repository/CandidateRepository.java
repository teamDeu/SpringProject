package com.example.Backend.repository;

import com.example.Backend.DTO.CandidateResponse;
import com.example.Backend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Long> {
    @Query(value = "SELECT c.id AS id, c.resume_id AS resumeId, u.name, u.experience_level AS experienceLevel, u.education_level AS educationLevel, " +
            "u.education_status AS educationStatus, c.create_at AS createAt, c.extra_file AS extraFile, c.pass_type AS passType " +
            "FROM candidate c " +
            "JOIN e_resumes r ON c.resume_id = r.id " +
            "JOIN m_users u ON r.user_id = u.id " +
            "WHERE c.post_id = :postId",
            nativeQuery = true)
    public List<Object[]> findCandidateDetailsNative(@Param("postId") Long postId);

    @Query("SELECT c FROM Candidate c WHERE c.resumeId = :resumeId")
    List<Candidate> findByResumeId(@Param("resumeId") String resumeId);
}
