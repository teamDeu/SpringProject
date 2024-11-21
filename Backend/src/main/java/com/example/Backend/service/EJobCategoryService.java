package com.example.Backend.service;

import com.example.Backend.model.EJobCategory;
import com.example.Backend.repository.EJobCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EJobCategoryService {
    private final EJobCategoryRepository eJobCategoryRepository;

    public EJobCategoryService(EJobCategoryRepository eJobCategoryRepository) {
        this.eJobCategoryRepository = eJobCategoryRepository;
    }

    public List<EJobCategory> getAllJobCategories() {
        return eJobCategoryRepository.findAll();
    }

    public EJobCategory saveJobCategory(EJobCategory jobCategory) {
        return eJobCategoryRepository.save(jobCategory);
    }

    public void deleteJobCategory(Long id) {
        eJobCategoryRepository.deleteById(id);
    }
}
