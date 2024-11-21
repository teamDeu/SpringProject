package com.example.Backend.service;

import com.example.Backend.model.Resume;
import com.example.Backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    @Autowired
    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    // 이력서 목록 조회
    public List<Resume> getResumesByUserId(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    // 특정 ID의 이력서 조회
    public Optional<Resume> getResumeById(Long id) {
        return resumeRepository.findById(id);
    }

    // 이력서 생성 또는 업데이트
    public Resume saveResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    // 이력서 삭제
    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
}
