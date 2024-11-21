package com.example.Backend.controller;

import com.example.Backend.Util.Util;
import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class JobPostController {

    @Autowired
    JobPostService jobPostService;

    @PostMapping("/api/jobpost")
    public ResponseEntity<JobPost> saveJobPost(@RequestBody JobPost jobPost)
    {
        System.out.println(jobPost);
        JobPost savedJobPost = jobPostService.saveJobPost(jobPost);
        return ResponseEntity.ok(savedJobPost);
    }

    @GetMapping("/api/jobpost")
    public ResponseEntity<List<JobPost>> getAllJobPosts(){
        return ResponseEntity.ok(jobPostService.getAllJobPost());
    }

    @PostMapping("/api/jobpostimage/{jobPostId}")
    public ResponseEntity<List<String>> saveJobPostImage(
            @PathVariable Long jobPostId,
            @RequestParam("files")MultipartFile[] files) {
        System.out.println(Arrays.toString(files));
        JobPost jobPost = jobPostService.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException("JobPost not found"));
        List<String> filePaths = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                // 파일 저장 경로 (예제)
                String uploadDir = System.getProperty("user.dir") + "/uploads";

                // 원래 파일 이름 가져오기
                String originalFilename = file.getOriginalFilename();
                String uniqueFilename = Util.generateUniqueFilename(uploadDir, originalFilename);
                // 저장 경로 설정
                String filePath = uploadDir + "/" + uniqueFilename;

                JobPostImage jobPostImage = new JobPostImage();
                jobPostImage.setJobPost(jobPost);
                jobPostImage.setImgPath(filePath);
                jobPostImage.setImgName(originalFilename);
                jobPostService.saveJobPostImage(jobPostImage);
                // 파일 저장 로직
                file.transferTo(new java.io.File(filePath));
                // 저장된 파일 경로를 리스트에 추가
                filePaths.add(filePath);
            }

            return ResponseEntity.ok(filePaths);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }


}
