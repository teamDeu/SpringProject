package com.example.Backend.controller;

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

    private final String UPLOAD_DIR = "C:/SpringProject/Backend/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
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
