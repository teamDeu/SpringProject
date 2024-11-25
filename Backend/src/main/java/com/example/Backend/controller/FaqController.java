package com.example.Backend.controller;

import com.example.Backend.model.Faq;
import com.example.Backend.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FaqController {

    @Autowired
    private FaqService faqService;

    // 모든 Faq 조회
    @GetMapping
    public ResponseEntity<List<Faq>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }

    // Target별 Faq 조회
    @GetMapping("/target/{target}")
    public ResponseEntity<List<Faq>> getFaqsByTarget(@PathVariable String target) {
        return ResponseEntity.ok(faqService.getFaqsByTarget(target));
    }

    // 새로운 Faq 생성
    @PostMapping
    public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
        return ResponseEntity.ok(faqService.createFaq(faq));
    }

    // 기존 Faq 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq faq) {
        return ResponseEntity.ok(faqService.updateFaq(id, faq));
    }

    // Faq 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return ResponseEntity.noContent().build();
    }
}
