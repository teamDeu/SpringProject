package com.example.Backend.service;

import com.example.Backend.model.Resume;
import com.example.Backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    public List<Resume> findAll() {
        return resumeRepository.findAll();
    }

    public Resume save(Resume resume) {
        return resumeRepository.save(resume);
    }

    public void deleteById(Integer id) {
        resumeRepository.deleteById(id);
    }
}
