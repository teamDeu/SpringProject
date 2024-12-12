package com.example.Backend.controller;

import com.example.Backend.model.Euser;
import com.example.Backend.service.EuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/eusers")
public class EuserController {

    @Autowired
    private EuserService euserService;

    @Value("${file.upload-dir}")
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
        Euser euser = euserService.findById(id);
        if (euser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        try {
            // 원본 파일명 가져오기
            String originalFileName = file.getOriginalFilename();

            // 파일 저장 경로
            File uploadFile = new File(uploadDir + File.separator + originalFileName);

            // 디렉토리가 존재하지 않으면 생성
            uploadFile.getParentFile().mkdirs();

            // 파일 저장
            file.transferTo(uploadFile);

            // e_users에 파일명만 저장
            euser.setProfileImg(originalFileName);
            euserService.save(euser);

            return ResponseEntity.ok(originalFileName); // 파일명만 반환
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }





    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            // 한글 파일 이름 디코딩
            String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8.toString());
            Path filePath = Paths.get("C:/springProject/SpringProject/Backend/uploads").resolve(decodedFileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());


            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }




    @GetMapping("/{id}/profile-img")
    public ResponseEntity<byte[]> getProfileImg(@PathVariable String id) {
        Euser euser = euserService.findById(id);
        if (euser == null || euser.getProfileImg() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        try {
            // 저장된 파일 경로 조합
            String filePath = uploadDir + File.separator + euser.getProfileImg();
            File imgFile = new File(filePath);

            if (!imgFile.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            byte[] imageData = Files.readAllBytes(imgFile.toPath());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // 파일 형식에 맞게 설정
                    .body(imageData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }





    @PutMapping("/{id}")
    public ResponseEntity<Euser> updateEuser(@PathVariable String id, @RequestBody Euser updatedEuser) {
        Euser existingEuser = euserService.findById(id);
        if (existingEuser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // 기존 사용자 정보 업데이트
        existingEuser.setName(updatedEuser.getName());
        existingEuser.setEmail(updatedEuser.getEmail());
        existingEuser.setBirth(updatedEuser.getBirth());
        existingEuser.setPhone(updatedEuser.getPhone());
        existingEuser.setProfileImg(updatedEuser.getProfileImg());

        Euser savedEuser = euserService.save(existingEuser);
        return ResponseEntity.ok(savedEuser);
    }


}
