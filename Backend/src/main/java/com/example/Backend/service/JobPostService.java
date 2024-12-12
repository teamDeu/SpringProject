package com.example.Backend.service;

import com.example.Backend.model.Company;
import com.example.Backend.model.JobPost;
import com.example.Backend.model.JobPostImage;
import com.example.Backend.repository.JobPostImageRepository;
import com.example.Backend.repository.JobPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }

    @Autowired
    private JobPostImageRepository jobPostImageRepository;



    public JobPost saveJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    public Optional<JobPost> findById(Long id) {
        return jobPostRepository.findById(id);
    }

    public List<JobPost> getAllJobPost(){
        return jobPostRepository.findAll();
    }

    public List<JobPost> getJobPostByCompany(Company company){
        return jobPostRepository.findByCompanyOrderByModifyDateDesc(company);
    }

    public void saveJobPostImage(JobPostImage jobPostImage) {
        jobPostImageRepository.save(jobPostImage);
    }

    @Transactional
    public void deleteJobPostImage(Long id){
        jobPostImageRepository.deleteByPostId(id);
    }

    public boolean deleteJobPost(Long id) {
        Optional<JobPost> jobPostOpt = jobPostRepository.findById(id);
        if (jobPostOpt.isPresent()) {
            jobPostRepository.delete(jobPostOpt.get());
            return true;
        } else {
            return false;
        }
    }



    public Optional<JobPost> findByIdWithImages(Long id) {
        return jobPostRepository.findById(id).map(jobPost -> {
            List<JobPostImage> images = jobPostImageRepository.findByPostId(id);
            jobPost.setImages(images);
            return jobPost;
        });
    }



    public JobPost saveJobPostWithImages(JobPost jobPost, List<JobPostImage> images) {
        if (images != null) {
            for (JobPostImage image : images) {
                image.setJobPost(jobPost);
            }
            jobPost.setImages(images);
        }
        return jobPostRepository.save(jobPost);
    }

    public List<JobPostImage> getPostImage(Long postId) {
        return jobPostImageRepository.findByPostId(postId);
    }



    // 이 공고 놓치지 마세요
    public List<JobPost> getTop9JobPostsByDeadline() {
        Pageable pageable = PageRequest.of(0, 9);
        return jobPostRepository.findTop9ByOrderByEndDateAsc(pageable);
    }

    //지금 눈 여겨볼 공고
    public List<JobPost> getTop9JobPostsByViews() {
        Pageable pageable = PageRequest.of(0, 9);
        return jobPostRepository.findTop9ByOrderByViewsDesc(pageable);
    }

    //회원님을 위한 오늘의 공고
    public List<JobPost> getTop9LatestJobPosts() {
        Pageable pageable = PageRequest.of(0, 9); // 상위 9개 공고
        return jobPostRepository.findTop9ByOrderByPostDateDesc(pageable);
    }

    //많은 회원들이 눈 여결 볼 공고
    public List<JobPost> getTop10FeaturedCompanies() {
        Pageable pageable = PageRequest.of(0, 10);
        return jobPostRepository.findTop10ByIsFeaturedTrueOrderByViewsDesc(pageable);
    }

    //조회수가 높은 공고
    public List<JobPost> getAllJobPostsByViews() {
        return jobPostRepository.findAllJobPostsByViews();
    }


    LocalDate currentDate = LocalDate.now();
    LocalDate oneWeekLater = currentDate.plusDays(7);

    //마감이 얼마 남지 않은 공고
    public List<JobPost> getJobPostsEndingSoon(int limit) {
        LocalDate currentDate = LocalDate.now();
        LocalDate oneWeekLater = currentDate.plusDays(7);

        Date startDate = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(oneWeekLater.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Pageable pageable = PageRequest.of(0, limit);
        return jobPostRepository.findJobPostsEndingBetween(startDate, endDate, pageable);
    }

    @Transactional
    public void incrementViews(Long id) {
        Optional<JobPost> jobPostOpt = jobPostRepository.findById(id);
        if (jobPostOpt.isPresent()) {
            JobPost jobPost = jobPostOpt.get();
            jobPost.setViews(jobPost.getViews() + 1);
            jobPostRepository.save(jobPost);
        } else {
            throw new RuntimeException("JobPost not found with ID: " + id);
        }
    }

    






}