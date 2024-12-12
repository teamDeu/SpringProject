package com.example.Backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    private final String uploadDir = "C:/springProject/SpringProject/Backend/uploads";
    private final String UPLOAD_DIR = "C:/SpringProject/Backend/uploads/";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            // 파일 경로
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            // 파일 존재 여부 확인
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

    }
        @PostMapping("/upload")
        public ResponseEntity<String> uploadFile (@RequestParam("file") MultipartFile file){
            try {
                // 업로드된 파일의 원래 이름 가져오기
                String originalFileName = file.getOriginalFilename();

                // 저장 경로 설정
                Path destinationPath = Paths.get(UPLOAD_DIR + originalFileName);

                // 파일 저장
                Files.createDirectories(destinationPath.getParent()); // 디렉토리가 없으면 생성
                file.transferTo(destinationPath);

                return ResponseEntity.ok("파일 업로드 성공! 저장 경로: " + destinationPath.toString());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("파일 업로드 실패!");
            }
        }
    }
