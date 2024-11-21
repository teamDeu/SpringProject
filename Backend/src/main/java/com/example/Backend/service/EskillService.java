package com.example.Backend.service;

import com.example.Backend.model.Eskill;
import com.example.Backend.repository.EskillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EskillService {
    private final EskillRepository eskillRepository;

    public EskillService(EskillRepository eskillRepository) {
        this.eskillRepository = eskillRepository;
    }

    public List<Eskill> getAllResumeSkills() {
        return eskillRepository.findAll();
    }

    public Eskill saveResumeSkill(Eskill eskill) {
        return eskillRepository.save(eskill);
    }

    public void deleteResumeSkill(Long id) {
        eskillRepository.deleteById(id);
    }
}
