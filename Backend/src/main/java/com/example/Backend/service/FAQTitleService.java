package com.example.Backend.service;

import com.example.Backend.model.FAQTitle;
import com.example.Backend.repository.FAQTitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FAQTitleService {

    @Autowired
    private FAQTitleRepository faqTitleRepository;

    // Fetch all FAQ titles
    public List<FAQTitle> getAllFAQTitles() {
        return faqTitleRepository.findAll();
    }

    // Update an existing FAQ title by ID
    public FAQTitle updateFAQTitle(Long id, FAQTitle updatedFAQ) {
        return faqTitleRepository.findById(id).map(faq -> {
            faq.setHeader(updatedFAQ.getHeader());
            faq.setContent(updatedFAQ.getContent());
            faq.setEmail(updatedFAQ.getEmail());
            return faqTitleRepository.save(faq);
        }).orElseThrow(() -> new RuntimeException("FAQ not found with id " + id));
    }
}
