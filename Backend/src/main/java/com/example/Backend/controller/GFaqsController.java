package com.example.Backend.controller;

import com.example.Backend.model.GFaqs;
import com.example.Backend.service.GFaqsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gfaqs")
public class GFaqsController {

    @Autowired
    private GFaqsService gFaqsService;

    // 모든 GFaqs 조회
    @GetMapping
    public ResponseEntity<List<GFaqs>> getAllGFaqs() {
        return ResponseEntity.ok(gFaqsService.getAllGFaqs());
    }

    // 특정 target에 속한 GFaqs 조회
    @GetMapping("/faq")
    public ResponseEntity<List<GFaqs>> getGFaqsByFaq(@RequestParam String target) {
        return ResponseEntity.ok(gFaqsService.getGFaqsByTarget(target));
    }

    // 새로운 GFaqs 생성
    @PostMapping("/faq/{faqId}")
    public ResponseEntity<GFaqs> createGFaqs(@PathVariable Long faqId, @RequestBody GFaqs gFaqs) {
        return ResponseEntity.ok(gFaqsService.createGFaqs(gFaqs, faqId));
    }

    // 기존 GFaqs 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<GFaqs> updateGFaqs(@PathVariable Long id, @RequestBody GFaqs gFaqs) {
        return ResponseEntity.ok(gFaqsService.updateGFaqs(id, gFaqs));
    }

    // GFaqs 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGFaqs(@PathVariable Long id) {
        gFaqsService.deleteGFaqs(id);
        return ResponseEntity.noContent().build();
    }
}
