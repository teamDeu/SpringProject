package com.example.Backend.controller;

import com.example.Backend.model.GNotice;
import com.example.Backend.service.GNoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/g_notices")
public class GNoticeController {

    @Autowired
    private GNoticeService gNoticeService;

    // 모든 GNotice 조회
    @GetMapping
    public ResponseEntity<List<GNotice>> getAllGNotices() {
        return ResponseEntity.ok(gNoticeService.getAllGNotices());
    }

    // 특정 타겟의 GNotice 조회
    @GetMapping("/target/{target}")
    public ResponseEntity<List<GNotice>> getGNoticesByTarget(@PathVariable String target) {
        try {
            return ResponseEntity.ok(gNoticeService.getGNoticesByTarget(target));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 새로운 GNotice 생성
    @PostMapping("/notice/{noticeId}")
    public ResponseEntity<GNotice> createGNotice(@PathVariable Integer noticeId, @RequestBody GNotice gNotice) {
        System.out.println("Received Notice ID: " + noticeId);
        System.out.println("Received GNotice: " + gNotice);
        if (gNotice.getTitle() == null || gNotice.getTarget() == null || gNotice.getQuestion() == null || gNotice.getAnswer() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(gNoticeService.createGNotice(gNotice, noticeId));
    }





    // 기존 GNotice 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<GNotice> updateGNotice(@PathVariable Integer id, @RequestBody GNotice gNotice) {
        try {
            return ResponseEntity.ok(gNoticeService.updateGNotice(id, gNotice));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GNotice 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGNotice(@PathVariable Integer id) {
        try {
            gNoticeService.deleteGNotice(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ID로 특정 GNotice 조회
    @GetMapping("/{id}")
    public ResponseEntity<GNotice> getGNoticeDetails(@PathVariable Integer id) {
        try {
            GNotice gNotice = gNoticeService.getGNoticeDetails(id);
            return ResponseEntity.ok(gNotice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
