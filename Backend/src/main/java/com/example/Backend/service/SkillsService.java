package com.example.Backend.service;

import com.example.Backend.model.Skills;
import com.example.Backend.repository.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillsService {
    @Autowired
    private SkillsRepository skillsRepository;

    public List<Skills> getAllSkills(){
        return skillsRepository.findAll();
    }
    public Optional<Skills> getSkillsById(Long id){
        return skillsRepository.findById(id);
    }

}
