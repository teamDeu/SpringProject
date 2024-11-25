package com.example.Backend.service;

import com.example.Backend.model.FAQ;
import com.example.Backend.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FAQService {

    @Autowired
    private FAQRepository faqRepository;

    // Fetch all FAQs
    public List<FAQ> getAllFAQs() {
        return faqRepository.findAll();
    }

    // Fetch FAQs by target
    public List<FAQ> getFAQsByTarget(String target) {
        return faqRepository.findByTarget(FAQ.Target.valueOf(target));
    }

    // Create a new FAQ
    public FAQ createFAQ(FAQ faq) {
        return faqRepository.save(faq);
    }

    // Update an existing FAQ
    public FAQ updateFAQ(Long id, FAQ updatedFAQ) {
        return faqRepository.findById(id).map(faq -> {
            faq.setTitle(updatedFAQ.getTitle());
            faq.setQuestion(updatedFAQ.getQuestion());
            faq.setAnswer(updatedFAQ.getAnswer());
            faq.setTarget(updatedFAQ.getTarget());
            return faqRepository.save(faq);
        }).orElseThrow(() -> new RuntimeException("FAQ not found with id " + id));
    }

    // Delete an FAQ
    public void deleteFAQ(Long id) {
        faqRepository.deleteById(id);
    }
}
