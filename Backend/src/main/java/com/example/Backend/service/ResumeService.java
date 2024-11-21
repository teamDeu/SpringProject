package com.example.Backend.service;

import com.example.Backend.model.Resume;
import com.example.Backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {
    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public Optional<Resume> getResumeById(Long id) {
        return resumeRepository.findById(id);
    }

    public Resume saveResume(Resume resume) {
        try {
            return resumeRepository.save(resume);
        } catch (Exception e) {
            throw new RuntimeException("Error saving resume: " + e.getMessage());
        }
    }

    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
}
