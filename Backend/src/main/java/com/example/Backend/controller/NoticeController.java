package com.example.Backend.controller;

import com.example.Backend.model.Notice;
import com.example.Backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // 모든 Notice 조회
    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    // 특정 타겟의 Notice 조회
    @GetMapping("/target/{target}")
    public ResponseEntity<List<Notice>> getNoticesByTarget(@PathVariable String target) {
        Notice.Target targetEnum;
        try {
            targetEnum = Notice.Target.valueOf(target);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(noticeService.getNoticesByTarget(targetEnum));
    }

    // 새로운 Notice 생성
    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        return ResponseEntity.ok(noticeService.createNotice(notice));
    }

    // 기존 Notice 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Integer id, @RequestBody Notice notice) {
        return ResponseEntity.ok(noticeService.updateNotice(id, notice));
    }

    // Notice 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Integer id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/id")
    public ResponseEntity<Notice> getNoticeIdByTitleAndTarget(
            @RequestParam String title,
            @RequestParam String target) {
        try {
            Notice.Target targetEnum = Notice.Target.valueOf(target);
            Notice notice = noticeService.getNoticeByTitleAndTarget(title, targetEnum);
            if (notice != null) {
                return ResponseEntity.ok(notice);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }



}

