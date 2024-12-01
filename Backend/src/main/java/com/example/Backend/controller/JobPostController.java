package com.example.Backend.controller;

import com.example.Backend.Util.Util;
import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/api")
public class JobPostController {

    @Autowired
    JobPostService jobPostService;

    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }

    @PostMapping("/api/jobpost")
    public ResponseEntity<JobPost> saveJobPost(@RequestBody JobPost jobPost)
    {
        Date date = new Date();
        System.out.println(date);
        jobPost.setModifyDate(date);
        System.out.println(jobPost);
        JobPost savedJobPost = jobPostService.saveJobPost(jobPost);
        return ResponseEntity.ok(savedJobPost);
    }



    //이 공고 놓치지 마세요
    @GetMapping("/urgent-jobposts")
    public ResponseEntity<List<Map<String, Object>>> getTop9UrgentJobPosts() {
        List<JobPost> jobPosts = jobPostService.getTop9JobPostsByDeadline();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("title", post.getTitle());
            map.put("company", post.getCompanyName());
            map.put("region", post.getLocation());
            map.put("experience", post.getExperience());
            map.put("education", post.getEducation());

            // Date를 LocalDateTime으로 변환 후 포맷
            if (post.getEndDate() != null) {
                LocalDateTime endDate = post.getEndDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                map.put("deadline", endDate.format(formatter));
            } else {
                map.put("deadline", null);
            }
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }

    //지금 눈 여겨볼 공고
    @GetMapping("/popular-jobposts")
    public ResponseEntity<List<Map<String, Object>>> getTop9PopularJobPosts() {
        List<JobPost> jobPosts = jobPostService.getTop9JobPostsByViews();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("title", post.getTitle());
            map.put("company", post.getCompanyName());
            map.put("region", post.getLocation());
            map.put("experience", post.getExperience());
            map.put("education", post.getEducation());
            map.put("views", post.getViews());

            if (post.getEndDate() != null) {
                LocalDateTime endDate = post.getEndDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                map.put("deadline", endDate.format(formatter));
            } else {
                map.put("deadline", null);
            }
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }


    //회원님만을 위한 오늘의 공고
    @GetMapping("/latest-jobposts")
    public ResponseEntity<List<Map<String, Object>>> getTop9LatestJobPosts() {
        List<JobPost> jobPosts = jobPostService.getTop9LatestJobPosts();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("title", post.getTitle());
            map.put("company", post.getCompanyName());
            map.put("region", post.getLocation());
            map.put("experience", post.getExperience());
            map.put("education", post.getEducation());
            map.put("postDate", post.getPostDate().toString());

            if (post.getEndDate() != null) {
                LocalDateTime endDate = post.getEndDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                map.put("deadline", endDate.format(formatter));
            } else {
                map.put("deadline", null);
            }
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }




    @GetMapping("/api/companyjobpost")
    public ResponseEntity<List<JobPost>> getJobPosts(@RequestParam String company){
        System.out.println(jobPostService.getJobPostByCompany(company));
        return ResponseEntity.ok(jobPostService.getJobPostByCompany(company));
    }
    @GetMapping("/api/idjobpost")
    public ResponseEntity<JobPost> getJobPost(@RequestParam Long id){
        System.out.println(jobPostService.findById(id));
        return ResponseEntity.ok(jobPostService.findById(id).get());
    }

    @PostMapping("/api/jobpostimage/{jobPostId}")
    public ResponseEntity<List<String>> saveJobPostImage(
            @PathVariable Long jobPostId,
            @RequestParam("files")MultipartFile[] files) {
        System.out.println(Arrays.toString(files));
        JobPost jobPost = jobPostService.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException("JobPost not found"));
        List<String> filePaths = new ArrayList<>();
        jobPostService.deleteJobPostImage(jobPostId);
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
                jobPostImage.setPostId(jobPostId);
                jobPostImage.setImgPath(uniqueFilename);
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
    @DeleteMapping("/api/jobpost/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteJobPost(@PathVariable Long id) {
        System.out.println("Received DELETE request for JobPost with id: " + id);
        try {
            boolean isDeleted = jobPostService.deleteJobPost(id);
            if (isDeleted) {
                System.out.println("JobPost with id " + id + " deleted successfully.");
                return ResponseEntity.ok().build();
            } else {
                System.out.println("JobPost with id " + id + " not found.");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/api/jobpostimage")
    public ResponseEntity<List<JobPostImage>> getJobPostImage(@RequestParam Long id){
        return ResponseEntity.ok(jobPostService.getPostImage(id));
    }
}
