package com.example.Backend.controller;

import com.example.Backend.model.FAQTitle;
import com.example.Backend.service.FAQTitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqtitle")
public class FAQTitleController {

    @Autowired
    private FAQTitleService faqTitleService;

    // Get all FAQ titles
    @GetMapping
    public ResponseEntity<List<FAQTitle>> getAllFAQTitles() {
        return ResponseEntity.ok(faqTitleService.getAllFAQTitles());
    }

    // Update FAQ title by ID
    @PutMapping("/{id}")
    public ResponseEntity<FAQTitle> updateFAQTitle(@PathVariable Long id, @RequestBody FAQTitle updatedFAQ) {
        FAQTitle updated = faqTitleService.updateFAQTitle(id, updatedFAQ);
        return ResponseEntity.ok(updated);
    }
}
