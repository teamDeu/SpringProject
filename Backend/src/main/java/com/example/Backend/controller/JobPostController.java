package com.example.Backend.controller;

import com.example.Backend.Util.Util;
import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.service.JobPostService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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



    //이 공고 놓치지 마세요(공고 마감이 가까운 순)
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

    //지금 눈 여겨볼 공고(조회수 높은 순)
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


    //회원님만을 위한 오늘의 공고(최근에 등록한 순)
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

    //많은 회원들이 눈 여결 볼 공고
    @GetMapping("/featured-companies")
    public ResponseEntity<List<Map<String, Object>>> getTop10FeaturedCompanies() {
        List<JobPost> jobPosts = jobPostService.getTop10FeaturedCompanies();

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("companyName", post.getCompanyName());
            map.put("logo", post.getCompany()); // 로고 URL
            map.put("description", post.getAboutCompany());
            map.put("title",post.getTitle());
            map.put("views", post.getViews());
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }

    //조회수가 높은 공고
    @GetMapping("/popular-jobposts2")
    public ResponseEntity<List<Map<String, Object>>> getTopJobPostsByViews() {
        List<JobPost> jobPosts = jobPostService.getTopJobPostsByViews(9); // 조회수 높은 9개의 공고
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("title", post.getTitle());
            map.put("company", post.getCompanyName());
            map.put("region", post.getLocation());
            map.put("views", post.getViews());
            map.put("salary", post.getSalary());

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


    //마감이 얼마 남지 않은 공고
    @GetMapping("/urgent-jobposts2")
    public ResponseEntity<List<Map<String, Object>>> getUrgentJobPosts() {
        List<JobPost> jobPosts = jobPostService.getJobPostsEndingSoon(9);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<Map<String, Object>> response = jobPosts.stream().map(post -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", post.getId());
            map.put("title", post.getTitle());
            map.put("company", post.getCompanyName());
            map.put("region", post.getLocation());
            map.put("salary", post.getSalary());
            map.put("deadline", post.getEndDate() != null
                    ? post.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().format(formatter)
                    : null);
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }




    @GetMapping("/api/companyjobpost")
    public ResponseEntity<List<JobPost>> getJobPosts(@RequestParam String company){
        System.out.println(jobPostService.getJobPostByCompany(company));
        return ResponseEntity.ok(jobPostService.getJobPostByCompany(company));
    }

    @GetMapping("/idjobpost")
    public ResponseEntity<?> getJobPost(@RequestParam Long id) {
        Optional<JobPost> jobPostOpt = jobPostService.findById(id);

        if (jobPostOpt.isPresent()) {
            JobPost jobPost = jobPostOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", jobPost.getId());
            response.put("title", jobPost.getTitle());
            response.put("company", jobPost.getCompanyName());
            response.put("location", jobPost.getLocation());
            response.put("experience", jobPost.getExperience());
            response.put("education", jobPost.getEducation());
            response.put("endDate", jobPost.getEndDate());

            String skills = jobPost.getSkills();
            if (skills != null && !skills.isEmpty()) {
                try {
                    // JSON 문자열을 배열로 파싱
                    List<Map<String, Object>> skillList = new ObjectMapper().readValue(
                            skills, new TypeReference<List<Map<String, Object>>>() {}
                    );
                    response.put("skills", skillList);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.put("skills", new ArrayList<>()); // 실패 시 빈 배열
                }
            } else {
                response.put("skills", new ArrayList<>()); // 빈 배열
            }

            String jobDuties = jobPost.getJobDuties();
            if (jobDuties != null && !jobDuties.isEmpty()) {
                try {
                    List<Map<String, Object>> dutyList = new ObjectMapper().readValue(
                            jobDuties, new TypeReference<List<Map<String, Object>>>() {}
                    );
                    response.put("jobDuties", dutyList);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.put("jobDuties", new ArrayList<>());
                }
            } else {
                response.put("jobDuties", new ArrayList<>());
            }

            String requirements = jobPost.getRequirements();
            if (requirements != null && !requirements.isEmpty()) {
                try {
                    List<Map<String, Object>> requirementList = new ObjectMapper().readValue(
                            requirements, new TypeReference<List<Map<String, Object>>>() {}
                    );
                    response.put("requirements", requirementList);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.put("requirements", new ArrayList<>());
                }
            } else {
                response.put("requirements", new ArrayList<>());
            }

            String additionalPreferences = jobPost.getAdditionalPreferences();
            if (additionalPreferences != null && !additionalPreferences.isEmpty()) {
                try {
                    List<Map<String, Object>> preferenceList = new ObjectMapper().readValue(
                            additionalPreferences, new TypeReference<List<Map<String, Object>>>() {}
                    );
                    response.put("additionalPreferences", preferenceList);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.put("additionalPreferences", new ArrayList<>());
                }
            } else {
                response.put("additionalPreferences", new ArrayList<>());
            }

            String employeeBenefits = jobPost.getEmployeeBenefits();
            if (employeeBenefits != null && !employeeBenefits.isEmpty()) {
                try {
                    List<Map<String, Object>> benefitList = new ObjectMapper().readValue(
                            employeeBenefits, new TypeReference<List<Map<String, Object>>>() {}
                    );
                    // `type`이 `main`인 항목 필터링
                    Optional<Map<String, Object>> mainBenefit = benefitList.stream()
                            .filter(benefit -> "main".equals(benefit.get("type")))
                            .findFirst();
                    response.put("mainBenefit", mainBenefit.orElse(null)); // `main`이 없으면 null
                    response.put("employeeBenefits", benefitList);
                } catch (Exception e) {
                    e.printStackTrace();
                    response.put("employeeBenefits", new ArrayList<>());
                    response.put("mainBenefit", null);
                }
            } else {
                response.put("employeeBenefits", new ArrayList<>());
                response.put("mainBenefit", null);
            }

            response.put("aboutCompany", jobPost.getAboutCompany());
            response.put("postDate", jobPost.getPostDate());
            response.put("views", jobPost.getViews());
            response.put("isFeatured", jobPost.getIsFeatured());
            response.put("employmentType", jobPost.getEmploymentType());
            response.put("salary", jobPost.getSalary());
            response.put("commuteTime", jobPost.getCommuteTime());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job post not found");
        }
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
