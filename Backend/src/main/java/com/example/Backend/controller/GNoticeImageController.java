package com.example.Backend.controller;

import com.example.Backend.model.GNoticeImage;
import com.example.Backend.service.GNoticeImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/g_notices/images")
public class GNoticeImageController {

    @Autowired
    private GNoticeImageService imageService;

    // 특정 GNotice의 이미지 조회
    @GetMapping("/notice/{noticeId}")
    public ResponseEntity<List<GNoticeImage>> getImagesByNoticeId(@PathVariable Integer noticeId) {
        return ResponseEntity.ok(imageService.getImagesByGNoticeId(noticeId));
    }

    // 새로운 이미지 추가
    @PostMapping("/notice/{noticeId}")
    public ResponseEntity<GNoticeImage> addImage(@PathVariable Integer noticeId, @RequestBody GNoticeImage image) {
        try {
            return ResponseEntity.ok(imageService.addImage(noticeId, image));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 이미지 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Integer id) {
        try {
            imageService.deleteImage(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
