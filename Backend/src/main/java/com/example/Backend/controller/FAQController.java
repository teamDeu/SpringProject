package com.example.Backend.controller;

import com.example.Backend.model.FAQ;
import com.example.Backend.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FAQController {

    @Autowired
    private FAQService faqService;

    // Get all FAQs
    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }

    // Get FAQs by target
    @GetMapping("/target/{target}")
    public ResponseEntity<List<FAQ>> getFAQsByTarget(@PathVariable String target) {
        return ResponseEntity.ok(faqService.getFAQsByTarget(target));
    }

    // Create a new FAQ
    @PostMapping
    public ResponseEntity<FAQ> createFAQ(@RequestBody FAQ faq) {
        return ResponseEntity.ok(faqService.createFAQ(faq));
    }

    // Update an existing FAQ
    @PutMapping("/{id}")
    public ResponseEntity<FAQ> updateFAQ(@PathVariable Long id, @RequestBody FAQ faq) {
        return ResponseEntity.ok(faqService.updateFAQ(id, faq));
    }

    // Delete an FAQ
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFAQ(@PathVariable Long id) {
        faqService.deleteFAQ(id);
        return ResponseEntity.noContent().build();
    }
}
