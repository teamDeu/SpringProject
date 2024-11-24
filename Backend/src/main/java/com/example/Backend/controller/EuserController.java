package com.example.Backend.controller;

import com.example.Backend.model.Euser;
import com.example.Backend.service.EuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/eusers")
public class EuserController {

    @Autowired
    private EuserService euserService;

    @Value("${file.upload-dir}") // application.properties에서 설정된 파일 저장 경로
    private String uploadDir;

    // 모든 사용자 가져오기
    @GetMapping
    public List<Euser> getAllEusers() {
        return euserService.findAll();
    }

    // 특정 사용자 가져오기
    @GetMapping("/{id}")
    public Euser getEuserById(@PathVariable String id) {
        return euserService.findById(id);
    }

    // 사용자 생성
    @PostMapping
    public Euser createEuser(@RequestBody Euser euser) {
        return euserService.save(euser);
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public void deleteEuser(@PathVariable String id) {
        euserService.deleteById(id);
    }

    // 프로필 이미지 업로드
    @PostMapping("/{id}/upload-profile-img")
    public ResponseEntity<String> uploadProfileImg(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        // 사용자 확인
        Euser euser = euserService.findById(id);
        if (euser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        // 파일 저장 처리
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // 고유 파일 이름 생성
            File uploadFile = new File(uploadDir + fileName);
            file.transferTo(uploadFile);

            // 사용자 엔티티 업데이트
            euser.setProfileImg("/uploads/" + fileName); // 파일 URL 설정
            euserService.save(euser);

            return ResponseEntity.ok("Profile image uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }
}
