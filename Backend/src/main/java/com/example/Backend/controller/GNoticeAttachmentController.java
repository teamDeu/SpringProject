package com.example.Backend.controller;

import com.example.Backend.model.GNoticeAttachment;
import com.example.Backend.service.GNoticeAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/g_notices/attachments")
public class GNoticeAttachmentController {

    @Autowired
    private GNoticeAttachmentService attachmentService;

    // 특정 GNotice의 첨부파일 조회
    @GetMapping("/notice/{noticeId}")
    public ResponseEntity<List<GNoticeAttachment>> getAttachmentsByNoticeId(@PathVariable Integer noticeId) {
        return ResponseEntity.ok(attachmentService.getAttachmentsByGNoticeId(noticeId));
    }

    // 새로운 첨부파일 추가
    @PostMapping("/notice/{noticeId}")
    public ResponseEntity<GNoticeAttachment> addAttachment(@PathVariable Integer noticeId, @RequestBody GNoticeAttachment attachment) {
        try {
            return ResponseEntity.ok(attachmentService.addAttachment(noticeId, attachment));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 첨부파일 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Integer id) {
        try {
            attachmentService.deleteAttachment(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
